import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventHoveringArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { WorkingScheduleDriverComponent } from './working-schedule-driver/working-schedule-driver.component';
import { DriverAvailabilityService, DriverAvailability } from '../../services/driver-availability.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-driver',
  standalone: true,
  imports: [
    WorkingScheduleDriverComponent, 
    RouterLink, 
    MatCardModule, 
    FullCalendarModule,
    CommonModule
  ],
  templateUrl: './calendar-driver.component.html',
  styleUrls: ['./calendar-driver.component.scss']
})
export class CalendarDriverComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dayMaxEvents: true,
    weekends: true,
    events: [],
    // 👇 Tooltip personnalisé au survol
    eventMouseEnter: this.handleEventHover.bind(this),
    eventMouseLeave: this.handleEventLeave.bind(this),
    // 👇 Personnalisation des couleurs
    eventColor: '#4CAF50',
    eventTextColor: '#ffffff',
    // 👇 Header avec navigation
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    // 👇 Hauteur fixe
    height: 'auto',
    contentHeight: 'auto',
    // 👇 Amélioration de l'apparence des événements
    eventDisplay: 'block',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }
  };

  allAvailabilities: DriverAvailability[] = [];

  constructor(private availabilityService: DriverAvailabilityService) {}

  ngOnInit(): void {
    this.loadAvailabilities();
  }

  loadAvailabilities() {
    this.availabilityService.getAllAvailabilities().subscribe({
      next: (data: DriverAvailability[]) => {
        this.allAvailabilities = data;
        this.updateCalendarEvents();
      },
      error: (err) => console.error('Erreur chargement disponibilités:', err)
    });
  }

  private updateCalendarEvents() {
    const groupedByDate: { [date: string]: DriverAvailability[] } = {};

    // Grouper les disponibilités par date
    this.allAvailabilities.forEach(a => {
      if (!groupedByDate[a.date]) {
        groupedByDate[a.date] = [];
      }
      groupedByDate[a.date].push(a);
    });

    // Transformer en événements FullCalendar
    const events = Object.entries(groupedByDate).map(([date, availabilities]) => {
      const driverCount = availabilities.length;
      const availableDrivers = availabilities.filter(a => a.available).length;

      return {
        id: `avail-${date}`,
        title: `${driverCount} chauffeur(s)`,
        start: date,
        color: this.getEventColor(driverCount),
        extendedProps: {
          drivers: availabilities,
          tooltipContent: this.generateTooltipContent(availabilities),
          availableCount: availableDrivers,
          totalCount: driverCount
        },
        classNames: ['availability-event', `availability-${driverCount}`],
        display: 'block'
      };
    });

    this.calendarOptions.events = events;
  }

  private generateTooltipContent(availabilities: DriverAvailability[]): string {
    if (!availabilities.length) return '';

    const availableCount = availabilities.filter(a => a.available).length;
    const totalCount = availabilities.length;

    const driversHTML = availabilities
      .map(av => `
        <div class="driver-info ${av.available ? 'available' : 'unavailable'}">
          <div class="driver-header">
            <span class="driver-icon">🚗</span>
            <strong class="driver-name">${av.driverName || 'Chauffeur'}</strong>
            ${av.available ? 
              '<span class="status-badge available">🟢 Disponible</span>' : 
              '<span class="status-badge unavailable">🔴 Indisponible</span>'
            }
          </div>
          <div class="time-slot">
            <span class="time-icon">⏰</span>
            ${av.startTime} - ${av.endTime}
          </div>
        </div>
      `)
      .join('');

    return `
      <div class="availability-tooltip">
        <div class="tooltip-header">
          <h4>📅 ${this.formatDate(availabilities[0].date)}</h4>
          <div class="availability-summary">
            <span class="summary-badge available">${availableCount} disponible(s)</span>
            <span class="summary-badge total">${totalCount} total</span>
          </div>
        </div>
        <div class="drivers-list">
          ${driversHTML}
        </div>
      </div>
    `;
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  private getEventColor(driverCount: number): string {
    if (driverCount >= 5) return '#2E7D32'; // Vert foncé
    if (driverCount >= 3) return '#4CAF50'; // Vert moyen
    if (driverCount >= 1) return '#81C784'; // Vert clair
    return '#C8E6C9'; // Vert très clair
  }

  handleEventHover(mouseEnterInfo: EventHoveringArg) {
    const event = mouseEnterInfo.event;
    const extendedProps = event.extendedProps;
    
    this.createCustomTooltip(mouseEnterInfo.jsEvent, extendedProps['tooltipContent']);
  }

  handleEventLeave(mouseLeaveInfo: EventHoveringArg) {
    this.removeCustomTooltip();
  }

  private createCustomTooltip(mouseEvent: MouseEvent, content: string) {
    this.removeCustomTooltip();

    const tooltip = document.createElement('div');
    tooltip.className = 'custom-calendar-tooltip';
    tooltip.innerHTML = content;

    tooltip.style.position = 'fixed';
    tooltip.style.left = (mouseEvent.pageX + 15) + 'px';
    tooltip.style.top = (mouseEvent.pageY + 15) + 'px';
    tooltip.style.zIndex = '10000';

    document.body.appendChild(tooltip);
  }

  private removeCustomTooltip() {
    const existingTooltip = document.querySelector('.custom-calendar-tooltip');
    if (existingTooltip) {
      existingTooltip.remove();
    }
  }
}