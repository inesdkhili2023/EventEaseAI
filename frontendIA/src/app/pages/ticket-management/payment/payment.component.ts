import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { StripeService } from '../../../services/stripe.service';
import { TicketService } from '../../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-form',
  providers:[PaymentService,TicketService],
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  template: `
    <div class="payment-wrapper">
      <div class="payment-container">
        <div class="payment-card">
          <!-- Header -->
          <div class="card-header">
            <div class="header-content">
              <h1 class="header-title">Paiement Sécurisé</h1>
              <p class="header-subtitle">Votre paiement est protégé par Stripe</p>
            </div>
          </div>
          
          <div class="card-body">
            <!-- Ticket Summary -->
            <div class="ticket-summary" *ngIf="selectedCategoryId">
              <div class="summary-header">
                <h2>Résumé de votre commande</h2>
              </div>
              <div class="summary-details">
                <div class="summary-row">
                  <span class="label">Catégorie:</span>
                  <span class="value">{{ getSelectedCategory()?.categoryName }}</span>
                </div>
                <div class="summary-row">
                  <span class="label">Prix unitaire:</span>
                  <span class="value">{{ getSelectedCategory()?.price }} {{ currency }}</span>
                </div>
                <div class="summary-row">
                  <span class="label">Quantité:</span>
                  <span class="value">{{ quantity }}</span>
                </div>
                <div class="summary-row total">
                  <span class="label">Total:</span>
                  <span class="value">{{ totalAmount.toFixed(2) }} {{ currency }}</span>
                </div>
              </div>
            </div>

            <!-- Form Sections -->
            <form class="payment-form">
              
              <!-- Customer Information Section -->
              <div class="form-section">
                <h3 class="section-title">Informations Client</h3>
                
                <div class="form-group">
                  <label for="category" class="form-label">Catégorie de Billet *</label>
                  <select 
                    id="category"
                    class="form-select" 
                    [(ngModel)]="selectedCategoryId" 
                    name="category"
                    (change)="calculateTotal()">
                    <option value="">-- Choisir une catégorie --</option>
                    <option *ngFor="let cat of categories" [ngValue]="cat.id">
                      {{ cat.categoryName }} - {{ cat.price }} {{ currency }} ({{ cat.availableQuota }} disponibles)
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="email" class="form-label">Email *</label>
                  <input 
                    id="email"
                    type="email" 
                    class="form-input" 
                    [(ngModel)]="buyerEmail"
                    name="email"
                    placeholder="votre@email.com"
                    required>
                </div>

                <div class="form-group">
                  <label for="quantity" class="form-label">Quantité *</label>
                  <input 
                    id="quantity"
                    type="number" 
                    class="form-input" 
                    [(ngModel)]="quantity"
                    name="quantity"
                    min="1"
                    [max]="maxQuantity"
                    (change)="calculateTotal()"
                    placeholder="Nombre de billets">
                  <small class="form-hint">Maximum disponible: {{ maxQuantity }}</small>
                </div>
              </div>

              <!-- Payment Method Section -->
              <div class="form-section">
                <h3 class="section-title">Méthode de Paiement</h3>
                
                <div class="form-group">
                  <label for="method" class="form-label">Choisir une méthode *</label>
                  <select 
                    id="method"
                    class="form-select" 
                    [(ngModel)]="paymentMethod" 
                    name="method">
                    <option value="STRIPE">Carte Bancaire (Stripe)</option>
                    <option value="PAYPAL">PayPal</option>
                    <option value="FLOUCI">Flouci (Tunisie)</option>
                  </select>
                </div>

                <!-- Stripe Card Element -->
                <div *ngIf="paymentMethod === 'STRIPE'" class="card-element-wrapper">
                  <label for="card-element" class="form-label">Détails de la Carte *</label>
                  <div id="card-element" class="card-element"></div>
                  <div id="card-errors" class="card-errors" role="alert"></div>
                </div>
              </div>

              <!-- Security Notice -->
              <div class="security-notice">
                <svg class="security-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <p>Vos informations de paiement sont sécurisées et cryptées. Nous ne stockons jamais vos données de carte bancaire.</p>
              </div>

              <!-- Error Message -->
              <div *ngIf="errorMessage" class="alert alert-error">
                {{ errorMessage }}
              </div>

              <!-- Success Message -->
              <div *ngIf="successMessage" class="alert alert-success">
                {{ successMessage }}
              </div>

              <!-- Payment Button -->
              <div class="form-actions">
                <button 
                  type="button" 
                  class="btn btn-primary btn-lg"
                  (click)="initiatePayment()"
                  [disabled]="!isFormValid() || isLoading">
                  <span *ngIf="isLoading" class="spinner"></span>
                  {{ isLoading ? 'Traitement...' : 'Payer ' + totalAmount.toFixed(2) + ' ' + currency }}
                </button>
                <button 
                  type="button" 
                  class="btn btn-secondary"
                  (click)="goBack()">
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Payment Methods Info Card -->
        <div class="info-card">
          <h3 class="info-title">Méthodes de Paiement Acceptées</h3>
          <div class="payment-methods">
            <div class="payment-method-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <path d="M1 10h22"></path>
              </svg>
              <span>Cartes de crédit/débit</span>
            </div>
            <div class="payment-method-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"></path>
                <polyline points="17 1 12 5 7 1"></polyline>
              </svg>
              <span>Virement bancaire</span>
            </div>
            <div class="payment-method-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>Mobile Money</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    :host {
      --primary-blue: #0f4ca5;
      --primary-light: #e8f0ff;
      --text-primary: #1a1a1a;
      --text-secondary: #666666;
      --border-color: #e0e0e0;
      --success-color: #10b981;
      --error-color: #ef4444;
      --bg-light: #f9fafb;
    }

    .payment-wrapper {
      min-height: 100vh;
      background: linear-gradient(135deg, #f9fafb 0%, #f0f4ff 100%);
      padding: 2rem 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .payment-container {
      width: 100%;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .payment-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      border: 1px solid var(--border-color);
    }

    .card-header {
      background: linear-gradient(135deg, var(--primary-blue) 0%, #0d3d8a 100%);
      color: white;
      padding: 2rem;
      text-align: center;
    }

    .header-title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      letter-spacing: -0.5px;
    }

    .header-subtitle {
      font-size: 0.95rem;
      opacity: 0.9;
      margin: 0;
    }

    .card-body {
      padding: 2rem;
    }

    .ticket-summary {
      background: var(--primary-light);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      border-left: 4px solid var(--primary-blue);
    }

    .summary-header h2 {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 1rem 0;
    }

    .summary-details {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.95rem;
    }

    .summary-row .label {
      color: var(--text-secondary);
      font-weight: 500;
    }

    .summary-row .value {
      color: var(--text-primary);
      font-weight: 600;
    }

    .summary-row.total {
      border-top: 1px solid rgba(15, 76, 165, 0.2);
      padding-top: 0.75rem;
      margin-top: 0.75rem;
      font-size: 1.1rem;
    }

    .payment-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .section-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--primary-blue);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .form-input,
    .form-select {
      padding: 0.75rem 1rem;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .form-input:focus,
    .form-select:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(15, 76, 165, 0.1);
    }

    .form-hint {
      font-size: 0.8rem;
      color: var(--text-secondary);
    }

    .card-element-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .card-element {
      padding: 0.75rem 1rem;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      background: white;
      min-height: 50px;
      transition: all 0.2s ease;
    }

    .card-element:focus-within {
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(15, 76, 165, 0.1);
    }

    .card-errors {
      color: var(--error-color);
      font-size: 0.85rem;
      min-height: 1.2rem;
    }

    .security-notice {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      background: rgba(16, 185, 129, 0.05);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 8px;
      padding: 1rem;
      margin: 1.5rem 0;
    }

    .security-icon {
      width: 24px;
      height: 24px;
      color: var(--success-color);
      flex-shrink: 0;
      margin-top: 2px;
    }

    .security-notice p {
      margin: 0;
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .alert {
      padding: 1rem;
      border-radius: 6px;
      font-size: 0.9rem;
      margin: 1rem 0;
    }

    .alert-error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #991b1b;
    }

    .alert-success {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #065f46;
    }

    .form-actions {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .btn {
      padding: 0.875rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .btn-primary {
      background: var(--primary-blue);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #0d3d8a;
      box-shadow: 0 4px 12px rgba(15, 76, 165, 0.3);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: var(--bg-light);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
    }

    .btn-secondary:hover {
      background: #f0f0f0;
    }

    .btn-lg {
      padding: 1rem 1.5rem;
      font-size: 1rem;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .info-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid var(--border-color);
    }

    .info-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 1rem 0;
    }

    .payment-methods {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }

    .payment-method-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: var(--bg-light);
      border-radius: 8px;
      text-align: center;
      transition: all 0.2s ease;
    }

    .payment-method-item:hover {
      background: var(--primary-light);
      transform: translateY(-2px);
    }

    .payment-method-item svg {
      width: 32px;
      height: 32px;
      color: var(--primary-blue);
    }

    .payment-method-item span {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-secondary);
    }

    @media (max-width: 640px) {
      .payment-wrapper {
        padding: 1rem;
      }

      .card-body {
        padding: 1.5rem;
      }

      .header-title {
        font-size: 1.5rem;
      }

      .payment-methods {
        grid-template-columns: 1fr;
      }
    }
  `,
  ],
})

