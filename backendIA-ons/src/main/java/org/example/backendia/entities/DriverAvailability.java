package org.example.backendia.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "driver_availability")
public class DriverAvailability {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private Driver driver;

    private LocalDate date;         // ex: 2025-10-26
    private LocalTime startTime;    // ex: 09:00
    private LocalTime endTime;      // ex: 14:00

    private Boolean available = true;
}
