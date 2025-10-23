package org.example.backendia.IService;

import org.example.backendia.DTO.DriverDTO;
import org.example.backendia.entities.Driver;

import java.util.List;

public interface IDriverService {
    // DriverService.java - Ajouter cette méthode
    List<DriverDTO> getAvailableDriversNearLocation(double lat, double lng, double radiusKm);

    List<DriverDTO> getAllAvailableDrivers();

    DriverDTO convertToDriverDTO(Driver driver);
}
