package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.entities.Stream;
import dev.misfit.StreamingPlatform.io.StreamRequest;
import dev.misfit.StreamingPlatform.io.StreamResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface StreamService {
    boolean authenticatePublish(Map<String, String> param);

    void streamDone(String streamKey) throws Exception;

    String generateStreamKey();

    StreamResponse startStream(StreamRequest request) throws Exception;
}

