package dev.misfit.StreamingPlatform.repositories;

import dev.misfit.StreamingPlatform.entities.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
}
