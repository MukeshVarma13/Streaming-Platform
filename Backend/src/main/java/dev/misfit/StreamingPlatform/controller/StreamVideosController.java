package dev.misfit.StreamingPlatform.controller;


import dev.misfit.StreamingPlatform.DTO.ChatResponse;
import dev.misfit.StreamingPlatform.DTO.StreamVideosResponse;
import dev.misfit.StreamingPlatform.DTO.StreamerResponse;
import dev.misfit.StreamingPlatform.services.StreamVideosService;
import dev.misfit.StreamingPlatform.utils.JwtUserPrincipal;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
    public ResponseEntity<?> getLiveStreams(@PageableDefault(size = 15) Pageable pageable) {
        return ResponseEntity.ok(streamVideosService.getActiveStreams(pageable));
    }

    //  List all the videos that were live-streamed
    @GetMapping
    public ResponseEntity<?> getStreamedVideos(@PageableDefault(size = 15) Pageable pageable) {
        return ResponseEntity.ok(streamVideosService.getStreamedVideos(pageable));
    }

    //  To add likes to videos
    @PostMapping("/like/{streamId}")
    public ResponseEntity<Integer> addLikes(
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

    //  Top streamers based on Followers
    @GetMapping("/top-streamers")
    public ResponseEntity<?> topFollowedStreamers(@PageableDefault(size = 15) Pageable pageable) {
        return ResponseEntity.ok(streamVideosService.topFollowedStreamers(pageable));
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
    public ResponseEntity<StreamerResponse> getProfile(@AuthenticationPrincipal JwtUserPrincipal user) {
        Long userId = user.getClaims().get("userId", Long.class);
        String email = user.getUsername();
        try {
            return ResponseEntity.ok(streamVideosService.getLoggedUser(userId, email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Search stream based on description
    @GetMapping("/search-in-desc")
    public ResponseEntity<?> searchInDesc(
            @RequestParam(name = "term", required = true) String term,
            @PageableDefault(size = 15) Pageable pageable
    ) {
        return ResponseEntity.ok(streamVideosService.searchInDescription(term, pageable));
    }

    // Search stream based on title
    @GetMapping("/search-in-title")
    public ResponseEntity<?> searchInTitle(
            @RequestParam(name = "term", required = true) String term,
            @PageableDefault(size = 15) Pageable pageable
    ) {
        return ResponseEntity.ok(streamVideosService.searchInTitle(term, pageable));
    }

    @GetMapping("/search-by-user")
    public ResponseEntity<?> searchByUserName(
            @RequestParam(name = "term", required = true) String term,
            @PageableDefault(size = 15) Pageable pageable
    ) {
        return ResponseEntity.ok(streamVideosService.getStreamByUserName(term, pageable));
    }

    @GetMapping("/tag")
    public ResponseEntity<?> findByTags(
            @RequestParam(name = "term", required = true) String term,
            @PageableDefault(size = 15) Pageable pageable
    ) {
        return ResponseEntity.ok(streamVideosService.findByTags(term, pageable));
    }

    @GetMapping("/category")
    public ResponseEntity<?> findByCategories(
            @RequestParam(name = "term", required = true) String term,
            @PageableDefault(size = 15) Pageable pageable
    ) {
        return ResponseEntity.ok(streamVideosService.findByCategories(term, pageable));
    }
}
