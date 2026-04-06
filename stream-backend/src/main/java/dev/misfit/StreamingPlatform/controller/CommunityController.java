package dev.misfit.StreamingPlatform.controller;

import dev.misfit.StreamingPlatform.DTO.ChannelContentResponse;
import dev.misfit.StreamingPlatform.DTO.CreateCommunity;
import dev.misfit.StreamingPlatform.DTO.PageResponse;
import dev.misfit.StreamingPlatform.services.CommunityService;
import dev.misfit.StreamingPlatform.utils.JwtUserPrincipal;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/community")
public class CommunityController {

    private final CommunityService communityService;

    public CommunityController(CommunityService communityService) {
        this.communityService = communityService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCommunity(
            @RequestBody CreateCommunity community,
            @AuthenticationPrincipal JwtUserPrincipal user
    ) {
        Long userId = user.getClaims().get("userId", Long.class);
        communityService.createCommunity(community, userId);
        return ResponseEntity.status(200).build();
    }

    @PostMapping("/join/{communityId}")
    public ResponseEntity<?> joinCommunity(
            @PathVariable Long communityId,
            @AuthenticationPrincipal JwtUserPrincipal user
    ) {
        Long joinerId = user.getClaims().get("userId", Long.class);
        communityService.joinCommunity(joinerId, communityId);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/details")
    public ResponseEntity<?> communityDetails(
            @AuthenticationPrincipal JwtUserPrincipal user
    ) {
        Long memberId = user.getClaims().get("userId", Long.class);
        return ResponseEntity.status(200).body(communityService.communityDetail(memberId));
    }

    @GetMapping("/{channelId}/messages")
    public PageResponse<ChannelContentResponse> getMessages(
            @PathVariable Long channelId,
            @PageableDefault(size = 30) Pageable pageable
    ) {
        return communityService.getChannelMessages(channelId, pageable);
    }

    @GetMapping("/channel/{channelId}")
    public ResponseEntity<?> getChannelDetails(@PathVariable Long channelId) {
        return ResponseEntity.ok(communityService.getChannelDetails(channelId));
    }
}
