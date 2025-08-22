package dev.misfit.StreamingPlatform.services;

import ch.qos.logback.core.model.processor.ProcessorException;
import dev.misfit.StreamingPlatform.customExceptions.StreamKeyExpiredException;
import dev.misfit.StreamingPlatform.entities.Stream;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.DTO.StreamRequest;
import dev.misfit.StreamingPlatform.DTO.StreamResponse;
import dev.misfit.StreamingPlatform.repositories.StreamRepository;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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
    public boolean authenticatePublish(Map<String, String> param) {
        String streamKey = param.get("name");
        Optional<Stream> key = streamRepository.findByStreamKey(streamKey);
        return key.isPresent() && key.get().getIsLive();
    }

    @Override
    public void streamDone(String streamKey) throws Exception {
        Optional<Stream> streamOptional = streamRepository.findByStreamKey(streamKey);
        if (streamOptional.isEmpty()) {
            throw new Exception("Key expired generate new key");
        }

        Stream key = streamOptional.get();
        key.setIsLive(false);
        key.setEndedAt(Instant.now());

        String streamerId = key.getStreamer().getUserId().toString();

        String outputFolder = videoPath + "/" + streamerId + "/" + streamKey;
        new File(outputFolder).mkdirs();

        String wslOutputFolder = wslPath + streamerId + "/" + streamKey;

        String wslCommand = String.format(
                "ffmpeg -y -i $(ls -t /tmp/recordings/%s-*.mp4 | head -n 1) -codec: copy -hls_time 10 -hls_list_size 0 -f hls %s/%s.m3u8",
                streamKey,
                wslOutputFolder,
                streamKey
        );

        Process ffmpegProcess = new ProcessBuilder("wsl", "bash", "-c", wslCommand).start();
        try {
            int exitCode = ffmpegProcess.waitFor();
            if (exitCode != 0) {
                System.err.println("FFmpeg failed to convert video.");
            } else {
                String deleteCommand = String.format(
                        "rm $(ls /tmp/recordings/%s-*.mp4)",
                        streamKey
                );
                new ProcessBuilder("wsl", "bash", "-c", deleteCommand).start();
            }
        } catch (InterruptedException e) {
            throw new ProcessorException(e);
        }

        key.setUrl("/api/videos/" + streamerId + "/" + streamKey + "/" + streamKey + ".m3u8");
        key.setStreamKey(streamKey);
        streamRepository.save(key);
    }

    @Override
    public String generateStreamKey() {
        byte[] randomBytes = new byte[16];
        new SecureRandom().nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }

    @Override
    public StreamResponse startStream(StreamRequest request, MultipartFile thumbnail) throws Exception {
        Optional<User> optionalUser = userRepository.findById(request.getUserId());
        if (optionalUser.isEmpty()) {
            throw new Exception("Invalid user");
        }
        User user = optionalUser.get();

        Optional<Stream> existingStream = streamRepository.findByStreamKey(request.getStreamKey());
        if (existingStream.isPresent()) {
            throw new StreamKeyExpiredException("Duplicate keys not allowed... Generate new key");
        }

        String thumbnailOriginalFilename = thumbnail.getOriginalFilename();
        String outputFolder = videoPath + "/" + request.getUserId() + "/" + request.getStreamKey();
        new File(outputFolder).mkdirs();
        Path path = Path.of(outputFolder, thumbnailOriginalFilename);
        Files.copy(thumbnail.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        String thumbnailPath = "/thumbnail/" + request.getUserId() + "/" + request.getStreamKey() + "/" + thumbnailOriginalFilename;

        Stream stream = convertToStream(request, thumbnailPath);
        stream.setStreamer(user);
        streamRepository.save(stream);
        user.getStreams().add(stream);
        userRepository.save(user);
        return convertToResponse(stream);
    }

    private StreamResponse convertToResponse(Stream stream) {
        return StreamResponse.builder()
                .streamId(stream.getId())
                .title(stream.getTitle())
                .url(stream.getUrl())
                .isLive(stream.getIsLive())
                .startedAt(stream.getStartedAt())
                .views(stream.getViews())
                .build();
    }

    private Stream convertToStream(StreamRequest request, String thumbnailPath) {
        return Stream.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .isLive(true)
                .startedAt(Instant.now())
                .streamKey(request.getStreamKey())
                .url("/hls/" + request.getStreamKey() + ".m3u8")
                .thumbnail(thumbnailPath)
                .build();
    }
}
