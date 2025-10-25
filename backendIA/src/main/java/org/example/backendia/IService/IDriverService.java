package org.example.backendia.IService;

import org.example.backendia.DTO.DriverDTO;
import org.example.backendia.entities.Driver;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IDriverService {
    // DriverService.java - Ajouter cette méthode
    List<DriverDTO> getAvailableDriversNearLocation(double lat, double lng, double radiusKm);

    List<DriverDTO> getAllAvailableDrivers();

    DriverDTO convertToDriverDTO(Driver driver);
    public List<Driver> getAllDrivers();
    public Optional<Driver> getDriverById(UUID id);
    public Driver addDriver(Driver driver);
    public Optional<Driver> updateDriverLocation(UUID id, Driver updatedData);
}
