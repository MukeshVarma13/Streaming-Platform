package dev.misfit.StreamingPlatform.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.misfit.StreamingPlatform.utils.StreamStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import java.util.Set;

@Component
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class StreamVideosResponse implements Serializable {
    private Long id;
    private String title;
    private String description;
    private String url;
    private StreamStatus status;
    private Instant startedAt;
    private Instant endedAt;
    private Set<Long> likes;
    private String thumbnail;
    private Set<Long> watchers;
    private List<String> tags;
    private String categories;
    private StreamerResponse streamUserResponse;
}
