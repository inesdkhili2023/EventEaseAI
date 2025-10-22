import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private cardElement: any;

  constructor() {
    this.getStripe();
  }

  private async getStripe(): Promise<Stripe> {
    if (!this.stripe) {
    this.stripe = await loadStripe('pk_test_51SL22pIg8S0OpQmZFVJ7fH9h0VJ90FvxtcZxAN7f3ekYWXGZ5a3PPsXSQzwmMcthc2J736MNFiL1FFLIlhKUo9Es00IHGOLiaD'); // Use your test publishable key
  }
  return this.stripe!;
}

async createCardElement(elementId: string) {
  const stripe = await this.getStripe();
  const elements = stripe.elements();
  this.cardElement = elements.create('card');
  this.cardElement.mount(`#${elementId}`);
  return this.cardElement;
}

async createPaymentMethod() {
  if (!this.stripe || !this.cardElement) throw new Error('Stripe not initialized');
  const { paymentMethod, error } = await this.stripe.createPaymentMethod({
    type: 'card',
    card: this.cardElement
  });
  if (error) throw error;
  return paymentMethod;
}

async confirmPayment(clientSecret: string) {
  const stripe = await this.getStripe();
  const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: this.cardElement,
    },
  });
  if (error) {
    console.error("Stripe payment error:", error);
    throw error;
  }
  console.log("Payment successful:", paymentIntent);
  return paymentIntent;
}

getErrorMessage(error: any): string {
  return error.message || 'An unknown error occurred during payment.';
}
}