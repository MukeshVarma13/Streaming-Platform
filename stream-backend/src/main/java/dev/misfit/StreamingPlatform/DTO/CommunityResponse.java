package dev.misfit.StreamingPlatform.DTO;

import lombok.*;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommunityResponse {
    private Long communityId;
    private String communityName;
    private String icon;
    private CommunityMemberResponse owner;
    private List<CommunityChannelResponse> channels;
    private Set<CommunityMemberResponse> members;
}
