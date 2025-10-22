import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { StripeService } from '../../../services/stripe.service';
import { TicketService } from '../../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h4 class="mb-0">Purchase Tickets</h4>
            </div>
            
            <div class="card-body">
              <!-- Category Selection -->
              <div class="form-group mb-4">
                <label class="fw-bold mb-2">Select Ticket Category</label>
                <select class="form-select" [(ngModel)]="selectedCategoryId" name="category">
                  <option value="">-- Choose Category --</option>
                  <option *ngFor="let cat of categories" [ngValue]="cat.id">
                    {{ cat.categoryName }} - {{ cat.price }} TND 
                    ({{ cat.availableQuota }} available)
                  </option>
                </select>
              </div>

              <!-- Quantity Selection -->
              <div class="form-group mb-4">
                <label class="fw-bold mb-2">Number of Tickets</label>
                <input 
                  type="number" 
                  class="form-control" 
                  [(ngModel)]="quantity"
                  name="quantity"
                  min="1"
                  [max]="maxQuantity"
                  (change)="calculateTotal()">
                <small class="text-muted">Max available: {{ maxQuantity }}</small>
              </div>

              <!-- Email -->
              <div class="form-group mb-4">
                <label class="fw-bold mb-2">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  [(ngModel)]="buyerEmail"
                  name="email"
                  required>
              </div>

              <!-- Total Amount -->
              <div class="alert alert-info">
                <h5>Total: <strong>{{ totalAmount.toFixed(2) }} {{ currency }}</strong></h5>
              </div>

              <!-- Payment Method -->
              <div class="form-group mb-4">
                <label class="fw-bold mb-2">Payment Method</label>
                <select class="form-select" [(ngModel)]="paymentMethod" name="method">
                  <option value="STRIPE">Stripe</option>
                  <option value="PAYPAL">PayPal</option>
                  <option value="FLOUCI">Flouci (Tunisie)</option>
                </select>
              </div>

             <!-- Stripe Card Element (shown only when Stripe is selected) -->
<div *ngIf="paymentMethod === 'STRIPE'" class="form-group mb-4">
  <label class="fw-bold mb-2">Card Details</label>
  <div id="card-element" class="form-control" style="height:60; padding:40px;">
    <!-- Stripe will inject card input here -->
  </div>
  <div id="card-errors" class="text-danger mt-2" role="alert"></div>
