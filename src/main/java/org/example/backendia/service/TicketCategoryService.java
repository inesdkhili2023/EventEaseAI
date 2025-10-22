package org.example.backendia.service;


import org.example.backendia.dto.TicketCategoryDTO;
import org.example.backendia.entities.Event;
import org.example.backendia.entities.TicketCategory;
import org.example.backendia.repositories.EventRepository;
import org.example.backendia.repositories.TicketCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketCategoryService {
    @Autowired
    private TicketCategoryRepository categoryRepository;

    @Autowired
    private EventRepository eventRepository;

    public TicketCategory create(Long eventId, TicketCategoryDTO dto) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        TicketCategory category = new TicketCategory();
        category.setEvent(event);
        category.setCategoryName(dto.getCategoryName());
        category.setPrice(dto.getPrice());
        category.setTotalQuota(dto.getTotalQuota());
        category.setAvailableQuota(dto.getTotalQuota());
        category.setActive(true);
        category.setCreatedAt(LocalDateTime.now());

        return categoryRepository.save(category);
    }

    public TicketCategory update(Long categoryId, TicketCategoryDTO dto) {
        TicketCategory category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (dto.getPrice() != null) category.setPrice(dto.getPrice());
        if (dto.getTotalQuota() != null) {
            int difference = dto.getTotalQuota() - category.getTotalQuota();
            category.setTotalQuota(dto.getTotalQuota());
            category.setAvailableQuota(category.getAvailableQuota() + difference);
        }
        category.setUpdatedAt(LocalDateTime.now());

        return categoryRepository.save(category);
    }

    public void deactivate(Long categoryId) {
        TicketCategory category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        category.setActive(false);
        categoryRepository.save(category);
    }

    public List<TicketCategoryDTO> getByEvent(Long eventId) {
        return categoryRepository.findByEventId(eventId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private TicketCategoryDTO convertToDTO(TicketCategory category) {
        return new TicketCategoryDTO(
                category.getId(),
                category.getCategoryName(),
                category.getPrice(),
                category.getTotalQuota(),
                category.getAvailableQuota(),
                category.getActive()
        );
    }
}