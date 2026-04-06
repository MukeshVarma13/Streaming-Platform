package dev.misfit.StreamingPlatform.DTO;

import dev.misfit.StreamingPlatform.utils.ChannelType;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommunityChannelResponse {
    private Long channelId;
    private String channelName;
    private ChannelType type;
    private List<ChannelContentResponse> messages;
}
