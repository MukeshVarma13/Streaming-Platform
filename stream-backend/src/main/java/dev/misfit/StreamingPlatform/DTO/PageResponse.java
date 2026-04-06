package dev.misfit.StreamingPlatform.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageResponse<T> {
    private List<T> content;
    private long totalElements;
    private int totalPage;
    private boolean last;
    private int size;
    private int number;
//    "sort": {
//        "empty": true,
//        "sorted": false,
//        "unsorted": true
//    },
    private int numberOfElements;
    private boolean first;
    private boolean empty;

    public PageResponse(Page<T> page) {
        this.content = page.getContent();
        this.totalElements = page.getTotalElements();
        this.totalPage = page.getTotalPages();
        this.last = page.isLast();
        this.size = page.getSize();
        this.number = page.getNumber();
        this.numberOfElements = page.getNumberOfElements();
        this.first = page.isFirst();
        this.empty = page.isEmpty();
    }

//    public PageResponse(List<T> content, int pageNumber, int pageSize, long totalElements){
//        this.content = content;
//        this.number = pageNumber;
//        this.size = pageSize;
//        this.totalElements = totalElements;
//    }
}
