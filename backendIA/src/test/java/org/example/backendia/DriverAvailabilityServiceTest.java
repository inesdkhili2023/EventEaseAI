package org.example.backendia;


import org.example.backendia.DTO.DriverAvailabilityDTO;
import org.example.backendia.entities.Driver;
import org.example.backendia.entities.DriverAvailability;
import org.example.backendia.repositories.DriverAvailabilityRepository;
import org.example.backendia.repositories.DriverRepository;
import org.example.backendia.services.DriverAvailabilityService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DriverAvailabilityServiceTest {

    @Mock
    private DriverRepository driverRepository;

    @Mock
    private DriverAvailabilityRepository availabilityRepository;

    @InjectMocks
    private DriverAvailabilityService driverAvailabilityService;

    private Driver driver;
    private DriverAvailabilityDTO availabilityDTO;
    private DriverAvailability savedAvailability;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        driver = new Driver();
        driver.setId(UUID.randomUUID());
        driver.setNom("Ali");
        driver.setPrenom("Ben Salah");

        availabilityDTO = new DriverAvailabilityDTO();
        availabilityDTO.setDriverId(driver.getId());
        availabilityDTO.setDate(LocalDate.of(2025, 10, 27));
        availabilityDTO.setStartTime(LocalTime.of(9, 0));
        availabilityDTO.setEndTime(LocalTime.of(12, 0));
        availabilityDTO.setAvailable(true);

        savedAvailability = new DriverAvailability();
        savedAvailability.setId(UUID.randomUUID());
        savedAvailability.setDriver(driver);
        savedAvailability.setDate(availabilityDTO.getDate());
        savedAvailability.setStartTime(availabilityDTO.getStartTime());
        savedAvailability.setEndTime(availabilityDTO.getEndTime());
        savedAvailability.setAvailable(true);
    }

    // ✅ Cas normal : ajout d’une disponibilité sans conflit
    @Test
    void testAddAvailability_shouldSaveSuccessfully_whenNoConflict() {
        when(driverRepository.findById(driver.getId())).thenReturn(Optional.of(driver));
        when(availabilityRepository.findConflictingAvailabilities(
                driver.getId(), availabilityDTO.getDate(),
                availabilityDTO.getStartTime(), availabilityDTO.getEndTime()))
                .thenReturn(Collections.emptyList());
        when(availabilityRepository.save(any(DriverAvailability.class))).thenReturn(savedAvailability);

        DriverAvailabilityDTO result = driverAvailabilityService.addAvailability(availabilityDTO);

        assertNotNull(result);
        assertEquals(driver.getId(), result.getDriverId());
        assertEquals("Ali Ben Salah", result.getDriverName());
        assertEquals(availabilityDTO.getDate(), result.getDate());
        assertEquals(availabilityDTO.getStartTime(), result.getStartTime());
        assertEquals(availabilityDTO.getEndTime(), result.getEndTime());
        assertTrue(result.getAvailable());

        verify(driverRepository, times(1)).findById(driver.getId());
        verify(availabilityRepository, times(1)).findConflictingAvailabilities(
                driver.getId(), availabilityDTO.getDate(),
                availabilityDTO.getStartTime(), availabilityDTO.getEndTime());
        verify(availabilityRepository, times(1)).save(any(DriverAvailability.class));
    }

    // ⚠️ Cas d’erreur : chauffeur inexistant
    @Test
    void testAddAvailability_shouldThrow_whenDriverNotFound() {
        when(driverRepository.findById(any(UUID.class))).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () ->
                driverAvailabilityService.addAvailability(availabilityDTO));

        assertEquals("Chauffeur non trouvé avec l'ID: " + availabilityDTO.getDriverId(), ex.getMessage());
        verify(availabilityRepository, never()).save(any());
    }

    // ⚠️ Cas d’erreur : conflit de disponibilité
    @Test
    void testAddAvailability_shouldThrow_whenConflictExists() {
        when(driverRepository.findById(driver.getId())).thenReturn(Optional.of(driver));
        when(availabilityRepository.findConflictingAvailabilities(
                driver.getId(), availabilityDTO.getDate(),
                availabilityDTO.getStartTime(), availabilityDTO.getEndTime()))
                .thenReturn(List.of(new DriverAvailability())); // Simule un conflit

        RuntimeException ex = assertThrows(RuntimeException.class, () ->
                driverAvailabilityService.addAvailability(availabilityDTO));

        assertEquals("Conflit de disponibilité pour cette plage horaire", ex.getMessage());
        verify(availabilityRepository, never()).save(any());
    }
}

