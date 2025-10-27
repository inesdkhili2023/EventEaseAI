package org.example.backendia.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "logistics_need")
public class LogisticsNeed {

    public enum NeedType { MATERIAL, CATERING, TRANSPORT, SANITARY }
    public enum NeedStatus { PLANNED, CONFIRMED, ACQUIRED }

    public LogisticsNeed() {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // accepte eventId et event_id depuis le JSON
    @JsonProperty("eventId")
    @Column(name = "event_id", nullable = false)
    private Long eventId;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private NeedType type;

    @Column(name = "item_name", length = 120)
    private String itemName;

    private Integer quantity;

    @Column(length = 20)
    private String unit;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private NeedStatus status;

    @Column(columnDefinition = "text")
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    // ======== GETTERS & SETTERS ========
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }

    public NeedType getType() { return type; }
    public void setType(NeedType type) { this.type = type; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public NeedStatus getStatus() { return status; }
    public void setStatus(NeedStatus status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
