package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.StartStreamRequest;
import dev.misfit.StreamingPlatform.DTO.StartStreamResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public interface StreamService {
    String generateStreamKey();

    StartStreamResponse startStream(StartStreamRequest request, MultipartFile thumbnail, Long userId);

    boolean authenticatePublish(Map<String, String> param);

    boolean streamStatus(Long streamId);

    StartStreamResponse makeStreamLive(String streamKey, Long userId);

    void streamDone(String streamKey);

}
