package org.example.backendia.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketCategoryDTO {
    private Long id;
    private String categoryName;
    private Double price;
    private Integer totalQuota;
    private Integer availableQuota;
    private Boolean active;
}