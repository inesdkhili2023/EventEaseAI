import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../services/payment.service';

interface PaymentRecord {
  id: number;
  transactionId: string;
  amount: number;
  status: string;
  paymentDate: string;
  paymentMethod: string;
}

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h2>Payment History</h2>

      <div *ngIf="isLoading" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>

      <div *ngIf="payments.length === 0 && !isLoading" class="alert alert-info">
        No payments found for this event.
      </div>

      <div class="table-responsive" *ngIf="payments.length > 0">
        <table class="table table-striped table-hover">
          <thead class="table-dark">
            <tr>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let payment of payments">
              <td><code>{{ payment.transactionId }}</code></td>
              <td>{{ payment.amount }} TND</td>
              <td>
                <span class="badge bg-info">{{ payment.paymentMethod }}</span>
              </td>
              <td>
                <span [class]="'badge ' + (payment.status === 'SUCCESS' ? 'bg-success' : 'bg-danger')">
                  {{ payment.status }}
                </span>
              </td>
              <td>{{ formatDate(payment.paymentDate) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class PaymentHistoryComponent implements OnInit {
  eventId: number;
  payments: PaymentRecord[] = [];
  isLoading: boolean = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    this.loadPaymentHistory();
  }

  loadPaymentHistory() {
    this.paymentService.getPaymentHistory(this.eventId).subscribe({
      next: (response: any) => {
        this.payments = response?.data ?? response ?? [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading payments:', err);
        this.isLoading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US');
  }
}


