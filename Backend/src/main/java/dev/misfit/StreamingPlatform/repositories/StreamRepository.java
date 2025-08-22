package dev.misfit.StreamingPlatform.repositories;

import dev.misfit.StreamingPlatform.entities.Stream;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StreamRepository extends JpaRepository<Stream, Long> {
    Optional<Stream> findByStreamKey(String streamKey);

//    @Query(value = "SELECT * FROM Streams WHERE description LIKE %:param% OR title LIKE %:param%", nativeQuery = true)
//    List<Stream> findInDescriptionOrInTitle(@Param("param") String param);

    List<Stream> findByDescriptionContaining(String param);

    List<Stream> findByTitleContaining(String param);
}
