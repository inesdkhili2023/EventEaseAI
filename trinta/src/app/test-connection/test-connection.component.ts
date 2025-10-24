import { Component } from '@angular/core';
import { EventFeaturesService } from '../services/event-features.service';

@Component({
  selector: 'app-test-connection',
  template: `
    <div>
      <h2>Test de connexion Supabase</h2>
      <button (click)="testConnection()">Tester la connexion</button>
      <div *ngIf="result">{{ result | json }}</div>
    </div>
  `
})
export class TestConnectionComponent {
  result: any = null;

  constructor(private eventService: EventFeaturesService) {}

  async testConnection() {
    try {
      console.log('Test de connexion...');
      const eventIds = await this.eventService.getAvailableEventIds();
      this.result = { success: true, eventIds, count: eventIds.length };
      console.log('Succès:', this.result);
    } catch (error) {
      this.result = { success: false, error: error };
      console.error('Erreur:', error);
    }
  }
}