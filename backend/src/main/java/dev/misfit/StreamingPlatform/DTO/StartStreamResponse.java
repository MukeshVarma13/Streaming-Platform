package dev.misfit.StreamingPlatform.DTO;

import dev.misfit.StreamingPlatform.utils.StreamStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StartStreamResponse {
    private Long streamId;
    private String title;
    private String streamKey;
    private String description;
    private String url;
    private StreamStatus status;
    private Instant startedAt;
    private String thumbnail;
}
