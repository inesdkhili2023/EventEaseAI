// DriverService.java
package org.example.backendia.services;

import org.example.backendia.DTO.DriverDTO;
import org.example.backendia.IService.IDriverService;
import org.example.backendia.entities.Driver;
import org.example.backendia.repositories.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DriverService implements IDriverService {

    @Autowired
    private DriverRepository driverRepository;
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

    // Méthode utilitaire pour calculer la distance (fallback)
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Rayon de la Terre en km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}