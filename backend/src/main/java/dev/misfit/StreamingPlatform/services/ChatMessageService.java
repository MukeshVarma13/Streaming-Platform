package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.ChatRequest;
import dev.misfit.StreamingPlatform.DTO.ChatResponse;
import org.springframework.stereotype.Service;

@Service
public interface ChatMessageService {
    ChatResponse addChat(Long streamId, ChatRequest chatRequest);
}
