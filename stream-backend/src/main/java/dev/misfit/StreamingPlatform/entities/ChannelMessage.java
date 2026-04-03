package dev.misfit.StreamingPlatform.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "channel_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ChannelMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String content;
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference(value = "channel_messages")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "channel_id", nullable = false)
    @JsonBackReference(value = "channel_messages_list")
    @ToString.Exclude
    private Channels channel;

    @PrePersist
    public void prePersist() {
        this.timestamp = LocalDateTime.now();
    }
}
