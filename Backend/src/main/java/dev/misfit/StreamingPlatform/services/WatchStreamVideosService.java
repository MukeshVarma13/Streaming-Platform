package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.StreamerResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface WatchStreamVideosService {

    StreamerResponse getStreamerDetails(Long streamerId, Pageable pageable);
}
