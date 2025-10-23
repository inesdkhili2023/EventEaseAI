package org.example.backendia.DTO;

// RiderRequestDTO.java

import lombok.Data;
import java.util.UUID;

@Data
public class RiderRequestDTO {
    private UUID id;
    private Double latitude;
    private Double longitude;
    private Integer passengerCount;
    private String specialNeeds;
    private String urgencyLevel;
    private Integer maxWaitTime;

    // Infos supplémentaires pour l'affichage
    private String nom;
    private String prenom;
    private String numTel;
}
