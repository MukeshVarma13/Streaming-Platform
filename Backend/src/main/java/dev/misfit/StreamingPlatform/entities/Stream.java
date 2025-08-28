package dev.misfit.StreamingPlatform.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "streams")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Stream {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    @NonNull
    @Column(unique = true, nullable = false)
    private String streamKey;
    private String url;
    private Boolean isLive;
    private Instant startedAt;
    private Instant endedAt;
    @ManyToMany(mappedBy = "likedStream")
    @JsonBackReference
    private List<User> likedByUser = new ArrayList<>();
    private String thumbnail;
//    @Column(nullable = false)
    private Long views = 0L;
    @ManyToOne
    @JoinColumn(name = "streamer_id", nullable = false)
    private User streamer;
    @OneToMany(mappedBy = "stream", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatMessage> messages;
    @ElementCollection
    private List<String> tags;
    @ElementCollection
    private Set<String> categories;
    @Version
    private Long version;
}
