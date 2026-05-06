package dev.misfit.StreamingPlatform.services.impl;

import dev.misfit.StreamingPlatform.DTO.*;
import dev.misfit.StreamingPlatform.customExceptions.*;
import dev.misfit.StreamingPlatform.entities.SearchUser;
import dev.misfit.StreamingPlatform.entities.Stream;
import dev.misfit.StreamingPlatform.entities.StreamSearch;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.repositories.SearchUserRepository;
import dev.misfit.StreamingPlatform.repositories.StreamRepository;
import dev.misfit.StreamingPlatform.repositories.StreamSearchRepository;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import dev.misfit.StreamingPlatform.services.StreamService;
import dev.misfit.StreamingPlatform.utils.StreamStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static org.apache.tomcat.util.http.fileupload.FileUtils.deleteDirectory;

@Service
public class StreamServiceImpl implements StreamService {

    private static final Logger log = LoggerFactory.getLogger(StreamServiceImpl.class);
    private final StreamRepository streamRepository;
    private final UserRepository userRepository;
    private final RestClient restClient;
    private final RedisTemplate<String, Object> redisTemplate;
    private final StreamSearchRepository searchStreamRepository;
    private final SearchUserRepository searchUserRepository;
    private final AsyncProcessService asyncProcessService;

    @Value("${videos.path}")
    String videoPath;
    @Value("${live.videos.path}")
    String liveVideoUrl;

    public StreamServiceImpl(
            StreamRepository repository,
            UserRepository userRepository,
            RestClient restClient,
            RedisTemplate<String, Object> redisTemplate, StreamSearchRepository searchStreamRepository, SearchUserRepository searchUserRepository, AsyncProcessService asyncProcessService
    ) {
        this.streamRepository = repository;
        this.userRepository = userRepository;
        this.restClient = restClient;
        this.redisTemplate = redisTemplate;
        this.searchStreamRepository = searchStreamRepository;
        this.searchUserRepository = searchUserRepository;
        this.asyncProcessService = asyncProcessService;
    }

    @Override
    public String generateStreamKey() {
        byte[] randomBytes = new byte[16];
        new SecureRandom().nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }

