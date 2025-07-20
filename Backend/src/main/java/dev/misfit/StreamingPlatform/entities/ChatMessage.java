package dev.misfit.StreamingPlatform.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private LocalDateTime timestamp;
    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "stream_id", nullable = false)
    private Stream stream;
}
