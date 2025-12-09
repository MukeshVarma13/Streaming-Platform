package dev.misfit.StreamingPlatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Set;

@Component
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class StreamerResponse implements Serializable {
    private Long id;
    private String profilePic;
    private String name;
    private String email;
    private Set<Long> followers;
    private Set<Long> following;
    private Set<Long> likedStreams;
    private Page<StreamVideosResponse> streamVideosResponse;
}
