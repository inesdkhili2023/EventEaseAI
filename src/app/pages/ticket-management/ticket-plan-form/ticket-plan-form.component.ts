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
    <div class="container mt-5">
      <h2>{{ isEdit ? 'Edit' : 'Create' }} Ticket Category</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group mb-3">
          <label>Category Name</label>
          <input 
            type="text" 
            class="form-control" 
            [(ngModel)]="form.categoryName"
            name="categoryName"
            required>
        </div>

        <div class="form-group mb-3">
          <label>Price (TND)</label>
          <input 
            type="number" 
            class="form-control" 
            [(ngModel)]="form.price"
            name="price"
            required>
        </div>

        <div class="form-group mb-3">
          <label>Total Quota</label>
          <input 
            type="number" 
            class="form-control" 
            [(ngModel)]="form.totalQuota"
            name="totalQuota"
            required>
        </div>

        <button type="submit" class="btn btn-primary">
          {{ isEdit ? 'Update' : 'Create' }}
        </button>
        <button type="button" class="btn btn-secondary ms-2" (click)="goBack()">
          Cancel
        </button>
      </form>
    </div>
  `
})
export class TicketFormComponent implements OnInit {
  eventId: number;
  categoryId: number | null = null;
  isEdit = false;
  form: { categoryName: string; price: number; totalQuota: number } = {
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