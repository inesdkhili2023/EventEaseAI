package org.example.backendia.controllers;
import org.example.backendia.dto.ChatRequest;
import org.example.backendia.dto.ChatResponse;
import org.example.backendia.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        ChatResponse resp = geminiService.chat(request);
        return ResponseEntity.ok(resp);
    }
}
