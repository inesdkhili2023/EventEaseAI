package org.example.backendia.repositories;

import org.example.backendia.entities.LogisticsNeed;
import org.example.backendia.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);
}
