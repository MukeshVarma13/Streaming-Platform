package dev.misfit.StreamingPlatform.repositories;

import dev.misfit.StreamingPlatform.entities.Stream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface StreamRepository extends JpaRepository<Stream, Long> {
    Optional<Stream> findByStreamKey(String streamKey);

//    @Query(value = "SELECT * FROM Streams WHERE description LIKE %:param% OR title LIKE %:param%", nativeQuery = true)
//    List<Stream> findInDescriptionOrInTitle(@Param("param") String param);

    Page<Stream> findByDescriptionContaining(String param, Pageable pageable);

    Page<Stream> findByTitleContaining(String param, Pageable pageable);

    Page<Stream> findByTagsIn(Collection<String> tags, Pageable pageable);

    Page<Stream> findByCategoriesIn(Collection<String> categories, Pageable pageable);

    Page<Stream> findByStreamer_UserId(Long userId, Pageable pageable);

}
