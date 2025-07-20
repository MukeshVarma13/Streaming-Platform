package dev.misfit.StreamingPlatform.services;

import ch.qos.logback.core.model.processor.ProcessorException;
import dev.misfit.StreamingPlatform.customExceptions.StreamKeyExpiredException;
import dev.misfit.StreamingPlatform.entities.Stream;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.io.StreamRequest;
import dev.misfit.StreamingPlatform.io.StreamResponse;
import dev.misfit.StreamingPlatform.repositories.StreamRepository;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
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

        String outputFolder = videoPath + "/" + streamerId;
        new File(outputFolder).mkdirs();

        String wslOutputFolder = wslPath + streamerId;
        String uniqueKey = streamKey + "_" + System.currentTimeMillis();

        String wslCommand = String.format(
                "ffmpeg -y -i $(ls -t /tmp/recordings/%s-*.flv | head -n 1) -c copy %s/%s.mp4",
                streamKey,
                wslOutputFolder,
                uniqueKey
        );

        Process ffmpegProcess = new ProcessBuilder("wsl", "bash", "-c", wslCommand).start();
        try {
            int exitCode = ffmpegProcess.waitFor();
            if (exitCode != 0) {
                System.err.println("FFmpeg failed to convert video.");
            } else {
                String deleteCommand = String.format(
                        "rm $(ls -t /tmp/recordings/%s-*.flv | head -n 1)",
                        streamKey
                );
                new ProcessBuilder("wsl", "bash", "-c", deleteCommand).start();
            }
        } catch (InterruptedException e) {
            throw new ProcessorException(e);
        }

        key.setUrl("/api/videos/" + streamerId + "/" + uniqueKey + ".mp4");
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
    public StreamResponse startStream(StreamRequest request) throws Exception {
        Optional<User> optionalUser = userRepository.findById(request.getUserId());
        if (optionalUser.isEmpty()) {
            throw new Exception("Invalid user");
        }
        User user = optionalUser.get();

        Optional<Stream> existingStream = streamRepository.findByStreamKey(request.getStreamKey());
        if (existingStream.isPresent()) {
            throw new StreamKeyExpiredException("Duplicate keys not allowed... Generate new key");
        }

        Stream stream = convertToStream(request);
        stream.setStreamer(user);
        streamRepository.save(stream);
        user.getStreams().add(stream);
        return convertToResponse(stream);
    }

    private StreamResponse convertToResponse(Stream stream) {
        return StreamResponse.builder()
                .streamId(stream.getId())
                .title(stream.getTitle())
                .url(stream.getUrl())
                .isLive(stream.getIsLive())
                .startedAt(stream.getStartedAt())
                .build();
    }

    private Stream convertToStream(StreamRequest request) {
        return Stream.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .isLive(true)
                .startedAt(Instant.now())
                .streamKey(request.getStreamKey())
                .url("/hls/" + request.getStreamKey() + ".m3u8")
                .build();
    }
}
