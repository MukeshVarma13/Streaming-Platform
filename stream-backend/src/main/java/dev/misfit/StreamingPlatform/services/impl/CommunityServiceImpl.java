package dev.misfit.StreamingPlatform.services.impl;

import dev.misfit.StreamingPlatform.DTO.*;
import dev.misfit.StreamingPlatform.customExceptions.ChannelNotFoundException;
import dev.misfit.StreamingPlatform.customExceptions.CommunityNotFoundException;
import dev.misfit.StreamingPlatform.customExceptions.UnauthorizedUserException;
import dev.misfit.StreamingPlatform.customExceptions.UserNotFoundException;
import dev.misfit.StreamingPlatform.entities.ChannelMessage;
import dev.misfit.StreamingPlatform.entities.Channels;
import dev.misfit.StreamingPlatform.entities.Community;
import dev.misfit.StreamingPlatform.entities.User;
import dev.misfit.StreamingPlatform.repositories.ChannelMessageRepository;
import dev.misfit.StreamingPlatform.repositories.ChannelRepository;
import dev.misfit.StreamingPlatform.repositories.CommunityRepository;
import dev.misfit.StreamingPlatform.repositories.UserRepository;
import dev.misfit.StreamingPlatform.services.CommunityService;
import dev.misfit.StreamingPlatform.utils.ChannelType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CommunityServiceImpl implements CommunityService {

    private final CommunityRepository communityRepository;
    private final UserRepository userRepository;
    private final ChannelRepository channelRepository;
    private final ChannelMessageRepository channelMessageRepository;

    public CommunityServiceImpl(CommunityRepository communityRepository, UserRepository userRepository, ChannelRepository channelRepository, ChannelMessageRepository channelMessageRepository) {
        this.communityRepository = communityRepository;
        this.userRepository = userRepository;
        this.channelRepository = channelRepository;
        this.channelMessageRepository = channelMessageRepository;
    }

    @Override
    @Transactional
    public void createCommunity(CreateCommunity community, Long creatorId) {
        User owner = userRepository.findById(creatorId)
                .orElseThrow(() -> new UserNotFoundException("User Not found to create community"));

        if (owner.getOwnedCommunity() != null) {
            throw new CommunityNotFoundException("User can only create one community");
        }

        Channels general = defaultChannel(ChannelType.TEXT, "general");
        Channels lobby = defaultChannel(ChannelType.VIDEO, "lobby");

        Set<User> members = new HashSet<>();
        members.add(owner);

        Community community1 = Community.builder()
                .communityName(community.getCommunityName())
                .icon(null)
                .owner(owner)
                .members(members)
                .build();

        community1.addChannel(general);
        community1.addChannel(lobby);

        owner.setOwnedCommunity(community1);
        owner.getMember().add(community1);

        communityRepository.save(community1);
        userRepository.save(owner);
    }

    @Override
    @Transactional
    public void joinCommunity(Long joinerId, Long communityId) {
        User joiningUser = userRepository.findById(joinerId)
                .orElseThrow(() -> new UserNotFoundException("User Not found to join community"));

        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new CommunityNotFoundException("Community not found"));

        if (community.getMembers().contains(joiningUser)) {
            return;
        }

        community.getMembers().add(joiningUser);
        joiningUser.getMember().add(community);

        userRepository.save(joiningUser);
        communityRepository.save(community);
    }

    @Override
    @Transactional
    public Set<CommunityResponse> communityDetail(Long memberId) {

        User user = userRepository.findById(memberId)
                .orElseThrow(() -> new UserNotFoundException("User Not found in any community"));

        Set<Community> member = user.getMember();
        return member.stream().map((this::getCommunityDetail)).collect(Collectors.toSet());
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ChannelContentResponse> getChannelMessages(
            Long channelId,
            Pageable pageable
    ) {
        Page<ChannelMessage> messagesPage =
                channelMessageRepository.findByChannelIdOrderByTimestampDesc(channelId, pageable);

        List<ChannelContentResponse> content =
                messagesPage.getContent()
                        .stream()
                        .map(this::convertToChannelContentResponse)
                        .toList();

        return PageResponse.<ChannelContentResponse>builder()
                .content(content)
                .totalElements(messagesPage.getTotalElements())
                .totalPage(messagesPage.getTotalPages())
                .last(messagesPage.isLast())
                .size(messagesPage.getSize())
                .number(messagesPage.getNumber())
                .numberOfElements(messagesPage.getNumberOfElements())
                .first(messagesPage.isFirst())
                .empty(messagesPage.isEmpty())
                .build();
    }

    @Override
    public CommunityChannelResponse getChannelDetails(Long channelId) {
        Channels channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new ChannelNotFoundException("No channel found"));
        return convertToCommunityChannelResponse(channel);
    }

    @Override
    public Set<CommunityMemberResponse> getAllMembersOfChannels(Long channelId) {
        Channels channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new ChannelNotFoundException("No channel found"));
        Community community = channel.getCommunity();
        Set<User> members = community.getMembers();
        return members.stream().map(this::convertToCommunityMemberResponse).collect(Collectors.toSet());
    }

    @Override
    @Transactional
    public CreateChannelResponse createChannel(CreateChannelRequest request, Long memberId) {
        User user = userRepository.findById(memberId)
                .orElseThrow(() -> new UserNotFoundException("User Not found"));

        if (user.getOwnedCommunity() == null) {
            throw new UnauthorizedUserException("User not authorized to create channels");
        }

        Community ownedCommunity = user.getOwnedCommunity();

        Channels savedChannel = channelRepository.save(
                Channels.builder()
                        .channelName(request.getChannelName())
                        .community(ownedCommunity)
                        .type(request.getType())
                        .build()
        );

        ownedCommunity.getChannels().add(savedChannel);
        communityRepository.save(ownedCommunity);
        return CreateChannelResponse.builder()
                .channelId(savedChannel.getId())
                .channelName(savedChannel.getChannelName())
                .type(savedChannel.getType())
                .build();
    }

    private Channels defaultChannel(ChannelType type, String channelName) {
        return Channels.builder()
                .channelName(channelName)
                .type(type)
                .build();
    }

    private CommunityResponse getCommunityDetail(Community community) {
        return CommunityResponse.builder()
                .communityId(community.getId())
                .communityName(community.getCommunityName())
                .icon(community.getIcon())
                .owner(convertToCommunityMemberResponse(community.getOwner()))
                .channels(community.getChannels().stream().map(channel -> convertToCommunityChannelResponse(channel)).toList())
//                .members(community.getMembers().stream().map(member -> convertToCommunityMemberResponse(member)).collect(Collectors.toSet()))
                .build();

    }

    private CommunityMemberResponse convertToCommunityMemberResponse(User member) {
        return CommunityMemberResponse.builder()
                .id(member.getUserId())
                .name(member.getName())
                .profilePic(member.getProfilePic())
                .build();
    }

    private CommunityChannelResponse convertToCommunityChannelResponse(Channels channels) {
        return CommunityChannelResponse.builder()
                .channelId(channels.getId())
                .channelName(channels.getChannelName())
                .type(channels.getType())
//                .messages(channels.getMessages().stream().map(message -> convertToChannelContentResponse(message)).toList())
                .build();
    }

    private ChannelContentResponse convertToChannelContentResponse(ChannelMessage message) {
        return ChannelContentResponse.builder()
                .id(message.getId())
                .content(message.getContent())
                .time(message.getTimestamp())
                .userName(message.getSender().getName())
                .userProfile(message.getSender().getProfilePic())
                .build();
    }
}
