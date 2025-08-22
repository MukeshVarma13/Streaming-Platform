package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.ChatResponse;
import dev.misfit.StreamingPlatform.DTO.StreamUserResponse;
import dev.misfit.StreamingPlatform.DTO.StreamVideosResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StreamVideosService {
    List<StreamVideosResponse> getActiveStreams();

    List<StreamVideosResponse> getStreamedVideos();

    Integer addLikes(Long streamId, boolean like, Long userId) throws Exception;

    void follow(Long streamerId, boolean follow, Long userId) throws Exception;

    List<StreamUserResponse> topFollowedStreamers();

    StreamVideosResponse watchStream(Long streamId) throws Exception;

    List<ChatResponse> getChatMessages(Long streamId) throws Exception;

    StreamUserResponse getLoggedUser(Long userId, String email) throws Exception;

    List<StreamVideosResponse> searchInDescription(String find);

    List<StreamVideosResponse> searchInTitle(String find);
}
