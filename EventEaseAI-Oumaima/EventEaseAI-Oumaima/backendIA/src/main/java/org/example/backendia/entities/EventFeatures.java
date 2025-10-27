package org.example.backendia.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.Instant;

@Entity
@Table(name = "event_features")
public class EventFeatures {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="event_id", nullable=false)
    private Long eventId;

    @Column(name="total_duration", nullable=false)
    private Integer totalDuration;

    @Column(name="traffic_level", nullable=false)
    private Double trafficLevel;

    @Column(name="crowd_density", nullable=false)
    private Double crowdDensity;

    @Column(name="satisfaction_score", nullable=false)
    private Integer satisfactionScore;

    @Column(nullable=false)
    private Integer age;

    @Column(name="budget_category", nullable=false)
    private Double budgetCategory;

    @Column(nullable=false)
    private String weather;

    @Column(name="optimal_route_preference", nullable=false, columnDefinition = "text")
    private String optimalRoutePreference;

    @Column(nullable=false)
    private String gender;

    @Column(nullable=false)
    private String nationality;

    @Column(name="travel_companions", nullable=false)
    private String travelCompanions;

    @Column(name="preferred_theme", nullable=false)
    private String preferredTheme;

    @Column(name="preferred_transport", nullable=false)
    private String preferredTransport;

    @CreationTimestamp
    @Column(name="created_at", updatable=false)
    private Instant createdAt;

    // Getters/Setters
    public Long getId() { return id; }
    public Long getEventId() { return eventId; }
    public Integer getTotalDuration() { return totalDuration; }
    public Double getTrafficLevel() { return trafficLevel; }
    public Double getCrowdDensity() { return crowdDensity; }
    public Integer getSatisfactionScore() { return satisfactionScore; }
    public Integer getAge() { return age; }
    public Double getBudgetCategory() { return budgetCategory; }
    public String getWeather() { return weather; }
    public String getOptimalRoutePreference() { return optimalRoutePreference; }
    public String getGender() { return gender; }
    public String getNationality() { return nationality; }
    public String getTravelCompanions() { return travelCompanions; }
    public String getPreferredTheme() { return preferredTheme; }
    public String getPreferredTransport() { return preferredTransport; }
    public Instant getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setEventId(Long eventId) { this.eventId = eventId; }
    public void setTotalDuration(Integer totalDuration) { this.totalDuration = totalDuration; }
    public void setTrafficLevel(Double trafficLevel) { this.trafficLevel = trafficLevel; }
    public void setCrowdDensity(Double crowdDensity) { this.crowdDensity = crowdDensity; }
    public void setSatisfactionScore(Integer satisfactionScore) { this.satisfactionScore = satisfactionScore; }
    public void setAge(Integer age) { this.age = age; }
    public void setBudgetCategory(Double budgetCategory) { this.budgetCategory = budgetCategory; }
    public void setWeather(String weather) { this.weather = weather; }
    public void setOptimalRoutePreference(String optimalRoutePreference) { this.optimalRoutePreference = optimalRoutePreference; }
    public void setGender(String gender) { this.gender = gender; }
    public void setNationality(String nationality) { this.nationality = nationality; }
    public void setTravelCompanions(String travelCompanions) { this.travelCompanions = travelCompanions; }
    public void setPreferredTheme(String preferredTheme) { this.preferredTheme = preferredTheme; }
    public void setPreferredTransport(String preferredTransport) { this.preferredTransport = preferredTransport; }
}
