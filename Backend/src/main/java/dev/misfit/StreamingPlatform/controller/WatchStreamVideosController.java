package dev.misfit.StreamingPlatform.controller;

import dev.misfit.StreamingPlatform.DTO.StreamerResponse;
import dev.misfit.StreamingPlatform.services.WatchStreamVideosService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/v1/videos")
@CrossOrigin("*")
public class WatchStreamVideosController {

    private final WatchStreamVideosService watchStreamVideos;

    public WatchStreamVideosController(WatchStreamVideosService watchStreamVideos) {
        this.watchStreamVideos = watchStreamVideos;
    }

    //   To watch the stream video of that streamer just like channel view
    @GetMapping("/streamer-detail/{streamerId}")
    public ResponseEntity<StreamerResponse> watchStream(
            @PathVariable Long streamerId,
            @PageableDefault(size = 10, sort = "startedAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return ResponseEntity.ok(watchStreamVideos.getStreamerDetails(streamerId, pageable));
    }
}
