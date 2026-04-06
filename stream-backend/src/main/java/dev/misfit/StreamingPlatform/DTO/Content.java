package dev.misfit.StreamingPlatform.DTO;

import dev.misfit.StreamingPlatform.utils.ContentType;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Content {
    private ContentType type;
    private String content;
}
