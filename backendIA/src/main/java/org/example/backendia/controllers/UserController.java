package org.example.backendia.controllers;

import org.example.backendia.entities.LogisticsNeed;
import org.example.backendia.entities.User;
import org.example.backendia.repositories.LogisticsNeedRepository;
import org.example.backendia.repositories.UserRepository;
import org.example.backendia.services.ILogisticsNeedService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository repo;
    private final LogisticsNeedRepository logisticsRepo ;
    private final ILogisticsNeedService logisticsService;



    public UserController(UserRepository repo, LogisticsNeedRepository logisticsRepo, ILogisticsNeedService logisticsService) {
        this.repo = repo;
        this.logisticsRepo = logisticsRepo;
        this.logisticsService = logisticsService;
    }

    @GetMapping
    public List<User> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{email}")
    public User getByEmail(@PathVariable String email) {
        return repo.findByEmail(email);
    }

    // CREATE seulement
    @PostMapping("/logistics")
    public ResponseEntity<LogisticsNeed> create(@RequestBody LogisticsNeed n) {
        // si tu veux être strict: vérifier que n.getId() == null, etc.
        return ResponseEntity.ok(logisticsRepo .save(n));
    }
    // READ - list (tous ou filtrés par eventId)
    @GetMapping("/logistics")
    public List<LogisticsNeed> list(@RequestParam(required = false) Long eventId) {
        return (eventId == null)
                ? logisticsService.getAllLogisticsNeeds()
                : logisticsService.getLogisticsNeedsByEvent(eventId);
    }

    // READ - by id
    @GetMapping("/logistics/{id}")
    public ResponseEntity<LogisticsNeed> get(@PathVariable Long id) {
        LogisticsNeed n = logisticsService.getLogisticsNeed(id);
        return (n == null) ? ResponseEntity.notFound().build() : ResponseEntity.ok(n);
    }

    // UPDATE
    @PutMapping("/logistics/{id}")
    public ResponseEntity<LogisticsNeed> update(@PathVariable Long id, @RequestBody LogisticsNeed n) {
        try {
            return ResponseEntity.ok(logisticsService.updateLogisticsNeed(id, n));
        } catch (java.util.NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE
    @DeleteMapping("/logistics/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            logisticsService.deleteLogisticsNeed(id);
            return ResponseEntity.noContent().build();
        } catch (java.util.NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
