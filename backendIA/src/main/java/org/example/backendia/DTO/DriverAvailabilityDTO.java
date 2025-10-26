package org.example.backendia.DTO;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
public class DriverAvailabilityDTO {
    private UUID id;
    private UUID driverId;
    private String driverName;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private Boolean available;
}