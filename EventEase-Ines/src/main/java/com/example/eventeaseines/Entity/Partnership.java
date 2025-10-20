package com.example.eventeaseines.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

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
    @ElementCollection
    @CollectionTable(name = "partnership_images", joinColumns = @JoinColumn(name = "partnership_id"))
    @Column(name = "image_url")
    private List<String> images = new ArrayList<>();


    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt = new Date();

    @ManyToMany(mappedBy = "partnerships")
    @JsonBackReference
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