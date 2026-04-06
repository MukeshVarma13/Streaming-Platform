package dev.misfit.StreamingPlatform.config;

import dev.misfit.StreamingPlatform.utils.ViewerCountHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer, WebSocketConfigurer {

    private final ViewerCountHandler viewerCountHandler = new ViewerCountHandler();

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.setApplicationDestinationPrefixes("/app"); // for incoming and send to MessageMapping "/app/sendMessage/{streamId}"
        config.enableSimpleBroker("/topic"); // Don't know its use yet
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat") // used to make connection just like RequestMapping all the chats endpoint starting from /chat is marked as webSocket's
                .setAllowedOriginPatterns("*")
                .withSockJS(); // WebSocket endpoint for connection establishment
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(viewerCountHandler, "/viewers")
                .setAllowedOrigins("*");
    }
}
