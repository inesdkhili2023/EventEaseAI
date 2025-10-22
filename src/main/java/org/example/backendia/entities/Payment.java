package org.example.backendia.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String transactionId;
    private Long ticketId;
    private Double amount;
    private String currency;
    private String paymentMethod; // STRIPE, PAYPAL, FLOUCI
    private String status; // PENDING, SUCCESS, FAILED
    private LocalDateTime paymentDate;
    private String stripePaymentIntentId;
    private String metadata; // JSON
    private Long eventId; // Link to the associated event

}