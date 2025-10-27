package org.example.backendia.controllers;

import org.example.backendia.entities.Event;
import org.example.backendia.repositories.EventRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    private final EventRepository repo;

    public EventController(EventRepository repo) {
        this.repo = repo;
    }

    // 🔹 CREATE : ajouter un nouvel événement
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event savedEvent = repo.save(event);
        return ResponseEntity.ok(savedEvent);
    }

    // 🔹 READ : récupérer tous les événements
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = repo.findAll();
        return ResponseEntity.ok(events);
    }

    // 🔹 READ : récupérer un événement par ID
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Optional<Event> event = repo.findById(id);
        return event.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 🔹 UPDATE : modifier un événement existant
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        return repo.findById(id)
                .map(existingEvent -> {
                    existingEvent.setTitle(updatedEvent.getTitle());
                    existingEvent.setDescription(updatedEvent.getDescription());
                    existingEvent.setCategory(updatedEvent.getCategory());
                    existingEvent.setLocation(updatedEvent.getLocation());
                    existingEvent.setAddress(updatedEvent.getAddress());
                    existingEvent.setStartDate(updatedEvent.getStartDate());
                    existingEvent.setEndDate(updatedEvent.getEndDate());
                    existingEvent.setCapacity(updatedEvent.getCapacity());
                    existingEvent.setOrganizerId(updatedEvent.getOrganizerId());
                    existingEvent.setImages(updatedEvent.getImages());
                    existingEvent.setPrice(updatedEvent.getPrice());
                    existingEvent.setUpdatedAt(new java.util.Date());

                    Event savedEvent = repo.save(existingEvent);
                    return ResponseEntity.ok(savedEvent);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 🔹 DELETE : supprimer un événement avec images
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        return repo.findById(id)
                .map(event -> {
                    // Supprimer toutes les images associées
                    event.getImages().clear(); // Vide la collection
                    repo.save(event);          // Persist la suppression des images

                    // Supprimer l'événement
                    repo.delete(event);

                    return ResponseEntity.noContent().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }



}