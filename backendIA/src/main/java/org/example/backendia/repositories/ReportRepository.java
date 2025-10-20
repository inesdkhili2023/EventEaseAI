package org.example.backendia.repositories;

import org.example.backendia.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report,Long> {
    List<Report> findByComment_IdComment(Long idComment);
}
