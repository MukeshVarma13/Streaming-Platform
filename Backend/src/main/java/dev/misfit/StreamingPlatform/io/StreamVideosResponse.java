package dev.misfit.StreamingPlatform.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class StreamVideosResponse {
    private Long id;
    private String title;
    private String description;
    private String url;
    private Boolean isLive;
    private Instant startedAt;
    private Instant endedAt;
    private Integer likes;
    private String thumbnail;
    private StreamUserResponse streamUserResponse;
}
