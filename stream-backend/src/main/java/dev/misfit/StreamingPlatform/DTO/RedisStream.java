package dev.misfit.StreamingPlatform.DTO;

import dev.misfit.StreamingPlatform.utils.StreamStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RedisStream {
    private String title;
    private Long streamerId;
    private String description;
    private String streamKey;
    private StreamStatus status;
    private String url;
    private String thumbnail;
    private String categories;
    private List<String> tags;
}
