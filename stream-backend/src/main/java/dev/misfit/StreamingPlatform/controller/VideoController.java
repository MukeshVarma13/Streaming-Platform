package dev.misfit.StreamingPlatform.controller;


import dev.misfit.StreamingPlatform.customExceptions.StreamNotFoundException;
import dev.misfit.StreamingPlatform.customExceptions.StreamStateException;
import dev.misfit.StreamingPlatform.entities.Stream;
import dev.misfit.StreamingPlatform.repositories.StreamRepository;
import dev.misfit.StreamingPlatform.utils.StreamStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/api/videos")
@CrossOrigin("*")
public class VideoController {

    @Value("${videos.path}")
    private String recordedVideoUrl;
    @Value("${live.videos.path}")
    private String liveVideoUrl;

    private final StreamRepository streamRepository;

    public VideoController(StreamRepository streamRepository) {
        this.streamRepository = streamRepository;
    }

    @GetMapping("/{streamerId}/{streamKey}/{filename}")
    public ResponseEntity<Resource> getVideo(@PathVariable String streamerId, @PathVariable String streamKey, @PathVariable String filename) throws IOException {
        Stream stream = streamRepository.findByStreamKey(streamKey)
                .orElseThrow(() -> new StreamNotFoundException("Stream not found for the given stream Key: " + streamKey));
        String contentType = filename.endsWith(".m3u8") ? "application/vnd.apple.mpegurl" : filename.endsWith(".ts") ? "video/MP2T" : "application/octet-stream";
        Path videoPath = Paths.get(recordedVideoUrl, streamerId, streamKey, filename);
//        log.info("Inside ended stream {}", videoPath.toUri());
        if (!Files.exists(videoPath)) return ResponseEntity.notFound().build();
        Resource resource = new UrlResource(videoPath.toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }

    @GetMapping("/folder/{streamerId}")
    public List<String> listVideos(@PathVariable String streamerId) {
        File folder = new File(recordedVideoUrl, streamerId);
        if (!folder.exists() || !folder.isDirectory()) return Collections.emptyList();

        return Arrays.stream(Objects.requireNonNull(folder.listFiles()))
                .filter(f -> f.getName().endsWith(".mp4"))
                .map(File::getName)
                .toList();
    }
}
