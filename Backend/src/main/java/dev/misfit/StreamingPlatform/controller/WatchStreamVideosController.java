package dev.misfit.StreamingPlatform.controller;

import dev.misfit.StreamingPlatform.DTO.StreamUserResponse;
import dev.misfit.StreamingPlatform.services.WatchStreamVideosService;
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
    public ResponseEntity<StreamUserResponse> watchStream(@PathVariable Long streamerId) throws Exception {
        return ResponseEntity.ok(watchStreamVideos.getStreamerDetails(streamerId));
    }
}
