package dev.misfit.StreamingPlatform.repositories;

import dev.misfit.StreamingPlatform.entities.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommunityRepository extends JpaRepository<Community, Long> {
}
