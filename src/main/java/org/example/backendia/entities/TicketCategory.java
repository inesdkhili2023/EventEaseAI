package org.example.backendia.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.backendia.entities.Event;

import java.time.LocalDateTime;

// TicketCategory.java
@Entity
@Table(name = "ticket_categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketCategory{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    private String categoryName; // VIP, Standard, Free
    private Double price;
    private Integer totalQuota;
    private Integer availableQuota;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
