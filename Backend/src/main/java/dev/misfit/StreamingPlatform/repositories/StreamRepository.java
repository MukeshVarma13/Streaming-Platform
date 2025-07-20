package dev.misfit.StreamingPlatform.repositories;

import dev.misfit.StreamingPlatform.entities.Stream;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StreamRepository extends JpaRepository<Stream, Long> {
    Optional<Stream> findByStreamKey(String streamKey);
}
