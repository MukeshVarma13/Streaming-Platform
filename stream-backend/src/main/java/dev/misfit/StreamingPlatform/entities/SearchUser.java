package dev.misfit.StreamingPlatform.entities;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Set;

@Document(indexName = "streamer")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchUser {

    @Id
    private Long id;

    @Field(type = FieldType.Keyword)
    private String profilePic;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Keyword, index = false)
    private Set<Long> followers;

    @Field(type = FieldType.Integer)
    private int followersCount;
}
