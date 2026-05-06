package dev.misfit.StreamingPlatform.services.impl;

import co.elastic.clients.elasticsearch._types.query_dsl.FieldValueFactorModifier;
import co.elastic.clients.elasticsearch._types.query_dsl.FunctionBoostMode;
import co.elastic.clients.elasticsearch._types.query_dsl.FunctionScoreMode;
import co.elastic.clients.elasticsearch._types.query_dsl.TextQueryType;
import dev.misfit.StreamingPlatform.DTO.PageResponse;
import dev.misfit.StreamingPlatform.DTO.StreamSearchResponse;
import dev.misfit.StreamingPlatform.customExceptions.StreamNotFoundException;
import dev.misfit.StreamingPlatform.customExceptions.UserNotFoundException;
import dev.misfit.StreamingPlatform.entities.SearchUser;
import dev.misfit.StreamingPlatform.entities.Stream;
import dev.misfit.StreamingPlatform.entities.StreamSearch;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.repositories.SearchUserRepository;
import dev.misfit.StreamingPlatform.repositories.StreamRepository;
import dev.misfit.StreamingPlatform.repositories.StreamSearchRepository;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import dev.misfit.StreamingPlatform.services.StreamSearchService;
import dev.misfit.StreamingPlatform.utils.StreamStatus;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.*;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StreamSearchServiceImpl implements StreamSearchService {

    private final ElasticsearchOperations operations;
    private final StreamSearchRepository searchRepository;
    private final SearchUserRepository searchUserRepository;
    private final StreamRepository streamRepository;
    private final UserRepository userRepository;

    public StreamSearchServiceImpl(ElasticsearchOperations operations, StreamSearchRepository searchRepository, SearchUserRepository searchUserRepository, StreamRepository streamRepository, UserRepository userRepository) {
        this.operations = operations;
        this.searchRepository = searchRepository;
        this.searchUserRepository = searchUserRepository;
        this.streamRepository = streamRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Cacheable(value = "streamed-videos", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public PageResponse<StreamSearch> getAllStreams(Pageable pageable) {
        Page<StreamSearch> endedStreams = searchRepository.findByStatus(StreamStatus.ENDED, pageable);
        return new PageResponse<>(endedStreams);
    }

    @Override
    @Cacheable(value = "streams-live", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public PageResponse<StreamSearch> getLiveStreams(Pageable pageable) {
        Page<StreamSearch> liveStreams = searchRepository.findByStatus(StreamStatus.LIVE, pageable);
        return new PageResponse<>(liveStreams);
    }

    @Override
    @Cacheable(value = "top-streamers", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public PageResponse<SearchUser> topFollowedStreamers(Pageable pageable) {
        Page<SearchUser> topStreamers = searchUserRepository.findAll(pageable);
        return new PageResponse<>(topStreamers);
    }

    @Override
//    @Cacheable(value = "watch-stream", key = "#streamId")
    public StreamSearchResponse watchStream(Long streamId, Long userId){

        Stream streamFromDb = streamRepository.findById(streamId)
                .orElseThrow(() -> new StreamNotFoundException("stream not found in DB"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found in DB"));

        boolean isFollowing = streamFromDb.getStreamer().getFollowers().contains(user);
        boolean liked = streamFromDb.getLikes().contains(user);

        StreamSearch stream = searchRepository.findById(streamId)
                .orElseThrow(() -> new StreamNotFoundException("stream not found in ES"));

        SearchUser userInES = searchUserRepository.findById(stream.getStreamerId())
                .orElseThrow(() -> new UserNotFoundException("User not found in ES"));

        return StreamSearchResponse.builder()
                .streamSearch(stream)
                .searchUser(userInES)
                .isFollowing(isFollowing)
                .liked(liked)
                .build();
    }

    @Override
    public PageResponse<StreamSearch> searchInTitle(String term, Pageable pageable) {
        return new PageResponse<>(
                mapToPage(fuzzyStreams(term, "title", pageable), pageable)
        );
    }

    @Override
    public PageResponse<StreamSearch> searchByTag(String term,String status, Pageable pageable) {
        String streamStatus = status.toUpperCase();
        NativeQuery query = NativeQuery.builder()
                .withQuery(q -> q
                        .bool(b -> b
                                // The primary logic including scoring
                                .must(m -> m
                                        .functionScore(fs -> fs
                                                .query(inner -> inner
                                                        .term(t -> t
                                                                .field("tags")
                                                                .value(term)
                                                                .caseInsensitive(true)
                                                        )
                                                )
                                                .functions(f -> f
                                                        .fieldValueFactor(fvf -> fvf
                                                                .field("popularityScore")
                                                                .factor(1.2)
                                                                .modifier(FieldValueFactorModifier.Log1p)
                                                                .missing(1.0)
                                                        )
                                                )
                                                .boostMode(FunctionBoostMode.Sum)
                                                .scoreMode(FunctionScoreMode.Sum)
                                        )
                                )
                                // The hard filter condition (no impact on score)
                                .filter(f -> f
                                        .term(t -> t
                                                .field("status")
                                                .value(streamStatus)
                                        )
                                )
                        )
                )
                .withPageable(pageable)
                .build();

        SearchHits<StreamSearch> search = operations.search(query, StreamSearch.class);
        return new PageResponse<>(mapToPage(search, pageable));
    }


    @Override
    public PageResponse<StreamSearch> searchByCategory(String term, Pageable pageable) {
        return new PageResponse<>(mapToPage(nonFuzzyStream(term, "categories", pageable), pageable));
    }

    @Override
    public PageResponse<StreamSearch> searchInDescription(String term, Pageable pageable) {
        return new PageResponse<>(mapToPage(fuzzyStreams(term, "description", pageable), pageable));
    }

    @Override
    public PageResponse<SearchUser> searchStreamerByName(String term, Pageable pageable) {
        NativeQuery query = NativeQuery.builder()
                .withQuery(q -> q
                        .functionScore(fs -> fs
                                .query(inner -> inner
                                        .match(m -> m
                                                .field("name")
                                                .query(term)
                                                .fuzziness("AUTO")
                                                .prefixLength(1)
                                        )
                                )
                                .functions(f -> f
                                        .fieldValueFactor(fvf -> fvf
                                                .field("followersCount")
                                                .modifier(FieldValueFactorModifier.Log1p)
                                                .factor(1.3)
                                                .missing(1.0)
                                        )
                                )
                                .boostMode(FunctionBoostMode.Sum)
                                .scoreMode(FunctionScoreMode.Sum)
                        )
                )
                .withPageable(pageable)
                .build();

        return new PageResponse<>(mapToPage(operations.search(query, SearchUser.class), pageable));
    }

    @Override
    public PageResponse<StreamSearch> autoCompleteTitle(String term) {
        NativeQuery query = NativeQuery.builder()
                .withQuery(q -> q
                        .multiMatch(mm -> mm
                                .query(term)
                                .type(TextQueryType.BoolPrefix)
                                .fields("titleSuggest", "titleSuggest._2gram", "titleSuggest._3gram")
                        )
                )
                .withPageable(PageRequest.of(0, 10))
                .build();
        return new PageResponse<>(mapToPage(operations.search(query, StreamSearch.class), Pageable.unpaged()));
    }

    private SearchHits<StreamSearch> fuzzyStreams(String term, String field, Pageable pageable) {
        NativeQuery query = NativeQuery.builder()
                .withQuery(q -> q
                        .functionScore(fs -> fs
                                .query(inner -> inner
                                        .match(m -> m
                                                .field(field)
                                                .query(term)
                                                .fuzziness("AUTO")
                                                .prefixLength(1)
                                                .maxExpansions(50)
                                        )
                                )
                                .functions(f -> f
                                        .fieldValueFactor(fvf -> fvf
                                                .field("popularityScore")
                                                .factor(1.2)
                                                .modifier(FieldValueFactorModifier.Log1p)
                                                .missing(1.0)
                                        )
                                )
                                .boostMode(FunctionBoostMode.Sum)
                                .scoreMode(FunctionScoreMode.Sum)
                        )
                )
                .withPageable(pageable)
                .build();

        return operations.search(query, StreamSearch.class);
    }

    private SearchHits<StreamSearch> nonFuzzyStream(String term, String field, Pageable pageable) {
        NativeQuery query = NativeQuery.builder()
                .withQuery(q -> q
                        .functionScore(fs -> fs
                                .query(inner -> inner
                                        .term(t -> t
                                                .field(field)
                                                .value(term)
                                                .caseInsensitive(true)
                                        )
                                )
                                .functions(f -> f
                                        .fieldValueFactor(fvf -> fvf
                                                .field("popularityScore")
                                                .factor(1.2)
                                                .modifier(FieldValueFactorModifier.Log1p)
                                                .missing(1.0)
                                        )
                                )
                                .boostMode(FunctionBoostMode.Sum)
                                .scoreMode(FunctionScoreMode.Sum)
                        )
                )
                .withPageable(pageable)
                .build();

        return operations.search(query, StreamSearch.class);
    }

    private <T> Page<T> mapToPage(SearchHits<T> searchHits, Pageable pageable) {
        List<T> content = searchHits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .toList();
        return new PageImpl<>(content, pageable, searchHits.getTotalHits());
    }
}
