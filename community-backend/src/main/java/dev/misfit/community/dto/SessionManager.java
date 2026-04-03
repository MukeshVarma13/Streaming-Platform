package dev.misfit.community.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionManager {
    private String type;
    private String sender;
    private String roomId;
    private Object data;
}
