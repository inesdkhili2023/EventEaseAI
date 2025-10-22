import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { stripeConfig } from '../../environments/environment.stripe';

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  error?: string;
}




export interface StripeConfig {
  publishableKey: string;
  webhookSecret: string;
  currency: string;
  country: string;
}

export interface Payment {
  ticketCategoryId: number;
  quantity: number;
  paymentMethod: string;
  buyerEmail: string;
  amount: number; // amount in cents
  currency: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
   private readonly API_BASE_URL = 'http://localhost:8090/api/payments';
  private readonly paymentStatusSubject = new BehaviorSubject<string>('idle');
  public paymentStatus$ = this.paymentStatusSubject.asObservable();
  private stripeConfig: StripeConfig | null = null;
  constructor(private readonly http: HttpClient) {
    this.loadStripeConfig();
  }

  private loadStripeConfig(): void {
    // Load from environment configuration
    this.stripeConfig = {
      publishableKey: stripeConfig.publishableKey,
      webhookSecret: stripeConfig.webhookSecret,
      currency: stripeConfig.currency,
      country: stripeConfig.country
    };
  }

 // Create payment intent
 createPayment(payment: Payment): Observable<PaymentIntent> {
  this.paymentStatusSubject.next('creating');
  
  const request = {
    ticketCategoryId: payment.ticketCategoryId,
    quantity: payment.quantity,
    buyerEmail: payment.buyerEmail,
    paymentMethod: payment.paymentMethod,
    amount: payment.amount, // Include amount in the request
    currency: payment.currency // Include currency in the request
  };

  console.log('Sending payment request:', request);
  return this.http.post<PaymentIntent>(`${this.API_BASE_URL}/create-intent`, request)
    .pipe(
      tap(() => this.paymentStatusSubject.next('created')),
      map(response => response)
    );
}

// Confirm payment
confirmPayment(paymentIntentId: string): Observable<PaymentResult> {
  this.paymentStatusSubject.next('confirming');
  
  return this.http.post<PaymentResult>(`${this.API_BASE_URL}/confirm`, { paymentIntentId })
    .pipe(
      tap(result => {
        this.paymentStatusSubject.next(result.success ? 'completed' : 'failed');
      })
    );
}

 

  // Get payment status
  getPaymentStatus(paymentIntentId: string): Observable<{ status: string; amount: number }> {
    return this.http.get<{ status: string; amount: number }>(`${this.API_BASE_URL}/status/${paymentIntentId}`);
  }

  // Get payment history
  getPaymentHistory(eventId: number): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/event/${eventId}`);
  }

  // Get user tickets
  getUserTickets(email: string): Observable<any> {
    return this.http.get(`http://localhost:8090/api/tickets/user/${email}`);
  }

  // Get supported payment methods
  getSupportedPaymentMethods(): string[] {
    return [
      'card',
      'bank_transfer',
      'mobile_money' // For Tunisian market
    ];
  }

  // Currency formatting
  formatCurrency(amount: number, currency: string = 'TND'): string {
    const formatter = new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    });
    return formatter.format(amount);
  }

  // Validation methods
  validatePaymentAmount(amount: number): boolean {
    return amount > 0 && amount <= 1000000; // Max 1M TND
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Error handling
  getErrorMessage(error: any): string {
    if (error.code) {
      switch (error.code) {
        case 'card_declined':
          return 'Votre carte a été refusée. Veuillez essayer une autre carte.';
        case 'expired_card':
          return 'Votre carte a expiré. Veuillez utiliser une autre carte.';
        case 'insufficient_funds':
          return 'Fonds insuffisants. Veuillez vérifier votre solde.';
        case 'processing_error':
          return 'Erreur de traitement. Veuillez réessayer.';
        default:
          return 'Une erreur est survenue lors du paiement. Veuillez réessayer.';
      }
    }
    return error.message || 'Une erreur inattendue est survenue.';
  }

  // Security method
  sanitizeInput(input: string): string {
    return input.replaceAll(/[<>]/g, '');
  }

  // Get Stripe configuration
  getStripeConfig(): StripeConfig | null {
    return this.stripeConfig;
  }
}