package dev.misfit.StreamingPlatform.controller;

import dev.misfit.StreamingPlatform.DTO.StartStreamRequest;
import dev.misfit.StreamingPlatform.DTO.StartStreamResponse;
import dev.misfit.StreamingPlatform.services.StreamerService;
import dev.misfit.StreamingPlatform.utils.JwtUserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/streamer")
public class StreamerController {

    private final StreamerService streamerService;

    public StreamerController(StreamerService streamerService) {
        this.streamerService = streamerService;
    }

    @PutMapping("/update-stream/{streamId}")
    public ResponseEntity<StartStreamResponse> updateStreamMetaData(
            @PathVariable Long streamId,
            @RequestParam("details") StartStreamRequest request,
            @RequestParam("thumbnail") MultipartFile thumbnail,
            @AuthenticationPrincipal JwtUserPrincipal user
    ) {
        Long userId = user.getClaims().get("userId", Long.class);
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(streamerService.updateStreamMetaData(streamId, request, thumbnail, userId));
    }


    @GetMapping("/followers-list")
    public ResponseEntity<?> followersList(@AuthenticationPrincipal JwtUserPrincipal user) {
        Long streamerId = user.getClaims().get("userId", Long.class);
        return ResponseEntity.ok(streamerService.followersList(streamerId));
    }

    @GetMapping("/watched-history")
    public ResponseEntity<?> watchedStreamList(@AuthenticationPrincipal JwtUserPrincipal user) {
        Long streamerId = user.getClaims().get("userId", Long.class);
        return ResponseEntity.ok(streamerService.watchedStreamList(streamerId));
    }

    @GetMapping("/following-list")
    public ResponseEntity<?> followingList(@AuthenticationPrincipal JwtUserPrincipal user) {
        Long streamerId = user.getClaims().get("userId", Long.class);
        return ResponseEntity.ok(streamerService.followingList(streamerId));
    }

    @GetMapping("/liked-streams")
    public ResponseEntity<?> likedStreams(@AuthenticationPrincipal JwtUserPrincipal user) {
        Long streamerId = user.getClaims().get("userId", Long.class);
        return ResponseEntity.ok(streamerService.likedStreams(streamerId));
    }
}
