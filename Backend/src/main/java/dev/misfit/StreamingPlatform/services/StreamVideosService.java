package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.io.StreamUserResponse;
import dev.misfit.StreamingPlatform.io.StreamVideosResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StreamVideosService {
    List<StreamVideosResponse> getActiveStreams();

    List<StreamVideosResponse> getStreamedVideos();

    Integer addLikes(Long streamId, boolean like) throws Exception;

    void follow(Long streamerId, boolean follow) throws Exception;

    List<StreamUserResponse> topFollowedStreamers();

    StreamVideosResponse watchStream(Long streamId) throws Exception;
}
