package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.StreamRequest;
import dev.misfit.StreamingPlatform.DTO.StreamResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public interface StreamService {
    boolean authenticatePublish(Map<String, String> param);

    void streamDone(String streamKey) throws Exception;

    String generateStreamKey();

    StreamResponse startStream(StreamRequest request, MultipartFile thumbnail) throws Exception;
}

