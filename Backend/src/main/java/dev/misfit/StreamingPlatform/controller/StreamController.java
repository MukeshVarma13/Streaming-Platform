package dev.misfit.StreamingPlatform.controller;


import dev.misfit.StreamingPlatform.DTO.StartStreamRequest;
import dev.misfit.StreamingPlatform.DTO.StartStreamResponse;
import dev.misfit.StreamingPlatform.customExceptions.DuplicateStreamKeyException;
import dev.misfit.StreamingPlatform.customExceptions.InvalidUserException;
import dev.misfit.StreamingPlatform.customExceptions.StreamKeyNotFoundException;
import dev.misfit.StreamingPlatform.customExceptions.StreamProcessingException;
import dev.misfit.StreamingPlatform.services.StreamService;
import dev.misfit.StreamingPlatform.utils.JwtUserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class StreamController {

    private final StreamService service;

    public StreamController(StreamService service) {
        this.service = service;
    }

    //  Generate stream-key to start streaming
    @GetMapping("/stream-key")
    public ResponseEntity<String> generateStreamKey() {
        String key = service.generateStreamKey();
        if (key == null || key.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500
        }
        return ResponseEntity.ok(key);
    }

    //  Get stream details(title, desc, key, etc) and start streaming
    @PostMapping("/stream/start")
    public ResponseEntity<?> startStream(
            @RequestPart("details") StartStreamRequest request,
            @RequestPart("thumbnail") MultipartFile thumbnail,
            @AuthenticationPrincipal JwtUserPrincipal user
    ) throws InvalidUserException, DuplicateStreamKeyException, StreamProcessingException {
        Long userId = user.getClaims().get("userId", Long.class);
        StartStreamResponse response = service.startStream(request, thumbnail, userId);
        return ResponseEntity.ok(response); // 200
    }

    //    Authenticate stream key for NGINX on_publish
    //    on_publish http://localhost:8080/api/auth/publish
    @PostMapping("/auth/publish")
    public ResponseEntity<Void> authenticatePublish(@RequestParam Map<String, String> param) {
        boolean keyPresent = service.authenticatePublish(param);
        if (keyPresent) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(403).build();
    }

    //  Continuously get stream status
    @GetMapping("/stream/status")
    public ResponseEntity<?> streamStatus(@RequestParam Long streamId){
        boolean streamState =  service.streamStatus(streamId);
        return ResponseEntity.ok(streamState);
    }

    //  Will verify before connecting to OBS
    @PostMapping("/stream/setup")
    public ResponseEntity<?> streamPreview(
            @AuthenticationPrincipal JwtUserPrincipal user,
            @RequestParam String streamKey
    ) throws InvalidUserException, StreamKeyNotFoundException, RuntimeException {
        Long userId = user.getClaims().get("userId", Long.class);
        StartStreamResponse response = service.makeStreamLive(streamKey, userId);
        return ResponseEntity.ok(response); // 200 OK
    }

    //    After completing and stopping the stream
    @PostMapping("/stream/complete")
    public ResponseEntity<Void> streamDone(@RequestParam("name") String streamKey) throws StreamProcessingException {
        service.streamDone(streamKey);
        return ResponseEntity.ok().build();
    }
}
