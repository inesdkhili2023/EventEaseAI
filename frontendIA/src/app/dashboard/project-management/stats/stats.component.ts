import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { EventService } from '../../../services/event.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {DecimalPipe} from '@angular/common';
@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [RouterLink, MatCardModule, FeathericonsModule,DecimalPipe, HttpClientModule, CommonModule ],
    templateUrl: './stats.component.html',
    styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit {
 totalEvents = 0;
  upcomingEvents = 0;
  pastEvents = 0;
  fraudulentEvents = 0;
  averagePrice = 0;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      this.totalEvents = events.length;

      const now = new Date();
      this.upcomingEvents = events.filter(e => new Date(e.startDate) > now).length;
      this.pastEvents = events.filter(e => new Date(e.endDate) < now).length;

      this.averagePrice =
        events.reduce((sum, e) => sum + e.price, 0) / (events.length || 1);

      // Exemple de fraude : score > 0.7
      this.fraudulentEvents = events.filter(e => e.fraud_score && e.fraud_score > 0.7).length;
    });
  }
}