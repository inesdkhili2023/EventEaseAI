package org.example.backendia;


import org.example.backendia.DTO.*;
import org.example.backendia.services.RiderDriverMatch;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RiderDriverMatchTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private RiderDriverMatch riderDriverMatch;

    private RiderRequestDTO rider;
    private List<DriverDTO> drivers;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // 🔸 Configuration du rider
        rider = new RiderRequestDTO();
        rider.setId(UUID.randomUUID());
        rider.setLatitude(36.8);
        rider.setLongitude(10.2);
        rider.setPassengerCount(2);
        rider.setUrgencyLevel("Moyenne");
        rider.setMaxWaitTime(15);

        // 🔸 Liste de chauffeurs simulée
        DriverDTO d1 = new DriverDTO();
        d1.setId(UUID.randomUUID());
        d1.setLatitude(36.81);
        d1.setLongitude(10.23);
        d1.setAvailable(true);
        d1.setNom("Ali");
        d1.setPrenom("Karim");
        d1.setCapacity(4);
        d1.setVehicleType("Berline");
        d1.setRating(4.5);
        d1.setPricePerKm(1.2);
        d1.setExperienceYears(5);
        d1.setResponseTime(3);

        DriverDTO d2 = new DriverDTO();
        d2.setId(UUID.randomUUID());
        d2.setLatitude(36.85);
        d2.setLongitude(10.28);
        d2.setAvailable(true);
        d2.setNom("Sami");
        d2.setPrenom("Ben");
        d2.setCapacity(3);
        d2.setVehicleType("SUV");
        d2.setRating(4.2);
        d2.setPricePerKm(1.0);
        d2.setExperienceYears(4);
        d2.setResponseTime(5);

        drivers = List.of(d1, d2);
    }

    // ✅ Cas 1 : Flask renvoie des résultats valides
    @Test
    void testFindBestDrivers_shouldReturnFlaskResponse_whenApiOk() {
        Map<String, Object> match1 = new HashMap<>();
        match1.put("driverId", drivers.get(0).getId().toString());
        match1.put("score", 98.0);
        match1.put("distance", 2.3);
        match1.put("travelTime", 6.0);
        match1.put("vehicleType", "Berline");
        match1.put("capacity", 4);
        match1.put("rating", 4.5);
        match1.put("pricePerKm", 1.2);
        match1.put("driverName", "Karim Ali");
        match1.put("phoneNumber", "1111");
        match1.put("profilePicture", "img1");
        match1.put("experienceYears", 5);
        match1.put("responseTime", 3);

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("bestMatches", List.of(match1));

        ResponseEntity<Map> responseEntity = new ResponseEntity<>(responseBody, HttpStatus.OK);
        when(restTemplate.postForEntity(anyString(), any(), eq(Map.class))).thenReturn(responseEntity);

        List<MatchResultDTO> results = riderDriverMatch.findBestDrivers(rider, drivers, 1);

        assertNotNull(results);
        assertEquals(1, results.size());
        assertEquals(drivers.get(0).getId().toString(), results.get(0).getDriverId());
        assertEquals(98.0, results.get(0).getScore());

        verify(restTemplate, times(1)).postForEntity(anyString(), any(), eq(Map.class));
    }

    // ✅ Cas 2 : Erreur Flask → fallback activé
    @Test
    void testFindBestDrivers_shouldFallback_whenApiFails() {
        when(restTemplate.postForEntity(anyString(), any(), eq(Map.class)))
                .thenThrow(new RuntimeException("Flask unreachable"));

        List<MatchResultDTO> results = riderDriverMatch.findBestDrivers(rider, drivers, 2);

        assertNotNull(results);
        assertEquals(2, results.size());
        assertTrue(results.get(0).getDistance() <= results.get(1).getDistance());
        verify(restTemplate, times(1)).postForEntity(anyString(), any(), eq(Map.class));
    }

    // ✅ Cas 3 : Vérifie la fonction de calcul de distance (Haversine)
    @Test
    void testCalculateDistance_shouldReturnPositiveValue() {
        double distance = riderDriverMatch.calculateDistance(36.8, 10.2, 36.9, 10.3);
        assertTrue(distance > 0);
        assertTrue(distance < 20);
    }

    // ✅ Cas 4 : Vérifie la conversion d’un chauffeur en Map
    @Test
    void testConvertDriverToMap_containsExpectedKeys() {
        DriverDTO driver = drivers.get(0);
        Map<String, Object> map = riderDriverMatch.convertDriverToMap(driver);

        assertEquals(driver.getLatitude(), map.get("latitude"));
        assertEquals(driver.getVehicleType(), map.get("vehicleType"));
        assertTrue(map.containsKey("id"));
        assertTrue(map.containsKey("rating"));
    }
}
