package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.PageResponse;
import dev.misfit.StreamingPlatform.DTO.StreamSearchResponse;
import dev.misfit.StreamingPlatform.entities.SearchUser;
import dev.misfit.StreamingPlatform.entities.StreamSearch;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface StreamSearchService {

    PageResponse<StreamSearch> getAllStreams(Pageable pageable);

    PageResponse<StreamSearch> getLiveStreams(Pageable pageable);

    PageResponse<SearchUser> topFollowedStreamers(Pageable pageable);

    StreamSearchResponse watchStream(Long streamId, Long userId);

    PageResponse<StreamSearch> searchInTitle(String term, Pageable pageable);

    PageResponse<StreamSearch> searchByTag(String term, Pageable pageable);

    PageResponse<StreamSearch> searchByCategory(String term, Pageable pageable);

    PageResponse<StreamSearch> searchInDescription(String term, Pageable pageable);

    PageResponse<SearchUser> searchStreamerByName(String term, Pageable pageable);

    PageResponse<StreamSearch> autoCompleteTitle(String term);
}
