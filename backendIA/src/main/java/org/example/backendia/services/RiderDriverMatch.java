package org.example.backendia.services;

// FlaskMatchingService.java

import org.example.backendia.DTO.*;
import org.example.backendia.IService.IRiderDriverMatch;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RiderDriverMatch implements IRiderDriverMatch {

    private static final String FLASK_API_URL = "http://localhost:5000/api";
    private final RestTemplate restTemplate;

    @Override
    public List<MatchResultDTO> findBestDrivers(RiderRequestDTO rider, List<DriverDTO> drivers, int topK) {
        try {
            // Préparer la requête pour Flask
            Map<String, Object> request = new HashMap<>();
            request.put("rider", convertRiderToMap(rider));
            request.put("drivers", drivers.stream().map(this::convertDriverToMap).collect(Collectors.toList()));
            request.put("topK", topK);

            log.info("Sending request to Flask API for {} drivers", drivers.size());

            // Appel à l'API Flask
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    FLASK_API_URL + "/match-drivers",
                    request,
                    Map.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map<String, Object> body = response.getBody();
                List<Map<String, Object>> matches = (List<Map<String, Object>>) body.get("bestMatches");

                log.info("Received {} matches from Flask API", matches.size());
                return matches.stream().map(this::convertToMatchResultDTO).collect(Collectors.toList());
            }

        } catch (HttpClientErrorException e) {
            log.error("Flask API error: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
        } catch (Exception e) {
            log.error("Error calling Flask API: {}", e.getMessage());
        }

        // Fallback: matching basique par distance
        log.warn("Using fallback matching algorithm");
        return fallbackMatching(rider, drivers, topK);
    }
    @Override
    public Map<String, Object> convertRiderToMap(RiderRequestDTO rider) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", rider.getId().toString());
        map.put("latitude", rider.getLatitude());
        map.put("longitude", rider.getLongitude());
        map.put("passengerCount", rider.getPassengerCount());
        map.put("specialNeeds", rider.getSpecialNeeds());
        map.put("urgencyLevel", rider.getUrgencyLevel());
        map.put("maxWaitTime", rider.getMaxWaitTime());
        return map;
    }
    @Override
    public Map<String, Object> convertDriverToMap(DriverDTO driver) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", driver.getId().toString());
        map.put("latitude", driver.getLatitude());
        map.put("longitude", driver.getLongitude());
        map.put("vehicleType", driver.getVehicleType());
        map.put("capacity", driver.getCapacity());
        map.put("rating", driver.getRating());
        map.put("pricePerKm", driver.getPricePerKm());
        map.put("experienceYears", driver.getExperienceYears());
        map.put("responseTime", driver.getResponseTime());
        map.put("available", driver.getAvailable());
        map.put("nom", driver.getNom());
        map.put("prenom", driver.getPrenom());
        map.put("num_tel", driver.getNumTel());
        map.put("image_url", driver.getImageUrl());
        return map;
    }
    @Override
    public MatchResultDTO convertToMatchResultDTO(Map<String, Object> matchData) {
        MatchResultDTO result = new MatchResultDTO();
        result.setDriverId((String) matchData.get("driverId"));
        result.setScore(((Number) matchData.get("score")).doubleValue());
        result.setDistance(((Number) matchData.get("distance")).doubleValue());
        result.setTravelTime(((Number) matchData.get("travelTime")).doubleValue());
        result.setVehicleType((String) matchData.get("vehicleType"));
        result.setCapacity(((Number) matchData.get("capacity")).intValue());
        result.setRating(((Number) matchData.get("rating")).doubleValue());
        result.setPricePerKm(((Number) matchData.get("pricePerKm")).doubleValue());
        result.setDriverName((String) matchData.get("driverName"));
        result.setPhoneNumber((String) matchData.get("phoneNumber"));
        result.setProfilePicture((String) matchData.get("profilePicture"));
        result.setExperienceYears(((Number) matchData.get("experienceYears")).intValue());
        result.setResponseTime(((Number) matchData.get("responseTime")).intValue());
        return result;
    }
    @Override
    public List<MatchResultDTO> fallbackMatching(RiderRequestDTO rider, List<DriverDTO> drivers, int topK) {
        return drivers.stream()
                .filter(DriverDTO::getAvailable)
                .sorted(Comparator.comparing(d -> calculateDistance(
                        rider.getLatitude(), rider.getLongitude(),
                        d.getLatitude(), d.getLongitude()
                )))
                .limit(topK)
                .map(this::convertToBasicMatchResultDTO)
                .collect(Collectors.toList());
    }

    @Override
    public double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371;
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    @Override
    public MatchResultDTO convertToBasicMatchResultDTO(DriverDTO driver) {
        MatchResultDTO result = new MatchResultDTO();
        result.setDriverId(driver.getId().toString());
        result.setScore(70.0);
        result.setDistance(calculateDistance(0, 0, driver.getLatitude(), driver.getLongitude()));
        result.setTravelTime(result.getDistance() * 1.5);
        result.setVehicleType(driver.getVehicleType());
        result.setCapacity(driver.getCapacity());
        result.setRating(driver.getRating());
        result.setPricePerKm(driver.getPricePerKm());
        result.setDriverName(driver.getPrenom() + " " + driver.getNom());
        result.setPhoneNumber(driver.getNumTel());
        result.setProfilePicture(driver.getImageUrl());
        result.setExperienceYears(driver.getExperienceYears());
        result.setResponseTime(driver.getResponseTime());
        return result;
    }
}
