package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.StartStreamRequest;
import dev.misfit.StreamingPlatform.DTO.StartStreamResponse;
import dev.misfit.StreamingPlatform.DTO.StreamVideosResponse;
import dev.misfit.StreamingPlatform.DTO.StreamerResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@Service
public interface StreamerService {
    StartStreamResponse updateStreamMetaData(Long streamID, StartStreamRequest request, MultipartFile thumbnail,Long userId);
    Set<StreamerResponse> followersList(Long streamerId);
    StreamerResponse watchedStreamList(Long streamerId);
    Set<StreamerResponse> followingList(Long streamerId);
    Set<StreamVideosResponse> likedStreams(Long streamerId);
}
