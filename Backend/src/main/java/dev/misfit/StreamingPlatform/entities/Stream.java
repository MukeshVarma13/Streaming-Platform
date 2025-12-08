package dev.misfit.StreamingPlatform.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import dev.misfit.StreamingPlatform.utils.StreamStatus;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
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
public class Stream implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String title;

    @Column(length = 500)
    private String description;

    @Column(unique = true, nullable = false)
    private String streamKey;

    private String url;

    @Enumerated(EnumType.STRING)
    private StreamStatus status;

    private Instant startedAt;
    private Instant endedAt;

    @ManyToMany(mappedBy = "likedStreams", fetch = FetchType.LAZY)
    @JsonBackReference(value = "stream_likes")
    @ToString.Exclude
    @Builder.Default
    private Set<User> likes = new HashSet<>();

    private String thumbnail;

    @ManyToMany(mappedBy = "watchedStreams", fetch = FetchType.LAZY)
    @JsonBackReference(value = "stream_watchers")
    @ToString.Exclude
    @Builder.Default
    private Set<User> watchers = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "streamer_id", nullable = false)
    @JsonBackReference(value = "streamer_streams")
    @ToString.Exclude
    private User streamer;

    @OneToMany(mappedBy = "stream", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @ToString.Exclude
    @Builder.Default
    private List<ChatMessage> messages = new ArrayList<>();

    @ElementCollection
    @ToString.Exclude
    @Builder.Default
    private List<String> tags = new ArrayList<>();

    private String categories;

    @Version
    private Long version;
}
