package dev.misfit.StreamingPlatform.io;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StreamRequest {
    private String title;
    private String description;
    @NonNull
    private String streamKey;
    @org.springframework.lang.NonNull
    private Long userId;
}
