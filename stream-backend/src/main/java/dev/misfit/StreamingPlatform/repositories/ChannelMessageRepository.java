package dev.misfit.StreamingPlatform.repositories;

import dev.misfit.StreamingPlatform.entities.ChannelMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChannelMessageRepository extends JpaRepository<ChannelMessage, Long> {

    Page<ChannelMessage> findByChannelIdOrderByTimestampDesc(
            Long channelId,
            Pageable pageable
    );
}
