package dev.misfit.community.controller;

import dev.misfit.community.dto.SessionManager;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/signal")
    @SendTo("/topic/signals")
    public SessionManager sessionManager(SessionManager manager) {
        return manager;
    }
}
