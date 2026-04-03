package dev.misfit.StreamingPlatform.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "community")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(length = 30)
    private String communityName;

    private String icon;

    @OneToOne
    @JoinColumn(name = "owner_id")
    @ToString.Exclude
    @JsonIgnore
    private User owner;

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference(value = "community_channels")
    @ToString.Exclude
    @Builder.Default
    private List<Channels> channels = new ArrayList<>();

    @ManyToMany(mappedBy = "member", fetch = FetchType.LAZY)
    @JsonBackReference(value = "community_members")
    @ToString.Exclude
    @Builder.Default
    private Set<User> members = new HashSet<>();
}
