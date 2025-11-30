package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.StartStreamRequest;
import dev.misfit.StreamingPlatform.DTO.StartStreamResponse;
import dev.misfit.StreamingPlatform.customExceptions.*;
import dev.misfit.StreamingPlatform.entities.Stream;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.repositories.StreamRepository;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import dev.misfit.StreamingPlatform.utils.StreamStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;
import java.util.Optional;

@Service
public class StreamServiceImpl implements StreamService {

    private static final Logger log = LoggerFactory.getLogger(StreamServiceImpl.class);
    private final StreamRepository streamRepository;
    private final UserRepository userRepository;
    @Value("${videos.path}")
    String videoPath;
    @Value("${wsl.path}")
    String wslPath;

    public StreamServiceImpl(StreamRepository repository, UserRepository userRepository) {
        this.streamRepository = repository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public boolean authenticatePublish(Map<String, String> param) {
        String streamKey = param.get("name");
        if (streamKey == null || streamKey.isBlank()) {
            log.warn("authenticatePublish called without name param");
            return false;
        }

        Optional<Stream> key = streamRepository.findByStreamKey(streamKey);
        if (key.isPresent() && StreamStatus.PENDING.equals(key.get().getStatus())) {
            Stream stream = key.get();
            stream.setStatus(StreamStatus.PROCESSING);
            streamRepository.save(stream);
            log.info("StreamKey {} moved to PROCESSING", streamKey);
            return true;
        } else {
            log.warn("Invalid or non-pending stream key: {}", streamKey);
            return false;
        }
    }

    @Override
    public boolean streamStatus(Long streamId) {
        Stream stream = streamRepository.findById(streamId)
                .orElseThrow(() -> new StreamKeyNotFoundException("Stream not found"));
        return stream.getStatus().equals(StreamStatus.PROCESSING);
    }

    @Override
    @Transactional
    public void streamDone(String streamKey) throws StreamProcessingException {
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

        String streamerId = stream.getStreamer().getUserId().toString();

        String outputFolder = videoPath + "/" + streamerId + "/" + streamKey;
        new File(outputFolder).mkdirs();

        String wslOutputFolder = wslPath + streamerId + "/" + streamKey;

        // 1. find most recent mp4 recorded by WSL /tmp/recordings
        String listCommand = String.format("ls -t /tmp/recordings/%s-*.mp4 | head -n 1", streamKey);
        String inputFile = null;
        try {
            Process listProcess = new ProcessBuilder("wsl", "bash", "-c", listCommand).start();
            inputFile = readProcessOutput(listProcess);
        } catch (Exception e) {
            throw new StreamProcessingException("Failed to query recordings for stream key: " + streamKey, e);
        }
        if (inputFile == null || inputFile.isBlank()) {
            log.error("No recorded MP4 file found for streamKey: {}", streamKey);
            throw new RecordingNotFoundException("No recording found for streamKey: " + streamKey);
        }
        inputFile = inputFile.trim(); // remove newline
        log.info("Using input file: {}", inputFile);

        // 2. FFmpeg command (MP4 to HLS)
        String wslCommand = String.format(
                "ffmpeg -y -i %s -codec copy -hls_time 10 -hls_list_size 0 -f hls %s/%s.m3u8",
                inputFile,
                wslOutputFolder,
                streamKey
        );
        try {
            ProcessBuilder pb = new ProcessBuilder("wsl", "bash", "-c", wslCommand);
            Process ffmpegProcess = pb.start();
            // Consume logs to prevent blocking and print them to stderr for clear separation
            consumeStream(ffmpegProcess.getInputStream());
            consumeStream(ffmpegProcess.getErrorStream());

            int exitCode = ffmpegProcess.waitFor();
            if (exitCode != 0) {
                log.error("FFmpeg failed to convert video.");
                throw new FFmpegFailedException("FFmpeg conversion failed for streamKey: " + streamKey);
            }
        } catch (Exception e) {
            throw new StreamProcessingException("FFmpeg conversion failed for streamKey: " + streamKey, e);
        }

        // 3. Cleanup
        String deleteCommand = String.format("rm /tmp/recordings/%s-*.mp4", streamKey);
        try {
            new ProcessBuilder("wsl", "bash", "-c", deleteCommand).start();
            log.info("Deleted original recordings for streamKey {}", streamKey);
        } catch (Exception e) {
            throw new FFmpegFailedException("Failed to delete original recordings for {} " + streamKey, e.getCause());
        }

        // 4. Url and other part
        stream.setUrl("/api/videos/" + streamerId + "/" + streamKey + "/" + streamKey + ".m3u8");
        stream.setStreamKey(streamKey);
        streamRepository.save(stream);

        log.info("Stream conversion completed and record updated for: {}", streamKey);
    }

    private void consumeStream(InputStream inputStream) {
        new Thread(() -> {
            try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream))) {
                String line;
                while ((line = br.readLine()) != null) {
                    System.out.println("[FFMPEG] " + line);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    }

    private String readProcessOutput(Process process) throws Exception {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            return br.readLine(); // only need the first line
        }
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
        if (request == null || request.getStreamKey() == null || request.getStreamKey().isBlank()) {
            throw new StreamProcessingException("Invalid request or missing streamKey");
        }
        if (thumbnail == null || thumbnail.isEmpty()) {
            throw new StreamProcessingException("Thumbnail file is required");
        }

        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new InvalidUserException("Invalid user id: " + userId);
        }
        User user = optionalUser.get();

        Optional<Stream> existingStream = streamRepository.findByStreamKey(request.getStreamKey());
        if (existingStream.isPresent()) {
            throw new DuplicateStreamKeyException("Duplicate keys not allowed. Generate new key");
        }

        String thumbnailOriginalFilename = thumbnail.getOriginalFilename();
        String outputFolder = videoPath + "/" + userId + "/" + request.getStreamKey();
        new File(outputFolder).mkdirs();

        try {
            Path path = Path.of(outputFolder, thumbnailOriginalFilename);
            Files.copy(thumbnail.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            throw new StreamProcessingException("Failed to save thumbnail", e);
        }

        String thumbnailPath = "/thumbnail/" + userId + "/" + request.getStreamKey() + "/" + thumbnailOriginalFilename;

        Stream stream = convertToStream(request, thumbnailPath);
        stream.setStreamer(user);
        streamRepository.save(stream);
        user.getStreams().add(stream);
        userRepository.save(user);
        return convertToResponse(stream);
    }

    @Override
    public StartStreamResponse makeStreamLive(String streamKey, Long userId)
            throws StreamKeyNotFoundException, InvalidUserException {

        if (streamKey == null || streamKey.isBlank()) {
            throw new StreamKeyNotFoundException("Empty streamKey provided");
        }

        if (userRepository.findById(userId).isEmpty()) {
            throw new InvalidUserException("User not found of id " + userId);
        }

        Stream stream = streamRepository.findByStreamKey(streamKey)
                .orElseThrow(() -> new StreamKeyNotFoundException("No stream found for the provided key " + streamKey));

        if (stream.getStatus().equals(StreamStatus.PROCESSING)) {
            stream.setStatus(StreamStatus.LIVE);
            stream.setStartedAt(Instant.now());
            streamRepository.save(stream);
            return convertToResponse(stream);
        } else {
            throw new StreamProcessingException("Please connect to OBS then start the stream. Current status: " + stream.getStatus());
        }
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

    private Stream convertToStream(StartStreamRequest request, String thumbnailPath) {
        return Stream.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(StreamStatus.PENDING)
                .streamKey(request.getStreamKey())
                .url("/hls/" + request.getStreamKey() + ".m3u8")
                .thumbnail(thumbnailPath)
                .tags(request.getTags())
                .categories(request.getCategories())
                .build();
    }
}
