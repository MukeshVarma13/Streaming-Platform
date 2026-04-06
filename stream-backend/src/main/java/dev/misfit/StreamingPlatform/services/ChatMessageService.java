package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.ChannelContentRequest;
import dev.misfit.StreamingPlatform.DTO.ChannelContentResponse;
import dev.misfit.StreamingPlatform.DTO.ChatRequest;
import dev.misfit.StreamingPlatform.DTO.ChatResponse;
import org.springframework.stereotype.Service;

@Service
public interface ChatMessageService {
    ChatResponse addChat(Long streamId, ChatRequest chatRequest);

    ChannelContentResponse addChatToCommunityChannel( Long channelId, ChannelContentRequest request);
}
