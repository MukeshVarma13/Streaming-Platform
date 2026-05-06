package dev.misfit.StreamingPlatform.controller;

import dev.misfit.StreamingPlatform.services.StreamSearchService;
import dev.misfit.StreamingPlatform.utils.JwtUserPrincipal;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/search")
public class StreamSearchController {
    private final StreamSearchService service;

    public StreamSearchController(StreamSearchService service) {
        this.service = service;
    }

    @GetMapping("/streams")
    public ResponseEntity<?> getAllStreams(@PageableDefault(size = 15) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.getAllStreams(pageable));
    }

    //  List all live-streaming videos
    @GetMapping("/live")
    public ResponseEntity<?> getLiveStreams(@PageableDefault(size = 15) Pageable pageable) {
        return ResponseEntity.ok(service.getLiveStreams(pageable));
    }

    //  Top streamers based on Followers
    @GetMapping("/top-streamers")
    public ResponseEntity<?> topFollowedStreamers(@PageableDefault(size = 15,
            sort = {"followersCount"},
            direction = Sort.Direction.ASC
    ) Pageable pageable) {
        return ResponseEntity.ok(service.topFollowedStreamers(pageable));
    }

    // To watch the stream video
    @GetMapping("/{streamId}")
    public ResponseEntity<?> watchStream(@PathVariable Long streamId, @AuthenticationPrincipal JwtUserPrincipal user) throws Exception {
        Long userId = user.getClaims().get("userId", Long.class);
        return ResponseEntity.ok(service.watchStream(streamId, userId));
    }

    // Search streams in title
    @GetMapping("/title")
    public ResponseEntity<?> searchInTitle(
            @RequestParam(name = "term", required = true) String term,
            @PageableDefault(size = 15) Pageable pageable
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.searchInTitle(term, pageable));
    }

    // Search streams based on tag
    @GetMapping("/tag")
    public ResponseEntity<?> searchByTag(
            @RequestParam(name = "term", required = true) String term,
            @RequestParam(name = "status", required = true) String status,
            @PageableDefault(size = 15) Pageable pageable
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.searchByTag(term, status, pageable));
    }

    // Search streams based on category
    @GetMapping("/category")
    public ResponseEntity<?> searchByCategory(
            @RequestParam(name = "term", required = true) String term,
            @PageableDefault(size = 15) Pageable pageable
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.searchByCategory(term, pageable));
    }

    // Search stream in description
    @GetMapping("/description")
    public ResponseEntity<?> searchInDescription(
            @RequestParam(name = "term", required = true) String term,
            @PageableDefault(size = 15) Pageable pageable
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.searchInDescription(term, pageable));
    }

    // Search streamer by name
    @GetMapping("/streamer")
    public ResponseEntity<?> searchStreamerByName(
            @RequestParam(name = "term", required = true) String term,
            @PageableDefault(size = 15) Pageable pageable
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.searchStreamerByName(term, pageable));
    }

    // used for suggestion while typing
    @GetMapping("/autocomplete")
    public ResponseEntity<?> autoCompleteTitle(@RequestParam(name = "q", required = true) String q) {
        return ResponseEntity.status(200)
                .body(service.autoCompleteTitle(q));
    }
}
