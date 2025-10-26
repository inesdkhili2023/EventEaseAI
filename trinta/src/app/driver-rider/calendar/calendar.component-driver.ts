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
    eventColor: '#4CAF50', // Vert pour les disponibilités
    eventTextColor: '#ffffff',
    // 👇 Header avec navigation
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    // 👇 Hauteur fixe
    height: 'auto',
    contentHeight: 'auto'
  };

  // Pour stocker les données brutes
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
      const driversList = availabilities
        .map(av => `🚗 ${av.driverName || 'Chauffeur'} (${av.startTime} - ${av.endTime})`)
        .join('\n');

      return {
        id: `avail-${date}`,
        title: `${driverCount} chauffeur(s)`,
        start: date,
        color: this.getEventColor(driverCount),
        extendedProps: {
          drivers: availabilities,
          tooltipContent: this.generateTooltipContent(availabilities)
        },
        // 👇 Style personnalisé
        classNames: ['availability-event'],
        display: 'block'
      };
    });

    this.calendarOptions.events = events;
  }

  // 👇 Générer le contenu du tooltip
  private generateTooltipContent(availabilities: DriverAvailability[]): string {
    if (!availabilities.length) return '';

    const driversHTML = availabilities
      .map(av => `
        <div class="driver-info">
          <strong>${av.driverName || 'Chauffeur'}</strong>
          <div class="time-slot">${av.startTime} - ${av.endTime}</div>
          ${av.available ? '<span class="status available">🟢 Disponible</span>' : '<span class="status unavailable">🔴 Indisponible</span>'}
        </div>
      `)
      .join('');

    return `
      <div class="availability-tooltip">
        <h4>📅 ${availabilities[0].date}</h4>
        <div class="drivers-list">
          ${driversHTML}
        </div>
      </div>
    `;
  }

  // 👇 Gérer la couleur en fonction du nombre de chauffeurs
  private getEventColor(driverCount: number): string {
    if (driverCount >= 5) return '#2E7D32'; // Vert foncé
    if (driverCount >= 3) return '#4CAF50'; // Vert moyen
    if (driverCount >= 1) return '#81C784'; // Vert clair
    return '#C8E6C9'; // Vert très clair
  }

  // 👇 Gestion du survol de la souris
  handleEventHover(mouseEnterInfo: EventHoveringArg) {
    const event = mouseEnterInfo.event;
    const extendedProps = event.extendedProps;
    
    // Créer le tooltip personnalisé
    this.createCustomTooltip(mouseEnterInfo.jsEvent, extendedProps['tooltipContent']);
  }

  handleEventLeave(mouseLeaveInfo: EventHoveringArg) {
    this.removeCustomTooltip();
  }

  // 👇 Créer un tooltip personnalisé
  private createCustomTooltip(mouseEvent: MouseEvent, content: string) {
    this.removeCustomTooltip();

    const tooltip = document.createElement('div');
    tooltip.className = 'custom-calendar-tooltip';
    tooltip.innerHTML = content;

    // Positionner le tooltip près du curseur
    tooltip.style.position = 'fixed';
    tooltip.style.left = (mouseEvent.pageX + 10) + 'px';
    tooltip.style.top = (mouseEvent.pageY + 10) + 'px';
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