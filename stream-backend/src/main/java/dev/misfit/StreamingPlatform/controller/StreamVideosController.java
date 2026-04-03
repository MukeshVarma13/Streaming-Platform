package dev.misfit.StreamingPlatform.controller;


import dev.misfit.StreamingPlatform.DTO.ChatResponse;
import dev.misfit.StreamingPlatform.DTO.StreamerResponse;
import dev.misfit.StreamingPlatform.services.StreamVideosService;
import dev.misfit.StreamingPlatform.utils.JwtUserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/videos")
@CrossOrigin("*")
public class StreamVideosController {

    private final StreamVideosService streamVideosService;

    public StreamVideosController(StreamVideosService streamVideosService) {
        this.streamVideosService = streamVideosService;
    }

    //  To add likes to videos
    @PostMapping("/like/{streamId}")
    public ResponseEntity<Long> addLikes(
            @PathVariable Long streamId,
            @RequestParam(name = "like") boolean like,
            @AuthenticationPrincipal JwtUserPrincipal user
    ) {
        Long userId = user.getClaims().get("userId", Long.class);
        return ResponseEntity.ok(streamVideosService.addLikes(streamId, like, userId));
    }

    //  Follow or Unfollow the streamer
    @PostMapping("/follow/{streamerId}")
    public ResponseEntity<?> follow(
            @PathVariable Long streamerId,
            @RequestParam(name = "follow") boolean follow,
            @AuthenticationPrincipal JwtUserPrincipal user
    ) {
        Long userId = user.getClaims().get("userId", Long.class);
        streamVideosService.follow(streamerId, follow, userId);
        return ResponseEntity.ok("success");
    }

    // To send messages for streams
    @GetMapping("/{streamId}/messages")
    public ResponseEntity<List<ChatResponse>> getChatMessages(@PathVariable Long streamId) throws Exception {
        return ResponseEntity.ok(streamVideosService.getChatMessages(streamId));
    }

    // To get the user details from JWT Token
    @GetMapping("/me")
    public ResponseEntity<StreamerResponse> getProfile(@AuthenticationPrincipal JwtUserPrincipal user) {
        Long userId = user.getClaims().get("userId", Long.class);
        String email = user.getUsername();
        try {
            return ResponseEntity.ok(streamVideosService.getLoggedUser(userId, email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
