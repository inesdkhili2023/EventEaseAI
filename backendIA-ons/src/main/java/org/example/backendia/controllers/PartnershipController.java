package org.example.backendia.controllers;

import org.example.backendia.entities.Partnership;
import org.example.backendia.entities.*;

import org.example.backendia.repositories.PartnershipRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partnerships")
@CrossOrigin(origins = "*")
public class PartnershipController {

    private final PartnershipRepository repo;

    public PartnershipController(PartnershipRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<org.example.backendia.entities.Partnership> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Partnership getById(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Partnership not found"));
    }

    @PostMapping
    public Partnership create(@RequestBody Partnership partnership) {
        return repo.save(partnership);
    }

    @PutMapping("/{id}")
    public Partnership update(@PathVariable Long id, @RequestBody Partnership partnership) {
        Partnership existing = repo.findById(id).orElseThrow(() -> new RuntimeException("Partnership not found"));
        existing.setName(partnership.getName());
        existing.setType(partnership.getType());
        existing.setDescription(partnership.getDescription());
        existing.setContractValue(partnership.getContractValue());
        existing.setStartDate(partnership.getStartDate());
        existing.setEndDate(partnership.getEndDate());
        existing.setActive(partnership.getActive());
        return repo.save(existing);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
