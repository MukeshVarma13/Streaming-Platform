package dev.misfit.StreamingPlatform.controller;

import dev.misfit.StreamingPlatform.io.ChatRequest;
import dev.misfit.StreamingPlatform.io.ChatResponse;
import dev.misfit.StreamingPlatform.services.ChatMessageService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class ChatController {

    private final ChatMessageService messageService;

    public ChatController(ChatMessageService messageService) {
        this.messageService = messageService;
    }

    @MessageMapping("/sendMessage/{streamId}")  // Receive from /app/sendMessage
    @SendTo("/topic/stream/{streamId}") // send to subscribers of /topic/stream
    public ChatResponse message(@DestinationVariable Long streamId,@RequestBody ChatRequest chatRequest) {
        return messageService.addChat(streamId, chatRequest);
    }
}
