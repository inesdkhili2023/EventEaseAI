package org.example.backendia.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backendia.DTO.DriverAvailabilityDTO;
import org.example.backendia.services.DriverAvailabilityService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/api/availabilities")
@RequiredArgsConstructor
public class DriverAvailabilityController {

    private final DriverAvailabilityService availabilityService;

    @PostMapping
    public ResponseEntity<DriverAvailabilityDTO> addAvailability(@RequestBody DriverAvailabilityDTO availabilityDTO) {
        try {
            DriverAvailabilityDTO saved = availabilityService.addAvailability(availabilityDTO);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            log.error("Erreur lors de l'ajout de la disponibilité: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<DriverAvailabilityDTO>> getDriverAvailabilities(
            @PathVariable UUID driverId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        try {
            List<DriverAvailabilityDTO> availabilities = availabilityService.getDriverAvailabilities(driverId, startDate, endDate);
            return ResponseEntity.ok(availabilities);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des disponibilités: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<DriverAvailabilityDTO>> getAllAvailabilities(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        try {
            List<DriverAvailabilityDTO> availabilities = availabilityService.getAllAvailabilities(startDate, endDate);
            return ResponseEntity.ok(availabilities);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération de toutes les disponibilités: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{availabilityId}")
    public ResponseEntity<DriverAvailabilityDTO> updateAvailability(
            @PathVariable UUID availabilityId,
            @RequestBody DriverAvailabilityDTO availabilityDTO) {

        try {
            DriverAvailabilityDTO updated = availabilityService.updateAvailability(availabilityId, availabilityDTO);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour de la disponibilité: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{availabilityId}")
    public ResponseEntity<Void> deleteAvailability(@PathVariable UUID availabilityId) {
        try {
            availabilityService.deleteAvailability(availabilityId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Erreur lors de la suppression de la disponibilité: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}