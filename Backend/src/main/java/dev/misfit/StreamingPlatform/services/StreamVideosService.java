package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.ChatResponse;
import dev.misfit.StreamingPlatform.DTO.StreamVideosResponse;
import dev.misfit.StreamingPlatform.DTO.StreamerResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StreamVideosService {
    Page<StreamVideosResponse> getActiveStreams(Pageable pageable);

    Page<StreamVideosResponse> getStreamedVideos(Pageable pageable);

    Integer addLikes(Long streamId, boolean like, Long userId);

    void follow(Long streamerId, boolean follow, Long userId);

    Page<StreamerResponse> topFollowedStreamers(Pageable pageable);

    StreamVideosResponse watchStream(Long streamId);

    List<ChatResponse> getChatMessages(Long streamId);

    StreamerResponse getLoggedUser(Long userId, String email);

    Page<StreamVideosResponse> searchInDescription(String term, Pageable pageable);

    Page<StreamVideosResponse> searchInTitle(String term, Pageable pageable);

    Page<StreamerResponse> getStreamByUserName(String term, Pageable pageable);

    Page<StreamVideosResponse> findByTags(String term, Pageable pageable);

    Page<StreamVideosResponse> findByCategories(String term, Pageable pageable);
}
