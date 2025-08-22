package dev.misfit.StreamingPlatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StreamResponse {
    private Long streamId;
    private String title;
    private String url;
    private Boolean isLive;
    private Instant startedAt;
    private String thumbnail;
    private Long views;
}
