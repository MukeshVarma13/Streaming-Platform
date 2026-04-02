package dev.misfit.StreamingPlatform.DTO;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StartStreamRequest {
    private String title;
    private String description;
    @NonNull
    private String streamKey;
    private List<String> tags;
    private String categories;
}
