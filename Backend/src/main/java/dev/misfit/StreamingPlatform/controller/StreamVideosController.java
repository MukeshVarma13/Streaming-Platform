package dev.misfit.StreamingPlatform.controller;


import dev.misfit.StreamingPlatform.entities.ChatMessage;
import dev.misfit.StreamingPlatform.io.ChatResponse;
import dev.misfit.StreamingPlatform.io.StreamUserResponse;
import dev.misfit.StreamingPlatform.io.StreamVideosResponse;
import dev.misfit.StreamingPlatform.services.StreamVideosService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
@CrossOrigin("*")
public class StreamVideosController {

    private final StreamVideosService streamVideosService;

    public StreamVideosController(StreamVideosService streamVideosService) {
        this.streamVideosService = streamVideosService;
    }

    //  List all live-streaming videos
    @GetMapping("/live")
    public ResponseEntity<List<StreamVideosResponse>> getLiveStreams(){
       return ResponseEntity.ok(streamVideosService.getActiveStreams());
    }

    //  List all the videos that were live-streamed
    @GetMapping
    public ResponseEntity<List<StreamVideosResponse>> getStreamedVideos(){
        return ResponseEntity.ok(streamVideosService.getStreamedVideos());
    }

    //  To add likes to videos
    @PostMapping("/{streamId}")
    public ResponseEntity<Integer> addLikes(@PathVariable Long streamId, @RequestParam(name = "like") boolean like) throws Exception {
        return ResponseEntity.ok(streamVideosService.addLikes(streamId, like));
    }


    //  Follow or Unfollow the streamer
    @PostMapping("/follow/{streamerId}")
    public ResponseEntity<?> follow(@PathVariable Long streamerId, @RequestParam(name = "follow") boolean follow) throws Exception {
        streamVideosService.follow(streamerId, follow);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //  Top streamers based on Followers
    @GetMapping("/top-streamers")
    public ResponseEntity<List<StreamUserResponse>> topFollowedStreamers(){
        return ResponseEntity.ok(streamVideosService.topFollowedStreamers());
    }

    //   To watch the stream video
    @GetMapping("/{streamId}")
    public ResponseEntity<StreamVideosResponse> watchStream(@PathVariable Long streamId) throws Exception {
        return ResponseEntity.ok(streamVideosService.watchStream(streamId));
    }

    @GetMapping("/{streamId}/messages")
    public ResponseEntity<List<ChatResponse>> getChatMessages(@PathVariable Long streamId) throws Exception {
        return ResponseEntity.ok(streamVideosService.getChatMessages(streamId));
    }
}
