package dev.misfit.StreamingPlatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FFMpegResponse {
    private String outputPath;
    private String status;
    private String streamKey;
    private String userId;
}
