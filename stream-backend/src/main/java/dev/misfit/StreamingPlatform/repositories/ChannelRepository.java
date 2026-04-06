package dev.misfit.StreamingPlatform.repositories;

import dev.misfit.StreamingPlatform.entities.Channels;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChannelRepository extends JpaRepository<Channels, Long> {
}
