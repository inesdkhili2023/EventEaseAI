package org.example.backendia.controllers;

import org.example.backendia.dto.TicketCategoryDTO;
import org.example.backendia.entities.TicketCategory;
import org.example.backendia.service.TicketCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
class TicketController {

    @Autowired
    private TicketCategoryService ticketCategoryService;

    @PostMapping("/events/{eventId}/categories")
    public ResponseEntity<TicketCategory> createCategory(
            @PathVariable Long eventId,
            @RequestBody TicketCategoryDTO dto) {
        TicketCategory category = ticketCategoryService.create(eventId, dto);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/categories/{categoryId}")
    public ResponseEntity<TicketCategory> updateCategory(
            @PathVariable Long categoryId,
            @RequestBody TicketCategoryDTO dto) {
        TicketCategory category = ticketCategoryService.update(categoryId, dto);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/events/{eventId}/categories")
    public ResponseEntity<List<TicketCategoryDTO>> getCategoriesByEvent(
            @PathVariable Long eventId) {
        List<TicketCategoryDTO> categories = ticketCategoryService.getByEvent(eventId);
        return ResponseEntity.ok(categories);
    }

    @PutMapping("/categories/{categoryId}/deactivate")
    public ResponseEntity<?> deactivateCategory(@PathVariable Long categoryId) {
        ticketCategoryService.deactivate(categoryId);
        return ResponseEntity.ok(new MessageResponse("Category deactivated successfully"));
    }
}