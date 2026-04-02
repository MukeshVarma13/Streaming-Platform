package dev.misfit.StreamingPlatform.entities;

import dev.misfit.StreamingPlatform.utils.StreamStatus;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(indexName = "streams")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StreamSearch {
    @Id
    private Long id;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Text)
    private String description;

    @Field(type = FieldType.Keyword)
    private String url;

    @Field(type = FieldType.Keyword)
    private StreamStatus status;

    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Instant startedAt;

    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Instant endedAt;

    @Field(type = FieldType.Keyword)
    private String thumbnail;

    @Field(type = FieldType.Long)
    private Long streamerId;

    @Field(type = FieldType.Keyword)
    private String streamerProfilePic;

    @Field(type = FieldType.Text)
    private String streamerName;

    @Field(type = FieldType.Keyword)
    private List<String> tags = new ArrayList<>();

    @Field(type = FieldType.Keyword)
    private String categories;

    @Field(type = FieldType.Integer)
    private int likesCount;

    @Field(type = FieldType.Integer)
    private int watchersCount;

    @Field(type = FieldType.Integer)
    private int popularityScore;

    @Field(type = FieldType.Search_As_You_Type)
    private String titleSuggest;
}
