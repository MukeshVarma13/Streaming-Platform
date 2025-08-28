package dev.misfit.StreamingPlatform.controller;


import dev.misfit.StreamingPlatform.DTO.StreamRequest;
import dev.misfit.StreamingPlatform.DTO.StreamResponse;
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

    //    After completing and stopping the stream
    //    Will be handled by OBS Studio
    @PostMapping("/stream/complete")
    public ResponseEntity<Void> streamDone(@RequestParam("name") String streamKey) throws Exception {
        service.streamDone(streamKey);
        return ResponseEntity.ok().build();
    }

    //  Generate stream-key to start streaming
    @GetMapping("/stream-key")
    public ResponseEntity<String> generateStreamKey() {
        String key = service.generateStreamKey();
        if (key.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(key);
    }

    //  Get stream details(title, desc, key, etc) and start streaming
    @PostMapping("/stream/start")
    public ResponseEntity<StreamResponse> startStream(
            @RequestPart("details") StreamRequest request,
            @RequestPart("thumbnail") MultipartFile thumbnail,
            @AuthenticationPrincipal JwtUserPrincipal user
    ) throws Exception {
        Long userId = user.getClaims().get("userId", Long.class);
        StreamResponse response = service.startStream(request, thumbnail, userId);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(response);
    }
}
