package org.example.backendia.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backendia.entities.Driver;
import org.example.backendia.services.DriverService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class DriverController {

    private final DriverService driverService;

    @GetMapping("/all")
    public ResponseEntity<List<Driver>> getAllDrivers() {
        return ResponseEntity.ok(driverService.getAllDrivers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDriverById(@PathVariable UUID id) {
        return driverService.getDriverById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Driver> addDriver(@RequestBody Driver driver) {
        return ResponseEntity.ok(driverService.addDriver(driver));
    }

    @PutMapping("/{id}/update-location")
    public ResponseEntity<?> updateDriverLocation(@PathVariable UUID id, @RequestBody Driver updatedData) {
        return driverService.updateDriverLocation(id, updatedData)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().body("Driver not found"));
    }
}

