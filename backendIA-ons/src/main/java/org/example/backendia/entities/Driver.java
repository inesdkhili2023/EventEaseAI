package org.example.backendia.entities;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "chauffeurs")
@PrimaryKeyJoinColumn(name = "user_id")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Driver extends  User {
    private Double latitude;
    private Double longitude;
    private String vehicleType;
    private Integer capacity;
    private Double rating;
    private Double pricePerKm;
    private Integer experienceYears;
    private Integer responseTime;
    private Boolean available;

}
