package org.example.backendia.DTO;

import lombok.Data;

@Data
public class MatchResultDTO {
    private String driverId;
    private Double score;
    private Double distance;
    private Double travelTime;
    private String vehicleType;
    private Integer capacity;
    private Double rating;
    private Double pricePerKm;
    private String driverName;
    private String phoneNumber;
    private String profilePicture;
    private Integer experienceYears;
    private Integer responseTime;
}
