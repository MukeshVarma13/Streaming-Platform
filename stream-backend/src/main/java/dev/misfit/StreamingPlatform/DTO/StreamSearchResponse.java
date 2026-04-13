package dev.misfit.StreamingPlatform.DTO;

import dev.misfit.StreamingPlatform.entities.SearchUser;
import dev.misfit.StreamingPlatform.entities.StreamSearch;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StreamSearchResponse {
    private StreamSearch streamSearch;
    private SearchUser searchUser;
    private boolean isFollowing;
    private boolean liked;
}