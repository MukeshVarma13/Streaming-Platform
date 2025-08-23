package dev.misfit.StreamingPlatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class StreamUserResponse {
    private Long id;
    private String profilePic;
    private String name;
    private String email;
    private List<Long> followers;
    private List<Long> following;
    private List<Long> likedStreams;
    private List<StreamVideosResponse> streamVideosResponse;
}
