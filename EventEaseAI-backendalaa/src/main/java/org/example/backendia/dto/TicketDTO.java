package org.example.backendia.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketDTO {
    private Long id;
    private String ticketCode;
    private String categoryName;
    private String buyerEmail;
    private String eventTitle;
    private LocalDateTime purchaseDate;
}