package dev.misfit.StreamingPlatform.controller;

import dev.misfit.StreamingPlatform.io.StreamUserResponse;
import dev.misfit.StreamingPlatform.services.WatchStreamVideosService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/videos")
@CrossOrigin
public class WatchStreamVideosController {

    private final WatchStreamVideosService watchStreamVideos;

    public WatchStreamVideosController(WatchStreamVideosService watchStreamVideos) {
        this.watchStreamVideos = watchStreamVideos;
    }

    //   To watch the stream video
    @GetMapping("/streamer-detail/{streamerId}")
    public ResponseEntity<StreamUserResponse> watchStream(@PathVariable Long streamerId) throws Exception {
        return ResponseEntity.ok(watchStreamVideos.getStreamerDetails(streamerId));
    }
}
