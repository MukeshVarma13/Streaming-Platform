package dev.misfit.StreamingPlatform.controller;


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

@RestController
@RequestMapping("/api/videos")
@CrossOrigin("*")
public class VideoController {

    @Value("${videos.path}")
    private String videoUrl;

    @GetMapping("/{streamerId}/{streamKey}/{filename}")
    public ResponseEntity<Resource> getVideo(@PathVariable String streamerId, @PathVariable String streamKey, @PathVariable String filename) throws IOException {
        Path videoPath = Paths.get(videoUrl, streamerId, streamKey, filename);
        if (!Files.exists(videoPath)) return ResponseEntity.notFound().build();

        Resource resource = new UrlResource(videoPath.toUri());
        String contentType = filename.endsWith(".m3u8") ? "application/vnd.apple.mpegurl" : filename.endsWith(".ts") ? "video/MP2T" : "application/octet-stream";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }

    @GetMapping("/folder/{streamerId}")
    public List<String> listVideos(@PathVariable String streamerId) throws IOException {
        File folder = new File(videoUrl, streamerId);
        if (!folder.exists() || !folder.isDirectory()) return Collections.emptyList();

        return Arrays.stream(Objects.requireNonNull(folder.listFiles()))
                .filter(f -> f.getName().endsWith(".mp4"))
                .map(File::getName)
                .toList();
    }
}
