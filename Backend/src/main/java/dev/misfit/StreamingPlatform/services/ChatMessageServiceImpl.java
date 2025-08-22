package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.entities.ChatMessage;
import dev.misfit.StreamingPlatform.entities.Stream;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.DTO.ChatRequest;
import dev.misfit.StreamingPlatform.DTO.ChatResponse;
import dev.misfit.StreamingPlatform.repositories.ChatMessageRepository;
import dev.misfit.StreamingPlatform.repositories.StreamRepository;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final StreamRepository streamRepository;
    private final UserRepository userRepository;

    public ChatMessageServiceImpl(ChatMessageRepository chatMessageRepository, StreamRepository streamRepository, UserRepository userRepository) {
        this.chatMessageRepository = chatMessageRepository;
        this.streamRepository = streamRepository;
        this.userRepository = userRepository;
    }


    @Override
    public ChatResponse addChat(Long streamId, ChatRequest chatRequest) {
        Optional<Stream> streamOptional = streamRepository.findById(streamId);
        Optional<User> userOptional = userRepository.findById(chatRequest.getUserId());
        if (streamOptional.isEmpty() || userOptional.isEmpty()) {
            throw new RuntimeException("Invalid user or Stream not found!!");
        }
        Stream stream = streamOptional.get();
        User user = userOptional.get();
        ChatMessage savedMessage = chatMessageRepository.save(convertToChatMessage(chatRequest, stream, user));
        return convertToChatResponse(savedMessage);
    }

    private ChatResponse convertToChatResponse(ChatMessage savedMessage) {
        return ChatResponse.builder()
                .id(savedMessage.getId())
                .content(savedMessage.getContent())
                .userName(savedMessage.getUser().getName())
                .userProfile(savedMessage.getUser().getProfilePic())
                .build();
    }

    private ChatMessage convertToChatMessage(ChatRequest chatRequest, Stream stream, User user) {
        return ChatMessage.builder()
                .content(chatRequest.getContent())
                .timestamp(LocalDateTime.now())
                .user(user)
                .stream(stream)
                .build();
    }
}
