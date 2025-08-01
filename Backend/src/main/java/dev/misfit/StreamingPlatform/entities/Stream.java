package dev.misfit.StreamingPlatform.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "streams")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    private int likes;
    private String thumbnail;
    @ManyToOne
    @JoinColumn(name = "streamer_id", nullable = false)
    private User streamer;
    @OneToMany(mappedBy = "stream", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatMessage> messages;
}
