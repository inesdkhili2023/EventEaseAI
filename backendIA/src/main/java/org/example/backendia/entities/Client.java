package org.example.backendia.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "clients")
@PrimaryKeyJoinColumn(name = "user_id")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Client extends User{
    private Double latitude;
    private Double longitude;
    private Integer passengerCount;
    private String specialNeeds;
    private String urgencyLevel;
    private Integer maxWaitTime;
}
