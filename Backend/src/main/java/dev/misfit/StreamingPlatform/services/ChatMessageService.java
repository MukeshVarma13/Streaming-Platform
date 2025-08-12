package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.io.ChatRequest;
import dev.misfit.StreamingPlatform.io.ChatResponse;
import org.springframework.stereotype.Service;

@Service
public interface ChatMessageService {
    ChatResponse addChat(Long streamId, ChatRequest chatRequest);
}
