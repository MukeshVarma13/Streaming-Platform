package dev.misfit.StreamingPlatform.controller;


import dev.misfit.StreamingPlatform.DTO.ChatResponse;
import dev.misfit.StreamingPlatform.DTO.StreamUserResponse;
import dev.misfit.StreamingPlatform.DTO.StreamVideosResponse;
import dev.misfit.StreamingPlatform.services.StreamVideosService;
import dev.misfit.StreamingPlatform.utils.JwtUserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/videos")
@CrossOrigin(origins = "http://localhost:5173")
public class StreamVideosController {

    private final StreamVideosService streamVideosService;

    public StreamVideosController(StreamVideosService streamVideosService) {
        this.streamVideosService = streamVideosService;
    }

    //  List all live-streaming videos
    @GetMapping("/live")
    public ResponseEntity<List<StreamVideosResponse>> getLiveStreams() {
        return ResponseEntity.ok(streamVideosService.getActiveStreams());
    }

    //  List all the videos that were live-streamed
    @GetMapping
    public ResponseEntity<List<StreamVideosResponse>> getStreamedVideos() {
        return ResponseEntity.ok(streamVideosService.getStreamedVideos());
    }

    //  To add likes to videos
    @PostMapping("/like/{streamId}")
    public ResponseEntity<Integer> addLikes(
            @PathVariable Long streamId,
            @RequestParam(name = "like") boolean like,
            @AuthenticationPrincipal JwtUserPrincipal user
    ) {
        Long userId = user.getClaims().get("userId", Long.class);
        try {
            return ResponseEntity.ok(streamVideosService.addLikes(streamId, like, userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    //  Follow or Unfollow the streamer
    @PostMapping("/follow/{streamerId}")
    public ResponseEntity<?> follow(
            @PathVariable Long streamerId,
            @RequestParam(name = "follow") boolean follow,
            @AuthenticationPrincipal JwtUserPrincipal user
    ) {
        Long userId = user.getClaims().get("userId", Long.class);
        try {
            streamVideosService.follow(streamerId, follow, userId);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Streamer not found");
        }
    }

    //  Top streamers based on Followers
    @GetMapping("/top-streamers")
    public ResponseEntity<List<StreamUserResponse>> topFollowedStreamers() {
        return ResponseEntity.ok(streamVideosService.topFollowedStreamers());
    }

    //   To watch the stream video
    @GetMapping("/{streamId}")
    public ResponseEntity<StreamVideosResponse> watchStream(@PathVariable Long streamId) throws Exception {
        return ResponseEntity.ok(streamVideosService.watchStream(streamId));
    }

    // To send messages for streams
    @GetMapping("/{streamId}/messages")
    public ResponseEntity<List<ChatResponse>> getChatMessages(@PathVariable Long streamId) throws Exception {
        return ResponseEntity.ok(streamVideosService.getChatMessages(streamId));
    }

    // To get the user details from JWT Token
    @GetMapping("/me")
    public ResponseEntity<StreamUserResponse> getProfile(@AuthenticationPrincipal JwtUserPrincipal user) {
        Long userId = user.getClaims().get("userId", Long.class);
        String email = user.getUsername();
        try {
            return ResponseEntity.ok(streamVideosService.getLoggedUser(userId, email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/search-in-desc")
    public ResponseEntity<List<StreamVideosResponse>> searchInDesc(@RequestParam(name = "find") String find) {
        return ResponseEntity.ok(streamVideosService.searchInDescription(find));
    }

    @GetMapping("/search-in-title")
    public ResponseEntity<List<StreamVideosResponse>> searchInTitle(@RequestParam(name = "find") String find) {
        return ResponseEntity.ok(streamVideosService.searchInTitle(find));
    }
}
