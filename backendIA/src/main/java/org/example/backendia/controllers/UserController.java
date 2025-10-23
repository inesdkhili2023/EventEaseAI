package org.example.backendia.controllers;

import org.example.backendia.entities.User;
import org.example.backendia.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // pour autoriser Angular à accéder
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<User> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{email}")
    public User getByEmail(@PathVariable String email) {
        return repo.findByEmail(email);
    }
}