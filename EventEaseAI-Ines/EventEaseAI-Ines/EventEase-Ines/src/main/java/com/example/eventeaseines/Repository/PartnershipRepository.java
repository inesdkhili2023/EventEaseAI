package com.example.eventeaseines.Repository;

import com.example.eventeaseines.Entity.Partnership;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnershipRepository extends JpaRepository<Partnership, Long> {
}