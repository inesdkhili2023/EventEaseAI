package org.example.backendia.controllers;

// MatchingController.java

import org.example.backendia.DTO.*;
import org.example.backendia.services.ClientService;
import org.example.backendia.services.DriverService;
import org.example.backendia.services.RiderDriverMatch;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/matching")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class MatchingController {

    private final RiderDriverMatch flaskMatchingService;
    private final DriverService driverService;
    private final ClientService clientService;

    @PostMapping("/find-best-drivers")
    public ResponseEntity<?> findBestDrivers(@RequestBody MatchingRequestDTO request) {
        try {
            log.info("Finding best drivers for rider: {}", request.getRider().getId());

            List<MatchResultDTO> bestMatches = flaskMatchingService.findBestDrivers(
                    request.getRider(),
                    request.getDrivers(),
                    request.getTopK()
            );

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("matchesFound", bestMatches.size());
            response.put("bestMatches", bestMatches);

            log.info("Found {} best matches", bestMatches.size());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error in findBestDrivers: {}", e.getMessage(), e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Erreur lors du matching: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @GetMapping("/client/{clientId}/find-drivers")
    public ResponseEntity<?> findDriversForClient(@PathVariable UUID clientId,
                                                  @RequestParam(defaultValue = "3") int topK) {
        try {
            // Récupérer le client
            RiderRequestDTO rider = clientService.getRiderRequestDTO(clientId);
            if (rider == null) {
                return ResponseEntity.badRequest().body(
                        Map.of("success", false, "error", "Client non trouvé")
                );
            }

            // Récupérer les chauffeurs disponibles
            List<DriverDTO> availableDrivers = driverService.getAvailableDriversNearLocation(
                    rider.getLatitude(), rider.getLongitude(), 50.0
            );

            if (availableDrivers.isEmpty()) {
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "matchesFound", 0,
                        "bestMatches", List.of(),
                        "message", "Aucun chauffeur disponible dans votre zone"
                ));
            }

            // Trouver les meilleurs matches
            List<MatchResultDTO> bestMatches = flaskMatchingService.findBestDrivers(
                    rider, availableDrivers, topK
            );

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("matchesFound", bestMatches.size());
            response.put("bestMatches", bestMatches);
            response.put("availableDriversCount", availableDrivers.size());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error finding drivers for client {}: {}", clientId, e.getMessage(), e);
            return ResponseEntity.internalServerError().body(
                    Map.of("success", false, "error", e.getMessage())
            );
        }
    }

    @GetMapping("/nearby-drivers")
    public ResponseEntity<List<DriverDTO>> getNearbyDrivers(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "50") double radiusKm) {

        List<DriverDTO> nearbyDrivers = driverService.getAvailableDriversNearLocation(lat, lng, radiusKm);
        return ResponseEntity.ok(nearbyDrivers);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of("status", "OK", "service", "Driver Matching"));
    }
}