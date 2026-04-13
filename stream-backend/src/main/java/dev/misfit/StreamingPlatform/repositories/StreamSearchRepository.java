package dev.misfit.StreamingPlatform.repositories;

import dev.misfit.StreamingPlatform.entities.Stream;
import dev.misfit.StreamingPlatform.entities.StreamSearch;
import dev.misfit.StreamingPlatform.utils.StreamStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface StreamSearchRepository extends ElasticsearchRepository<StreamSearch, Long> {
    Page<StreamSearch> findByStatus(StreamStatus streamStatus, Pageable pageable);
    Page<StreamSearch> findByStreamerId(Long userId, Pageable pageable);
}
