package org.example.backendia.repositories;

import org.example.backendia.entities.EventFeatures;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventFeaturesRepository extends JpaRepository<EventFeatures, Long> {
    List<EventFeatures> findByEventId(Long eventId);
}
