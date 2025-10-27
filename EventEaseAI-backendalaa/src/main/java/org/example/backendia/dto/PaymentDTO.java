package org.example.backendia.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {
    private Long amount; // Amount in cents
    private String currency; // Currency code (e.g., "eur")
    private String paymentMethod; // Payment method ID
    private String connectedAccountId; // Add this field for the connected account ID
    // Remove amount from here if it will be calculated
}