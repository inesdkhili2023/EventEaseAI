// DriverService.java
package org.example.backendia.services;

import lombok.extern.slf4j.Slf4j;
import org.example.backendia.DTO.DriverDTO;
import org.example.backendia.IService.IDriverService;
import org.example.backendia.entities.Driver;
import org.example.backendia.repositories.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
@Slf4j
@Service
public class DriverService implements IDriverService {

    @Autowired
    private DriverRepository driverRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public List<DriverDTO> getAvailableDriversNearLocation(double lat, double lng, double radiusKm) {
        try {
            // Utilisation de la méthode du repository
            List<Driver> drivers = driverRepository.findAvailableDriversNearLocation(lat, lng, radiusKm);

            return drivers.stream()
                    .map(this::convertToDriverDTO)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            // Fallback: retourner tous les chauffeurs disponibles
            System.err.println("Erreur dans la requête géospatiale: " + e.getMessage());
            return getAllAvailableDrivers();
        }
    }
    @Override
    public List<DriverDTO> getAllAvailableDrivers() {
        List<Driver> drivers = driverRepository.findAllAvailableDrivers();
        return drivers.stream()
                .map(this::convertToDriverDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DriverDTO convertToDriverDTO(Driver driver) {
        DriverDTO dto = new DriverDTO();
        dto.setId(driver.getId());
        dto.setLatitude(driver.getLatitude());
        dto.setLongitude(driver.getLongitude());
        dto.setVehicleType(driver.getVehicleType());
        dto.setCapacity(driver.getCapacity());
        dto.setRating(driver.getRating());
        dto.setPricePerKm(driver.getPricePerKm());
        dto.setExperienceYears(driver.getExperienceYears());
        dto.setResponseTime(driver.getResponseTime());
        dto.setAvailable(driver.getAvailable());
        dto.setNom(driver.getNom());
        dto.setPrenom(driver.getPrenom());
        dto.setNumTel(driver.getNum_tel());
        dto.setImageUrl(driver.getImage_url());
        return dto;
    }

    @Override
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    @Override
    public Optional<Driver> getDriverById(UUID id) {
        return driverRepository.findById(id);
    }


    @Override
    public Driver addDriver(Driver driver) {
        // Génération d'UUID si manquant
        if (driver.getId() == null) {
            driver.setId(UUID.randomUUID());
        }

        // Champs par défaut
        driver.setAvailable(true);
        driver.setCreated_at(LocalDate.now());

        if (driver.getRole() == null) {
            driver.setRole("CHAUFFEUR");
        }

        // 🔐 Crypter le mot de passe avant sauvegarde
        if (driver.getPassword() != null && !driver.getPassword().isBlank()) {
            try {
                String hashedPassword = jdbcTemplate.queryForObject(
                        "SELECT crypt(?, gen_salt('bf'))",
                        String.class,
                        driver.getPassword()
                );
                driver.setPassword(hashedPassword);
            } catch (Exception e) {
                log.error("Erreur lors du cryptage du mot de passe : {}", e.getMessage());
                throw new RuntimeException("Erreur de cryptage du mot de passe");
            }
        }

        try {
            Driver saved = driverRepository.save(driver);
            log.info("✅ Chauffeur ajouté : {} {} (ID: {})", saved.getPrenom(), saved.getNom(), saved.getId());
            return saved;
        } catch (Exception e) {
            log.error("❌ Erreur lors de la sauvegarde du chauffeur : {}", e.getMessage());
            throw e;
        }
    }

    @Override
    public Optional<Driver> updateDriverLocation(UUID id, Driver updatedData) {
        Optional<Driver> driverOpt = driverRepository.findById(id);
        if (driverOpt.isEmpty()) {
            return Optional.empty();
        }

        Driver driver = driverOpt.get();
        driver.setLatitude(updatedData.getLatitude());
        driver.setLongitude(updatedData.getLongitude());
        driverRepository.save(driver);

        log.info("Updated location for driver {} to {}, {}", driver.getId(), driver.getLatitude(), driver.getLongitude());
        return Optional.of(driver);
    }

    @Override
    public Driver updateDriverInfo(UUID id, Driver updatedDriver) {
        Driver existing = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        existing.setNom(updatedDriver.getNom());
        existing.setPrenom(updatedDriver.getPrenom());
        existing.setEmail(updatedDriver.getEmail());
        existing.setNum_tel(updatedDriver.getNum_tel());
        existing.setAdresse(updatedDriver.getAdresse());
        existing.setDate_naissance(updatedDriver.getDate_naissance());
        existing.setVehicleType(updatedDriver.getVehicleType());
        existing.setCapacity(updatedDriver.getCapacity());
        existing.setExperienceYears(updatedDriver.getExperienceYears());
        existing.setPricePerKm(updatedDriver.getPricePerKm());
        existing.setLatitude(updatedDriver.getLatitude());
        existing.setLongitude(updatedDriver.getLongitude());

        return driverRepository.save(existing);
    }

    @Override
    public Optional<Driver> getDriverByEmail(String email) {
        return driverRepository.findByEmail(email);
    }


}