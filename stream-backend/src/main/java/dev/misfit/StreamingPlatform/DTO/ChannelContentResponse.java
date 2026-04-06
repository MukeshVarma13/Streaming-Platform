package dev.misfit.StreamingPlatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChannelContentResponse {
    private Long id;
    private Content content;
    private LocalDateTime time;
    private String userName;
    private String userProfile;
}