export class PaymentFormComponent implements OnInit, AfterViewInit {
  eventId: number
  categories: any[] = []
  selectedCategoryId: number | null = null
  quantity = 1
  buyerEmail = ""
  paymentMethod = "STRIPE"
  totalAmount = 0
  maxQuantity = 0
  isLoading = false
  errorMessage = ""
  successMessage = ""
  currency = "eur"
  cardElement: any

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly paymentService: PaymentService,
    private readonly stripeService: StripeService,
    private readonly ticketService: TicketService,
  ) {}

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get("eventId"))
    this.loadCategories()
  }

  async ngAfterViewInit() {
    if (this.paymentMethod === "STRIPE") {
      await this.loadStripeElement()
    }
  }
  async loadStripeElement() {
    try {
      this.cardElement = await this.stripeService.createCardElement("card-element")
    } catch (error) {
      console.error("Stripe initialization failed:", error)
      this.errorMessage = "Unable to load card form. Please refresh."
    }
  }

  // Optional: reinitialize when user switches payment method
  ngOnChanges() {
    if (this.paymentMethod === "STRIPE" && !this.cardElement) {
      setTimeout(() => this.loadStripeElement(), 100)
    }
  }

  loadCategories() {
    this.ticketService
      .getCategoriesByEvent(this.eventId)
      .then((data) => {
        this.categories = data
      })
      .catch((err) => {
        this.errorMessage = "Failed to load ticket categories"
        console.error(err)
      })
  }

  getSelectedCategory() {
    return this.categories.find((c) => c.id === this.selectedCategoryId)
  }

  isFormValid(): boolean {
    return this.selectedCategoryId !== null && this.quantity > 0 && this.buyerEmail.trim() !== ""
  }

  calculateTotal() {
    const selected = this.getSelectedCategory()
    if (selected) {
      this.totalAmount = selected.price * this.quantity
      this.maxQuantity = selected.availableQuota
    }
  }

  initiatePayment() {
    if (!this.isFormValid()) {
      this.errorMessage = "Please fill all required fields"
      return
    }

    this.isLoading = true
    this.errorMessage = ""
    this.successMessage = ""

    const paymentData = {
      ticketCategoryId: Number(this.selectedCategoryId),
      quantity: this.quantity,
      paymentMethod: this.paymentMethod,
      buyerEmail: this.buyerEmail,
      amount: Math.round(this.totalAmount * 100), // Amount in cents
      currency: this.currency,
    }

    this.paymentService.createPayment(paymentData).subscribe({
      next: (response) => {
        console.log("Payment intent created:", response)
        if (this.paymentMethod === "STRIPE") {
          this.handleStripePayment(response)
        } else if (this.paymentMethod === "PAYPAL") {
          this.handlePayPalPayment(response)
        } else if (this.paymentMethod === "FLOUCI") {
          this.handleFlouciPayment(response)
        }
      },
      error: (err) => {
        this.isLoading = false
        this.errorMessage = err?.error?.message || err?.error || err?.message || "Payment creation failed"
        console.error("Payment create error", err)
      },
    })
  }

  async handleStripePayment(paymentData: any) {
    try {
      if (!this.cardElement) {
        throw new Error("Card element is not initialized")
      }

      // Use the card element that has been stored
      const paymentMethod = await this.stripeService.createPaymentMethod()

      // Confirm payment with Stripe
      const result = await this.stripeService.confirmPayment(paymentData.clientSecret)

      if (result.status === "succeeded") {
        this.successMessage = "✓ Payment successful! Your tickets will be sent to your email."
        setTimeout(() => {
          this.router.navigate(["/events", this.eventId])
        }, 1500)
      } else {
        this.errorMessage = "Payment failed"
      }
    } catch (error: any) {
      this.isLoading = false
      this.errorMessage = this.stripeService.getErrorMessage(error)
      console.error("Stripe payment error:", error)
    }
  }

  handlePayPalPayment(paymentData: any) {
    alert("Redirecting to PayPal...")
    this.confirmPayment(paymentData.paymentIntentId)
  }

  handleFlouciPayment(paymentData: any) {
    alert("Redirecting to Flouci...")
    this.confirmPayment(paymentData.paymentIntentId)
  }

  confirmPayment(paymentIntentId: string) {
    this.paymentService.confirmPayment(paymentIntentId).subscribe({
      next: (response) => {
        this.isLoading = false
        if (response.success) {
          this.successMessage = "✓ Payment successful! Your tickets will be sent to your email."
          setTimeout(() => {
            this.router.navigate(["/events", this.eventId])
          }, 1500)
        } else {
          this.errorMessage = "Payment failed"
        }
      },
      error: (err) => {
        this.isLoading = false
        this.errorMessage = err?.error?.message || err?.error || "Payment confirmation failed"
        console.error("Payment confirm error", err)
      },
    })
  }

  goBack() {
    this.router.navigate(["/events", this.eventId])
  }
}
