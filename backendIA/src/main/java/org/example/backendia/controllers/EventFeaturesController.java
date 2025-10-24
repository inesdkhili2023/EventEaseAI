package org.example.backendia.controllers;

import org.example.backendia.entities.EventFeatures;
import org.example.backendia.repositories.EventFeaturesRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/features")
@CrossOrigin(origins = {"http://localhost:4200"}) // adapte au domaine Angular
public class EventFeaturesController {

    private final EventFeaturesRepository repo;

    public EventFeaturesController(EventFeaturesRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<EventFeatures> create(@RequestBody EventFeatures body) {
        return ResponseEntity.ok(repo.save(body));
    }

    @GetMapping
    public List<EventFeatures> list(@RequestParam(required = false) Long eventId) {
        return (eventId == null) ? repo.findAll() : repo.findByEventId(eventId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventFeatures> get(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
