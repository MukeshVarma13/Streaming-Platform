package dev.misfit.StreamingPlatform.services.impl;

import dev.misfit.StreamingPlatform.DTO.*;
import dev.misfit.StreamingPlatform.customExceptions.ChannelNotFoundException;
import dev.misfit.StreamingPlatform.customExceptions.CommunityNotFoundException;
import dev.misfit.StreamingPlatform.customExceptions.UserNotFoundException;
import dev.misfit.StreamingPlatform.entities.*;
import dev.misfit.StreamingPlatform.repositories.*;
import dev.misfit.StreamingPlatform.services.ChatMessageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final StreamRepository streamRepository;
    private final UserRepository userRepository;
    private final ChannelMessageRepository messageRepository;
    private final ChannelRepository channelRepository;
    private final CommunityRepository communityRepository;

    public ChatMessageServiceImpl(
            ChatMessageRepository chatMessageRepository,
            StreamRepository streamRepository,
            UserRepository userRepository,
            ChannelMessageRepository messageRepository,
            ChannelRepository channelRepository,
            CommunityRepository communityRepository
    ) {
        this.chatMessageRepository = chatMessageRepository;
        this.streamRepository = streamRepository;
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
        this.channelRepository = channelRepository;
        this.communityRepository = communityRepository;
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

    @Override
    @Transactional
    public ChannelContentResponse addChatToCommunityChannel(Long channelId, ChannelContentRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException("No user found for the given id"));
        Channels channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new ChannelNotFoundException("No channel exists in the community"));
        Community community = communityRepository.findById(channel.getCommunity().getId())
                .orElseThrow(() -> new CommunityNotFoundException("community not found"));

        ChannelMessage channelMessage = convertToChannelMessage(request, user, channel);
        channelMessage.setChannel(channel);
//        channel.getMessages().add(channelMessage);
        communityRepository.save(community);
        channelRepository.save(channel);
        messageRepository.save(channelMessage);

        return convertToChannelContentResponse(channelMessage);
    }

    private ChannelContentResponse convertToChannelContentResponse(ChannelMessage channelMessage) {
        return ChannelContentResponse.builder()
                .id(channelMessage.getId())
                .content(channelMessage.getContent())
                .userName(channelMessage.getSender().getName())
                .userProfile(channelMessage.getSender().getProfilePic())
                .build();
    }

    private ChannelMessage convertToChannelMessage(ChannelContentRequest request, User user, Channels channel) {
        return ChannelMessage.builder()
                .content(Content.builder()
                        .content(request.getContent())
                        .type(request.getContentType())
                        .build()
                )
                .sender(user)
                .channel(channel)
                .build();
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
