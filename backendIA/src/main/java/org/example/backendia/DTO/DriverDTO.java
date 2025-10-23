package org.example.backendia.DTO;

// DriverDTO.java

import lombok.Data;
import java.util.UUID;

@Data
public class DriverDTO {
    private UUID id;
    private Double latitude;
    private Double longitude;
    private String vehicleType;
    private Integer capacity;
    private Double rating;
    private Double pricePerKm;
    private Integer experienceYears;
    private Integer responseTime;
    private Boolean available;

    // Infos User
    private String nom;
    private String prenom;
    private String numTel;
    private String imageUrl;
}
