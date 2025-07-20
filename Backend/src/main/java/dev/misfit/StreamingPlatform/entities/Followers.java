package dev.misfit.StreamingPlatform.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Followers {
    @Id
    private Long userId;
    private String name;
    private String email;
    private String profile;
//    @ManyToMany
//    private List<User> streamers;
}
