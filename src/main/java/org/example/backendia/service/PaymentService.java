package org.example.backendia.service;
import com.stripe.exception.StripeException;
import jakarta.annotation.PostConstruct;
import org.example.backendia.dto.PaymentDTO;
import org.example.backendia.dto.PaymentResponseDTO;
import org.example.backendia.entities.*;
import org.example.backendia.repositories.*;
import org.example.backendia.repositories.TicketCategoryRepository;
import org.example.backendia.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.net.RequestOptions;
@Service
public class PaymentService {

    @Value("${stripe.test.secret.key}")
    private String testSecretKey;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private TicketCategoryRepository categoryRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @PostConstruct
    public void init() {
        Stripe.apiKey = testSecretKey;  // Ensure this line is executed

    }

    public PaymentResponseDTO createPaymentIntent(PaymentDTO paymentDTO) throws Exception {
        Stripe.apiKey = testSecretKey;

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) (paymentDTO.getAmount())) // amount in cents
                .setCurrency(paymentDTO.getCurrency())
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                )
                .build();

        PaymentIntent intent = PaymentIntent.create(params);

        return new PaymentResponseDTO(
                intent.getClientSecret(),  // ✅ Not null anymore
                intent.getId(),
                intent.getStatus(),
                paymentDTO.getAmount() / 100.0,  // Convert back to display euros
                "Payment intent created successfully"
        );
    }


    public PaymentResponseDTO confirmPayment(String paymentIntentId) throws Exception {
        PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);

        Payment payment = paymentRepository.findByStripePaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        if ("succeeded".equals(intent.getStatus())) {
            payment.setStatus("SUCCESS");

            // Create tickets for the buyer
            TicketCategory category = categoryRepository.findById(payment.getTicketId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            int quantity = (int) (payment.getAmount() / category.getPrice());

            for (int i = 0; i < quantity; i++) {
                Ticket ticket = new Ticket();
                ticket.setCategory(category);
                ticket.setTicketCode("TKT-" + UUID.randomUUID().toString().substring(0, 8));
                ticket.setBuyerEmail(payment.getMetadata());
                ticket.setPurchaseDate(LocalDateTime.now());
                ticket.setValid(true);
                ticketRepository.save(ticket);
            }

            // Update available quota
            category.setAvailableQuota(category.getAvailableQuota() - quantity);
            categoryRepository.save(category);
        } else {
            payment.setStatus("FAILED");
        }

        paymentRepository.save(payment);

        return new PaymentResponseDTO(
                null,
                paymentIntentId,
                payment.getStatus(),
                payment.getAmount(),
                "Payment " + payment.getStatus()
        );
    }

    public List<Payment> getPaymentsByEvent(Long eventId) {
        return paymentRepository.findByEventId(eventId);
    }

    public List<Ticket> getUserTickets(String email) {
        return ticketRepository.findByBuyerEmail(email);
    }
}