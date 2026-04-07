package dev.misfit.StreamingPlatform.DTO;

import dev.misfit.StreamingPlatform.utils.ChannelType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateChannelResponse {
    private Long channelId;
    private String channelName;
    private ChannelType type;
}
