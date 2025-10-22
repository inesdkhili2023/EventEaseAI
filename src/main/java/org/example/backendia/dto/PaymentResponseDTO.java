package org.example.backendia.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseDTO {
    private String clientSecret;
    private String paymentIntentId;
    private String status;
    private Double amount;
    private String message;

    public PaymentResponseDTO(String clientSecret, String id, String status, Long amount, String paymentIntentCreatedSuccessfully) {
    }
}