    @Override
    public StartStreamResponse startStream(StartStreamRequest request, MultipartFile thumbnail, Long userId)
            throws InvalidUserException, DuplicateStreamKeyException, StreamProcessingException {
        if (request == null || request.getStreamKey().isBlank()) {
            throw new StreamProcessingException("Invalid request or missing streamKey");
        }
        if (thumbnail == null || thumbnail.isEmpty()) {
            throw new StreamProcessingException("Thumbnail file is required");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new InvalidUserException("Invalid user id: " + userId));


        Optional<Stream> existingStream = streamRepository.findByStreamKey(request.getStreamKey());
        if (existingStream.isPresent()) {
            throw new DuplicateStreamKeyException("Duplicate keys not allowed. Generate new key");
        }

        String thumbnailOriginalFilename = thumbnail.getOriginalFilename();
        String outputFolder = videoPath + "/" + userId + "/" + request.getStreamKey();
        new File(outputFolder).mkdirs();

        try {
            assert thumbnailOriginalFilename != null;
            Path path = Path.of(outputFolder, thumbnailOriginalFilename);
            Files.copy(thumbnail.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            throw new StreamProcessingException("Failed to save thumbnail", e);
        }

        String thumbnailPath = "/thumbnail/" + userId + "/" + request.getStreamKey() + "/" + thumbnailOriginalFilename;

        Stream stream = convertToStream(request, thumbnailPath, user);
        RedisStream redisStream = convertToRedisStream(stream);

        redisTemplate.opsForValue().set("stream:" + stream.getStreamKey(), redisStream, 10, TimeUnit.MINUTES);

        return convertToResponse(stream);
    }

    private RedisStream convertToRedisStream(Stream stream) {
        return RedisStream.builder()
                .title(stream.getTitle())
                .description(stream.getDescription())
                .streamKey(stream.getStreamKey())
                .status(stream.getStatus())
                .streamerId(stream.getStreamer().getUserId())
                .url(stream.getUrl())
                .thumbnail(stream.getThumbnail())
                .categories(stream.getCategories())
                .tags(stream.getTags())
                .build();
    }

    @Override
    public boolean authenticatePublish(Map<String, String> param) {

        String streamKey = param.get("name");
        if (streamKey == null || streamKey.isBlank()) {
            log.warn("authenticatePublish called without name param");
            return false;
        }

        String redisKey = "stream:" + streamKey;
        RedisStream stream = (RedisStream) redisTemplate.opsForValue().get(redisKey);
        if (stream == null) {
            log.warn("Stream expired from redis: {}", streamKey);
            return false;
        }

        if (!StreamStatus.PENDING.equals(stream.getStatus())) {
            log.warn("Invalid stream state {} for key {}", stream.getStatus(), streamKey);
            return false;
        }

        stream.setStatus(StreamStatus.PROCESSING);
        redisTemplate.opsForValue().set(redisKey, stream, 10, TimeUnit.MINUTES);

        FFMpegRequest request = new FFMpegRequest(
                streamKey,
                String.valueOf(stream.getStreamerId())
        );

        asyncProcessService.pushStreamProcessing(request);
        log.info("StreamKey {} moved to PROCESSING", streamKey);
        return true;
    }

    @Override
    public StreamStatus streamStatus(String streamKey, Long userId) {
        RedisStream stream = (RedisStream) redisTemplate.opsForValue().get("stream:" + streamKey);
        if (stream == null) {
            Stream streamInDb = streamRepository.findByStreamKey(streamKey)
                    .orElseThrow(() -> new StreamKeyNotFoundException("Stream not found"));
            return streamInDb.getStatus();
        }
        return stream.getStatus();
    }

    @Override
    @Transactional
    @Caching(
            evict = {
                    @CacheEvict(value = "streams-live", allEntries = true),
                    @CacheEvict(value = "streamed-videos", allEntries = true)
            }
    )
    public StartStreamResponse makeStreamLive(String streamKey, Long userId)
            throws StreamKeyNotFoundException, InvalidUserException {

        if (streamKey == null || streamKey.isBlank()) {
            throw new StreamKeyNotFoundException("Empty streamKey provided");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new InvalidUserException("User not found of id " + userId));

        RedisStream redisStream = (RedisStream) redisTemplate.opsForValue().get("stream:" + streamKey);

        if (redisStream == null) {
            throw new StreamKeyNotFoundException("No stream found for the provided key " + streamKey);
        }

        if (!StreamStatus.PROCESSING.equals(redisStream.getStatus())) {
            throw new StreamProcessingException("Stream not ready");
        }

        Stream stream = convertFromRedisStreamToStream(redisStream);
        stream.setStatus(StreamStatus.LIVE);
        stream.setStartedAt(Instant.now());
        stream.setStreamer(user);
        streamRepository.save(stream);
        user.getStreams().add(stream);
        userRepository.save(user);

        searchUserRepository.save(convertToSearchUser(user));
        searchStreamRepository.save(convertToStreamSearch(stream));

        redisTemplate.delete("stream:" + streamKey);
        log.info("stream is live for the key: {}", streamKey);

        return convertToResponse(stream);
    }

    @Override
    @Transactional
    @CacheEvict(value = "streamed-videos", allEntries = true)
    public void streamDone(String streamKey) {
        if (streamKey == null || streamKey.isBlank()) {
            throw new StreamProcessingException("Invalid stream key provided");
        }

        Stream stream = streamRepository.findByStreamKey(streamKey)
                .orElseThrow(() -> new StreamKeyNotFoundException("Stream not found for key: " + streamKey));

        if (stream.getStatus().equals(StreamStatus.ENDED)) {
            log.info("Stream already ended for key {} — ignoring duplicate call.", streamKey);
            return;
        }
        stream.setEndedAt(Instant.now());
        stream.setStatus(StreamStatus.ENDED);
        searchStreamRepository.save(convertToStreamSearch(stream));
        streamRepository.save(stream);
        log.info("stream ended with the key: {}", streamKey);
        asyncProcessService.stopStream(streamKey);
        log.info("Worker stopped gracefully: {}", streamKey);
    }

    private Stream convertFromRedisStreamToStream(RedisStream redisStream) {
        return Stream.builder()
                .title(redisStream.getTitle())
                .description(redisStream.getDescription())
                .streamKey(redisStream.getStreamKey())
                .status(redisStream.getStatus())
                .url(redisStream.getUrl())
                .thumbnail(redisStream.getThumbnail())
                .categories(redisStream.getCategories())
                .tags(redisStream.getTags())
                .build();
    }

    private FFMpegResponse ffmpegConverter(FFMpegRequest request) {
        return restClient.post()
                .uri("/convert")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, (req, res) -> {
                    throw new RecordingNotFoundException("No recording found for streamKey: " + request.getStreamKey());
                })
                .onStatus(HttpStatusCode::is5xxServerError, (req, res) -> {
                    throw new FFmpegFailedException("FFmpeg conversion failed for streamKey: " + request.getStreamKey());
                })
                .body(FFMpegResponse.class);
    }

    private StartStreamResponse convertToResponse(Stream stream) {
        return StartStreamResponse.builder()
                .streamId(stream.getId())
                .title(stream.getTitle())
                .streamKey(stream.getStreamKey())
                .url(stream.getUrl())
                .status(stream.getStatus())
                .startedAt(stream.getStartedAt())
                .description(stream.getDescription())
                .thumbnail(stream.getThumbnail())
                .build();
    }

    private Stream convertToStream(StartStreamRequest request, String thumbnailPath, User user) {
        return Stream.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(StreamStatus.PENDING)
                .streamer(user)
                .streamKey(request.getStreamKey())
                .url("/api/videos/" + user.getUserId() + "/" + request.getStreamKey() + "/" + request.getStreamKey() + ".m3u8")
                .thumbnail(thumbnailPath)
                .tags(request.getTags())
                .categories(request.getCategories())
                .build();
    }

    private SearchUser convertToSearchUser(User user) {
        return SearchUser.builder()
                .id(user.getUserId())
                .profilePic(user.getProfilePic())
                .name(user.getName())
                .followers(user.getFollowers().stream().map(User::getUserId).collect(Collectors.toSet()))
                .followersCount(user.getFollowers().size())
                .build();
    }

    private StreamSearch convertToStreamSearch(Stream stream) {
        return StreamSearch.builder()
                .id(stream.getId())
                .title(stream.getTitle())
                .description(stream.getDescription())
                .url(stream.getUrl())
                .status(stream.getStatus())
                .startedAt(stream.getStartedAt())
                .endedAt(stream.getEndedAt())
                .thumbnail(stream.getThumbnail())
                .streamerId(stream.getStreamer().getUserId())
                .streamerProfilePic(stream.getStreamer().getProfilePic())
                .streamerName(stream.getStreamer().getName())
                .tags(stream.getTags())
                .categories(stream.getCategories())
                .likesCount(stream.getLikes().size())
                .watchersCount(stream.getWatchers().size())
                .popularityScore(stream.getLikes().size() + (stream.getWatchers().size() * 2))
                .titleSuggest(stream.getTitle())
                .build();
    }
}