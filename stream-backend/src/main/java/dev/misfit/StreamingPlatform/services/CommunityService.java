package dev.misfit.StreamingPlatform.services;

import dev.misfit.StreamingPlatform.DTO.*;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.util.Set;

@Service
public interface CommunityService {
    void createCommunity(CreateCommunity community, Long creatorId);

    void joinCommunity(Long joinerId, Long communityId);

    Set<CommunityResponse> communityDetail(Long memberId);

    PageResponse<ChannelContentResponse> getChannelMessages(Long channelId, Pageable pageable );

    CommunityChannelResponse getChannelDetails(Long channelId);

    Set<CommunityMemberResponse> getAllMembersOfChannels(Long channelId);

    CreateChannelResponse createChannel(CreateChannelRequest request, Long memberId);
}
