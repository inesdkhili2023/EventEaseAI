package org.example.backendia.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.example.backendia.entities.Event;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "partnerships")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Partnership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type; // ou utiliser enum PartnershipType
    private String description;
    private Double contractValue;
    private Date startDate;
    private Date endDate;
    private Boolean active;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt = new Date();

    @ManyToMany(mappedBy = "partnerships")
    @JsonIgnoreProperties("partnerships") // 👈 Empêche la boucle
    private Set<Event> events = new HashSet<>();

    @PrePersist
    public void onCreate() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = new Date();
    }
}
