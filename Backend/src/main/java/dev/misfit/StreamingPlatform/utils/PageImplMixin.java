package dev.misfit.StreamingPlatform.utils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.domain.Pageable;

import java.util.List;

public abstract class PageImplMixin {

    @JsonCreator
    public PageImplMixin(
            @JsonProperty("content") List content,
            @JsonProperty("pageable") Pageable pageable,
            @JsonProperty("totalElements") long totalElements
    ) {
    }
}
