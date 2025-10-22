package org.example.backendia.controllers;

import org.example.backendia.dto.PaymentDTO;
import org.example.backendia.dto.PaymentResponseDTO;
import org.example.backendia.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Value("${stripe.test.secret.key}")
    private String testSecretKey;

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    /**
     * Create a new Stripe Payment Intent
     */
    @PostMapping("/create-intent")
    public ResponseEntity<PaymentResponseDTO> createPaymentIntent(@RequestBody PaymentDTO paymentDTO) {
        try {
            PaymentResponseDTO response = paymentService.createPaymentIntent(paymentDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new PaymentResponseDTO(null, null, "ERROR", 0.0, e.getMessage())
            );
        }
    }

    /**
     * Confirm a Stripe Payment Intent
     */
    @PostMapping("/confirm")
    public ResponseEntity<PaymentResponseDTO> confirmPayment(@RequestParam String paymentIntentId) {
        try {
            PaymentResponseDTO response = paymentService.confirmPayment(paymentIntentId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new PaymentResponseDTO(null, paymentIntentId, "FAILED", 0.0, e.getMessage())
            );
        }
    }

    /**
     * Get all payments for a specific event
     */
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<?>> getPaymentsByEvent(@PathVariable Long eventId) {
        try {
            List<?> payments = paymentService.getPaymentsByEvent(eventId);
            return ResponseEntity.ok(payments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(List.of(e.getMessage()));
        }
    }

    /**
     * Get all tickets purchased by a user (by email)
     */
    @GetMapping("/tickets/user/{email}")
    public ResponseEntity<List<?>> getUserTickets(@PathVariable String email) {
        try {
            List<?> tickets = paymentService.getUserTickets(email);
            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(List.of(e.getMessage()));
        }
    }
}
