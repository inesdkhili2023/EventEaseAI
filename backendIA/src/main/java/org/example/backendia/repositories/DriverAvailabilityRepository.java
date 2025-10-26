package org.example.backendia.repositories;

import org.example.backendia.entities.DriverAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface DriverAvailabilityRepository extends JpaRepository<DriverAvailability, UUID> {

    // Trouver par driver et date
    List<DriverAvailability> findByDriverIdAndDate(UUID driverId, LocalDate date);

    // Trouver par driver et période
    List<DriverAvailability> findByDriverIdAndDateBetween(UUID driverId, LocalDate startDate, LocalDate endDate);

    // Trouver toutes les disponibilités pour une période
    List<DriverAvailability> findByDateBetween(LocalDate startDate, LocalDate endDate);

    // Trouver par date
    List<DriverAvailability> findByDate(LocalDate date);

    // Vérifier les conflits de temps
    @Query("SELECT da FROM DriverAvailability da WHERE da.driver.id = :driverId AND da.date = :date " +
            "AND ((da.startTime <= :endTime AND da.endTime >= :startTime))")
    List<DriverAvailability> findConflictingAvailabilities(
            @Param("driverId") UUID driverId,
            @Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime
    );
}