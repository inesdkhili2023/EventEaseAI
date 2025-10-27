package org.example.backendia.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backendia.DTO.DriverAvailabilityDTO;
import org.example.backendia.entities.Driver;
import org.example.backendia.entities.DriverAvailability;
import org.example.backendia.repositories.DriverAvailabilityRepository;
import org.example.backendia.repositories.DriverRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DriverAvailabilityService {

    private final DriverAvailabilityRepository availabilityRepository;
    private final DriverRepository driverRepository;

    public DriverAvailabilityDTO addAvailability(DriverAvailabilityDTO availabilityDTO) {
        // Vérifier si le chauffeur existe
        Driver driver = driverRepository.findById(availabilityDTO.getDriverId())
                .orElseThrow(() -> new RuntimeException("Chauffeur non trouvé avec l'ID: " + availabilityDTO.getDriverId()));

        // Vérifier les conflits
        List<DriverAvailability> conflicts = availabilityRepository.findConflictingAvailabilities(
                availabilityDTO.getDriverId(),
                availabilityDTO.getDate(),
                availabilityDTO.getStartTime(),
                availabilityDTO.getEndTime()
        );

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Conflit de disponibilité pour cette plage horaire");
        }

        // Créer et sauvegarder la disponibilité
        DriverAvailability availability = new DriverAvailability();
        availability.setDriver(driver);
        availability.setDate(availabilityDTO.getDate());
        availability.setStartTime(availabilityDTO.getStartTime());
        availability.setEndTime(availabilityDTO.getEndTime());
        availability.setAvailable(availabilityDTO.getAvailable() != null ? availabilityDTO.getAvailable() : true);

        DriverAvailability saved = availabilityRepository.save(availability);
        log.info("✅ Disponibilité ajoutée pour le chauffeur {} le {}", driver.getNom(), availabilityDTO.getDate());

        return convertToDTO(saved);
    }

    public List<DriverAvailabilityDTO> getDriverAvailabilities(UUID driverId, LocalDate startDate, LocalDate endDate) {
        List<DriverAvailability> availabilities;

        if (startDate != null && endDate != null) {
            availabilities = availabilityRepository.findByDriverIdAndDateBetween(driverId, startDate, endDate);
        } else if (startDate != null) {
            availabilities = availabilityRepository.findByDriverIdAndDate(driverId, startDate);
        } else {
            availabilities = availabilityRepository.findByDriverIdAndDate(driverId, LocalDate.now());
        }

        return availabilities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<DriverAvailabilityDTO> getAllAvailabilities(LocalDate startDate, LocalDate endDate) {
        List<DriverAvailability> availabilities;

        if (startDate != null && endDate != null) {
            availabilities = availabilityRepository.findByDateBetween(startDate, endDate);
        } else {
            availabilities = availabilityRepository.findByDate(LocalDate.now());
        }

        return availabilities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void deleteAvailability(UUID availabilityId) {
        availabilityRepository.deleteById(availabilityId);
        log.info("🗑️ Disponibilité supprimée: {}", availabilityId);
    }

    public DriverAvailabilityDTO updateAvailability(UUID availabilityId, DriverAvailabilityDTO availabilityDTO) {
        DriverAvailability availability = availabilityRepository.findById(availabilityId)
                .orElseThrow(() -> new RuntimeException("Disponibilité non trouvée"));

        availability.setDate(availabilityDTO.getDate());
        availability.setStartTime(availabilityDTO.getStartTime());
        availability.setEndTime(availabilityDTO.getEndTime());
        availability.setAvailable(availabilityDTO.getAvailable());

        DriverAvailability updated = availabilityRepository.save(availability);
        return convertToDTO(updated);
    }

    private DriverAvailabilityDTO convertToDTO(DriverAvailability availability) {
        DriverAvailabilityDTO dto = new DriverAvailabilityDTO();
        dto.setId(availability.getId());
        dto.setDriverId(availability.getDriver().getId());
        dto.setDriverName(availability.getDriver().getNom() + " " + availability.getDriver().getPrenom());
        dto.setDate(availability.getDate());
        dto.setStartTime(availability.getStartTime());
        dto.setEndTime(availability.getEndTime());
        dto.setAvailable(availability.getAvailable());
        return dto;
    }
}