package com.example.eventeaseines.Controller;

import com.example.eventeaseines.Entity.Event;
import com.example.eventeaseines.Entity.Partnership;
import com.example.eventeaseines.Repository.EventRepository;
import com.example.eventeaseines.Repository.PartnershipRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
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
        List<Partnership> partnerships = partnershipRepo.findAll();

        // 🔍 DEBUG: Afficher les URLs des images
        System.out.println("========================================");
        System.out.println("📋 Récupération de " + partnerships.size() + " partenariats");
        partnerships.forEach(p -> {
            System.out.println("  - " + p.getName() + " | Image URL: " + p.getImageUrl());
        });
        System.out.println("========================================");

        return partnerships;
    }

    @GetMapping("/{id}")
    public Partnership getById(@PathVariable Long id) {
        return partnershipRepo.findById(id).orElseThrow(() -> new RuntimeException("Partnership not found"));
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> create(
            @RequestParam("name") String name,
            @RequestParam("type") String type,
            @RequestParam("description") String description,
            @RequestParam("contractValue") Double contractValue,
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endDate,
            @RequestParam("active") Boolean active,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {
            Partnership newPartnership = new Partnership();
            newPartnership.setName(name);
            newPartnership.setType(type);
            newPartnership.setDescription(description);
            newPartnership.setContractValue(contractValue);
            newPartnership.setStartDate(startDate);
            newPartnership.setEndDate(endDate);
            newPartnership.setActive(active != null ? active : true);
            newPartnership.setEvents(new HashSet<>());
            newPartnership.setCreatedAt(new Date());
            newPartnership.setUpdatedAt(new Date());

            // ----- ENREGISTREMENT DE L'IMAGE UNIQUE avec DEBUG -----
            if (image != null && !image.isEmpty()) {
                System.out.println("========================================");
                System.out.println("📸 Réception d'une image");
                System.out.println("  - Nom original: " + image.getOriginalFilename());
                System.out.println("  - Taille: " + image.getSize() + " bytes");
                System.out.println("  - Type: " + image.getContentType());

                String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
                Path filePath = Paths.get("uploads", filename);

                // ✅ Créer le dossier s'il n'existe pas
                File uploadDir = new File("uploads");
                if (!uploadDir.exists()) {
                    boolean created = uploadDir.mkdirs();
                    System.out.println("  - Dossier 'uploads' créé: " + created);
                }

                // Sauvegarder le fichier
                Files.write(filePath, image.getBytes());

                // Vérifier que le fichier existe
                File savedFile = filePath.toFile();
                System.out.println("  - Fichier sauvegardé: " + savedFile.exists());
                System.out.println("  - Chemin absolu: " + filePath.toAbsolutePath());
                System.out.println("  - URL relative: /uploads/" + filename);
                System.out.println("  - URL complète: http://localhost:8081/uploads/" + filename);
                System.out.println("========================================");

                newPartnership.setImageUrl("/uploads/" + filename);
            } else {
                System.out.println("⚠️  Aucune image fournie");
            }

            Partnership saved = partnershipRepo.save(newPartnership);

            System.out.println("✅ Partenariat créé avec succès: " + saved.getName());
            System.out.println("   Image URL enregistrée: " + saved.getImageUrl());

            return ResponseEntity.status(HttpStatus.CREATED).body(saved);

        } catch (Exception e) {
            System.err.println("❌ ERREUR lors de la création du partenariat:");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating partnership: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("type") String type,
            @RequestParam("description") String description,
            @RequestParam("contractValue") Double contractValue,
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endDate,
            @RequestParam("active") Boolean active,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {
            Partnership existing = partnershipRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Partnership not found"));

            System.out.println("========================================");
            System.out.println("✏️  Mise à jour du partenariat: " + existing.getName());

            existing.setName(name);
            existing.setType(type);
            existing.setDescription(description);
            existing.setContractValue(contractValue);
            existing.setStartDate(startDate);
            existing.setEndDate(endDate);
            existing.setActive(active);

            // ✅ Si une nouvelle image est envoyée, on la remplace
            if (image != null && !image.isEmpty()) {
                System.out.println("  - Nouvelle image reçue: " + image.getOriginalFilename());

                String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
                Path filePath = Paths.get("uploads", filename);

                // Créer le dossier s'il n'existe pas
                File uploadDir = new File("uploads");
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                Files.write(filePath, image.getBytes());

                System.out.println("  - Fichier sauvegardé: " + filePath.toAbsolutePath());
                System.out.println("  - Nouvelle URL: /uploads/" + filename);

                existing.setImageUrl("/uploads/" + filename);
            } else {
                System.out.println("  - Aucune nouvelle image (image actuelle conservée)");
            }

            existing.setUpdatedAt(new Date());
            Partnership updated = partnershipRepo.save(existing);

            System.out.println("✅ Partenariat mis à jour avec succès");
            System.out.println("========================================");

            return ResponseEntity.ok(updated);

        } catch (Exception e) {
            System.err.println("❌ ERREUR lors de la mise à jour:");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating partnership: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            Partnership partnership = partnershipRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Partnership not found"));

            System.out.println("🗑️  Suppression du partenariat: " + partnership.getName());

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