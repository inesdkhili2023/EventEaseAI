package com.example.eventeaseines.Controller;

import com.example.eventeaseines.Entity.User;
import com.example.eventeaseines.Repository.UserRepository;
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
