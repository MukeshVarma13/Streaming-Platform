package dev.misfit.StreamingPlatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;
import java.util.Set;

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
    private List<Long> likes;
    private String thumbnail;
    private Long views;
    private StreamUserResponse streamUserResponse;
}
