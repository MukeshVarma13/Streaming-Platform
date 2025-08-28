package dev.misfit.StreamingPlatform.DTO;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StreamRequest {
    private String title;
    private String description;
    @NonNull
    private String streamKey;
//    @org.springframework.lang.NonNull
//    private Long userId;
    private List<String> tags;
    private List<String> categories;
}
