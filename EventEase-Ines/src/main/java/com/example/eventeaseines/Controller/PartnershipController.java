package com.example.eventeaseines.Controller;

import com.example.eventeaseines.Entity.Event;
import com.example.eventeaseines.Entity.Partnership;
import com.example.eventeaseines.Repository.EventRepository;
import com.example.eventeaseines.Repository.PartnershipRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/partnerships")

public class PartnershipController {

    private final PartnershipRepository partnershipRepo;
    private final EventRepository eventRepo;

    public PartnershipController(PartnershipRepository partnershipRepo, EventRepository eventRepo) {
        this.partnershipRepo = partnershipRepo;
        this.eventRepo = eventRepo;
    }

    @GetMapping
    public List<Partnership> getAll() {
        return partnershipRepo.findAll();
    }

    @GetMapping("/{id}")
    public Partnership getById(@PathVariable Long id) {
        return partnershipRepo.findById(id).orElseThrow(() -> new RuntimeException("Partnership not found"));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Partnership partnership) {
        try {
            // CRITICAL FIX: Create a new Partnership object to avoid merge issues
            Partnership newPartnership = new Partnership();
            newPartnership.setName(partnership.getName());
            newPartnership.setType(partnership.getType());
            newPartnership.setDescription(partnership.getDescription());
            newPartnership.setContractValue(partnership.getContractValue());
            newPartnership.setStartDate(partnership.getStartDate());
            newPartnership.setEndDate(partnership.getEndDate());
            newPartnership.setActive(partnership.getActive() != null ? partnership.getActive() : true);

            // Initialize collections
            newPartnership.setImages(partnership.getImages() != null ? partnership.getImages() : new ArrayList<>());
            newPartnership.setEvents(new HashSet<>());

            // Set timestamps
            newPartnership.setCreatedAt(new Date());
            newPartnership.setUpdatedAt(new Date());

            Partnership saved = partnershipRepo.save(newPartnership);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating partnership: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public Partnership update(@PathVariable Long id, @RequestBody Partnership partnership) {
        Partnership existing = partnershipRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Partnership not found"));
        existing.setName(partnership.getName());
        existing.setType(partnership.getType());
        existing.setDescription(partnership.getDescription());
        existing.setContractValue(partnership.getContractValue());
        existing.setStartDate(partnership.getStartDate());
        existing.setEndDate(partnership.getEndDate());
        existing.setActive(partnership.getActive());
        existing.setImages(partnership.getImages());
        existing.setUpdatedAt(new Date());
        return partnershipRepo.save(existing);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            Partnership partnership = partnershipRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Partnership not found"));

            // Remove relationships with events before deletion
            partnership.getEvents().forEach(event -> event.getPartnerships().remove(partnership));
            partnershipRepo.delete(partnership);

            return ResponseEntity.ok("Partnership deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting partnership: " + e.getMessage());
        }
    }

    @PostMapping("/{partnershipId}/assign-event/{eventId}")
    public ResponseEntity<?> assignToEvent(@PathVariable Long partnershipId, @PathVariable Long eventId) {
        try {
            Partnership partnership = partnershipRepo.findById(partnershipId)
                    .orElseThrow(() -> new RuntimeException("Partnership not found"));
            Event event = eventRepo.findById(eventId)
                    .orElseThrow(() -> new RuntimeException("Event not found"));

            partnership.getEvents().add(event);
            event.getPartnerships().add(partnership);

            partnershipRepo.save(partnership);
            eventRepo.save(event);

            return ResponseEntity.ok("Partnership assigned to event successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error assigning partnership: " + e.getMessage());
        }
    }
    @GetMapping("/{partnershipId}/recommended-events")
    public ResponseEntity<?> getRecommendedEvents(@PathVariable Long partnershipId) {
        try {
            // Appeler le service Python Flask
            String pythonServiceUrl = "http://localhost:5000/api/recommendations/" + partnershipId;

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> response = restTemplate.getForEntity(pythonServiceUrl, Map.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> body = response.getBody();
                return ResponseEntity.ok(body.get("recommendations"));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error getting recommendations from AI service");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{partnershipId}/remove-event/{eventId}")
    public ResponseEntity<?> removeFromEvent(@PathVariable Long partnershipId, @PathVariable Long eventId) {
        try {
            Partnership partnership = partnershipRepo.findById(partnershipId)
                    .orElseThrow(() -> new RuntimeException("Partnership not found"));
            Event event = eventRepo.findById(eventId)
                    .orElseThrow(() -> new RuntimeException("Event not found"));

            partnership.getEvents().remove(event);
            event.getPartnerships().remove(partnership);

            partnershipRepo.save(partnership);
            eventRepo.save(event);

            return ResponseEntity.ok("Partnership removed from event successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error removing partnership: " + e.getMessage());
        }
    }
}