package dev.misfit.StreamingPlatform.controller;

import dev.misfit.StreamingPlatform.entities.ChatMessage;
import dev.misfit.StreamingPlatform.repositories.StreamRepository;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ChatController {

    private final StreamRepository streamRepository;

    public ChatController(StreamRepository streamRepository) {
        this.streamRepository = streamRepository;
    }

    @MessageMapping("/sendMessage/{streamId}")  // Receive from /app/sendMessage
    @SendTo("/topic/room/{streamId}") // send to subscribers of /topic/room
    public ChatMessage message(
            @DestinationVariable Long streamId
    ){

    }
}
