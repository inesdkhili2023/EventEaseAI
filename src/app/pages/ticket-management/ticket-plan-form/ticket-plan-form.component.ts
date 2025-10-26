import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-wrapper">
      <div class="form-container">
        <div class="form-header">
          <h1 class="form-title">{{ isEdit ? 'Edit Ticket Category' : 'Create New Ticket Category' }}</h1>
          <p class="form-subtitle">{{ isEdit ? 'Update category details' : 'Add a new ticket category to your event' }}</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="form-content">
          <div class="form-group">
            <label for="categoryName" class="form-label">Category Name</label>
            <input 
              id="categoryName"
              type="text" 
              class="form-input" 
              [(ngModel)]="form.categoryName"
              name="categoryName"
              placeholder="e.g., VIP, Standard, Economy"
              required>
            <span class="form-hint">Enter a descriptive name for this ticket category</span>
          </div>

          <div class="form-group">
            <label for="price" class="form-label">Price (TND)</label>
            <div class="input-wrapper">
              <span class="currency-symbol">TND</span>
              <input 
                id="price"
                type="number" 
                class="form-input" 
                [(ngModel)]="form.price"
                name="price"
                placeholder="0.00"
                min="0"
                step="0.01"
                required>
            </div>
            <span class="form-hint">Set the ticket price in Tunisian Dinars</span>
          </div>

          <div class="form-group">
            <label for="totalQuota" class="form-label">Total Quota</label>
            <input 
              id="totalQuota"
              type="number" 
              class="form-input" 
              [(ngModel)]="form.totalQuota"
              name="totalQuota"
              placeholder="e.g., 100"
              min="1"
              required>
            <span class="form-hint">Maximum number of tickets available for this category</span>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">
              <span class="btn-icon">✓</span>
              {{ isEdit ? 'Update Category' : 'Create Category' }}
            </button>
            <button type="button" class="btn btn-secondary" (click)="goBack()">
              <span class="btn-icon">✕</span>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
    :host {
      display: block;
      background: linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 100%);
      min-height: 100vh;
      padding: 2rem 1rem;
    }

    .form-wrapper {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
    }

    .form-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 20px rgba(0, 0, 0, 0.05);
      width: 100%;
      max-width: 500px;
      padding: 2.5rem;
      border: 1px solid #e8ecf1;
    }

    .form-header {
      margin-bottom: 2rem;
      text-align: center;
    }

    .form-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #0f4ca5;
      margin: 0 0 0.5rem 0;
      letter-spacing: -0.5px;
    }

    .form-subtitle {
      font-size: 0.95rem;
      color: #6b7280;
      margin: 0;
      line-height: 1.5;
    }

    .form-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-label {
      font-size: 0.95rem;
      font-weight: 600;
      color: #1f2937;
      display: block;
    }

    .form-input {
      padding: 0.75rem 1rem;
      border: 1.5px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
      transition: all 0.2s ease;
      background: #f9fafb;
    }

    .form-input:focus {
      outline: none;
      border-color: #0f4ca5;
      background: white;
      box-shadow: 0 0 0 3px rgba(15, 76, 165, 0.1);
    }

    .form-input::placeholder {
      color: #9ca3af;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .currency-symbol {
      position: absolute;
      left: 1rem;
      font-weight: 600;
      color: #6b7280;
      font-size: 0.9rem;
    }

    .input-wrapper .form-input {
      padding-left: 3rem;
    }

    .form-hint {
      font-size: 0.85rem;
      color: #9ca3af;
      line-height: 1.4;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .btn {
      padding: 0.875rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      flex: 1;
      font-family: inherit;
    }

    .btn-primary {
      background: linear-gradient(135deg, #0f4ca5 0%, #0d3a7f 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(15, 76, 165, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(15, 76, 165, 0.4);
    }

    .btn-primary:active {
      transform: translateY(0);
    }

    .btn-secondary {
      background: #f3f4f6;
      color: #374151;
      border: 1.5px solid #e5e7eb;
    }

    .btn-secondary:hover {
      background: #e5e7eb;
      border-color: #d1d5db;
    }

    .btn-icon {
      font-size: 1.1rem;
      font-weight: 700;
    }

    @media (max-width: 640px) {
      .form-container {
        padding: 1.5rem;
      }

      .form-title {
        font-size: 1.5rem;
      }

      .form-actions {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }
    }
  `,
  ],
})
export class TicketFormComponent implements OnInit {
  eventId: number;
  categoryId: number | null = null;
  isEdit = false;
  form = {
    categoryName: '',
    price: 0,
    totalQuota: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    const id = this.route.snapshot.paramMap.get('categoryId');
    
    if (id) {
      this.isEdit = true;
      this.categoryId = Number(id);
    }
  }

  onSubmit() {
    if (this.isEdit && this.categoryId) {
      this.ticketService.updateCategory(this.categoryId, this.form)
        .then(() => {
          alert('Category updated successfully');
          this.goBack();
        })
        .catch(err => alert('Error updating category: ' + err.message));
    } else {
      this.ticketService.createCategory(this.eventId, this.form)
        .then(() => {
          alert('Category created successfully');
          this.goBack();
        })
        .catch(err => alert('Error creating category: ' + err.message));
    }
  }

  goBack() {
    this.router.navigate(['/events', this.eventId, 'tickets']);
  }
}