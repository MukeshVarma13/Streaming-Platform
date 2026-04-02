package dev.misfit.StreamingPlatform.repositories;

import dev.misfit.StreamingPlatform.entities.SearchUser;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface SearchUserRepository extends ElasticsearchRepository<SearchUser, Long> {
}
