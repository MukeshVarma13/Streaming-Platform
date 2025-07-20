package dev.misfit.StreamingPlatform.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

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
    private int followers;
    private List<StreamVideosResponse> streamVideosResponse;
}