</div>

              <!-- Loading State -->
              <div *ngIf="isLoading" class="spinner-border text-primary mb-3" role="status">
                <span class="visually-hidden">Processing...</span>
              </div>

              <!-- Buttons -->
              <div class="d-grid gap-2">
                <button 
                  type="button" 
                  class="btn btn-success btn-lg"
                  (click)="initiatePayment()"
                  [disabled]="!isFormValid() || isLoading">
                  {{ isLoading ? 'Processing...' : 'Proceed to Payment' }}
                </button>
                <button 
                  type="button" 
                  class="btn btn-outline-secondary"
                  (click)="goBack()">
                  Cancel
                </button>
              </div>

              <!-- Error Message -->
              <div *ngIf="errorMessage" class="alert alert-danger mt-3">
                {{ errorMessage }}
              </div>

              <!-- Success Message -->
              <div *ngIf="successMessage" class="alert alert-success mt-3">
                {{ successMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      border: none;
    }
    .card-header {
      border-bottom: 3px solid #0d6efd;
    }
  `]
})
export class PaymentFormComponent implements OnInit, AfterViewInit {
  eventId: number;
  categories: any[] = [];
  selectedCategoryId: number | null = null;
  quantity: number = 1;
  buyerEmail: string = '';
  paymentMethod: string = 'STRIPE';
  totalAmount: number = 0;
  maxQuantity: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  currency: string = 'eur';
  cardElement: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly paymentService: PaymentService,
    private readonly stripeService: StripeService,
    private readonly ticketService: TicketService
  ) {}

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    this.loadCategories();
  }

  async ngAfterViewInit() {
    if (this.paymentMethod === 'STRIPE') {
      await this.loadStripeElement();
    }
  }
  async loadStripeElement() {
    try {
      this.cardElement = await this.stripeService.createCardElement('card-element');
    } catch (error) {
      console.error('Stripe initialization failed:', error);
      this.errorMessage = 'Unable to load card form. Please refresh.';
    }
  }
  
  // Optional: reinitialize when user switches payment method
  ngOnChanges() {
    if (this.paymentMethod === 'STRIPE' && !this.cardElement) {
      setTimeout(() => this.loadStripeElement(), 100);
    }
  }

  loadCategories() {
    this.ticketService.getCategoriesByEvent(this.eventId)
      .then(data => {
        this.categories = data;
      })
      .catch(err => {
        this.errorMessage = 'Failed to load ticket categories';
        console.error(err);
      });
  }

  isFormValid(): boolean {
    return this.selectedCategoryId !== null && 
           this.quantity > 0 && 
           this.buyerEmail.trim() !== '';
  }

  calculateTotal() {
    const selected = this.categories.find(c => c.id === this.selectedCategoryId);
    if (selected) {
      this.totalAmount = selected.price * this.quantity;
      this.maxQuantity = selected.availableQuota;
    }
  }

  initiatePayment() {
    if (!this.isFormValid()) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const paymentData = {
      ticketCategoryId: Number(this.selectedCategoryId),
      quantity: this.quantity,
      paymentMethod: this.paymentMethod,
      buyerEmail: this.buyerEmail,
      amount: Math.round(this.totalAmount * 100), // Amount in cents
      currency: this.currency
    };

    this.paymentService.createPayment(paymentData).subscribe({
      next: (response) => {
        console.log('Payment intent created:', response);
        if (this.paymentMethod === 'STRIPE') {
          this.handleStripePayment(response);
        } else if (this.paymentMethod === 'PAYPAL') {
          this.handlePayPalPayment(response);
        } else if (this.paymentMethod === 'FLOUCI') {
          this.handleFlouciPayment(response);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || err?.error || err?.message || 'Payment creation failed';
        console.error('Payment create error', err);
      }
    });
  }

  async handleStripePayment(paymentData: any) {
    try {
      if (!this.cardElement) {
        throw new Error('Card element is not initialized');
      }

      // Use the card element that has been stored
      const paymentMethod = await this.stripeService.createPaymentMethod();

      // Confirm payment with Stripe
      const result = await this.stripeService.confirmPayment(
        paymentData.clientSecret
      );

      if (result.status === 'succeeded') {
        this.successMessage = '✓ Payment successful! Your tickets will be sent to your email.';
        setTimeout(() => {
          this.router.navigate(['/events', this.eventId]);
        }, 1500);
      } else {
        this.errorMessage = 'Payment failed';
      }
    } catch (error: any) {
      this.isLoading = false;
      this.errorMessage = this.stripeService.getErrorMessage(error);
      console.error('Stripe payment error:', error);
    }
  }

  

  handlePayPalPayment(paymentData: any) {
    alert('Redirecting to PayPal...');
    this.confirmPayment(paymentData.paymentIntentId);
  }

  handleFlouciPayment(paymentData: any) {
    alert('Redirecting to Flouci...');
    this.confirmPayment(paymentData.paymentIntentId);
  }

  confirmPayment(paymentIntentId: string) {
    this.paymentService.confirmPayment(paymentIntentId).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.successMessage = '✓ Payment successful! Your tickets will be sent to your email.';
          setTimeout(() => {
            this.router.navigate(['/events', this.eventId]);
          }, 1500);
        } else {
          this.errorMessage = 'Payment failed';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || err?.error || 'Payment confirmation failed';
        console.error('Payment confirm error', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/events', this.eventId]);
  }
}