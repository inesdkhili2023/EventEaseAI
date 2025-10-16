package org.example.backendia.repositories;

import org.example.backendia.entities.Partnership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnershipRepository extends JpaRepository<org.example.backendia.entities.Partnership, Long> {
}
