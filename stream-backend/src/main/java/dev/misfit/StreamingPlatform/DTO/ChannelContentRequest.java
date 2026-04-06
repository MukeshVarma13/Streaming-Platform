package dev.misfit.StreamingPlatform.DTO;

import dev.misfit.StreamingPlatform.utils.ContentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChannelContentRequest {
    private Long userId;
    private ContentType contentType;
    private String content;
}
