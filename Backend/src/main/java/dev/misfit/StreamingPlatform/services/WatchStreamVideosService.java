package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.io.StreamUserResponse;
import org.springframework.stereotype.Service;

@Service
public interface WatchStreamVideosService {

    StreamUserResponse getStreamerDetails(Long streamerId) throws Exception;
}
