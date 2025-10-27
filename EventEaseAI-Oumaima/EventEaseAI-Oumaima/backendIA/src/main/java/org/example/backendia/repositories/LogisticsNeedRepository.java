package org.example.backendia.repositories;

import org.example.backendia.entities.LogisticsNeed;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogisticsNeedRepository extends JpaRepository<LogisticsNeed, Long> {
    List<LogisticsNeed> findByEventId(Long eventId);

}
