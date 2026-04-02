package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.ChatResponse;
import dev.misfit.StreamingPlatform.DTO.StreamerResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StreamVideosService {

    Long addLikes(Long streamId, boolean like, Long userId);

    void follow(Long streamerId, boolean follow, Long userId);

    List<ChatResponse> getChatMessages(Long streamId);

    StreamerResponse getLoggedUser(Long userId, String email);

}
