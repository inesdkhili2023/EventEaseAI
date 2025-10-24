import { Component } from '@angular/core';
import { WorkingScheduleComponent } from './working-schedule/working-schedule.component';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [WorkingScheduleComponent, RouterLink, MatCardModule, FullCalendarModule],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

    // Calendar
    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        dayMaxEvents: true, // when too many events in a day, show the popover
        weekends: true,
        events: [
            {
                title: 'Meeting with Developers',
                date: '2024-05-02'
            },
            {
                title: 'Consultation with Employees',
                date: '2024-05-06'
            },
            {
                title: 'Call for payment Project NOK',
                date: '2024-05-16'
            },
            {
                title: 'Meeting with UI/UX Designers',
                date: '2024-05-28'
            },
            {
                title: 'Meeting with Developers',
                date: '2024-06-02'
            },
            {
                title: 'Consultation with Employees',
                date: '2024-06-06'
            },
            {
                title: 'Call for payment Project NOK',
                date: '2024-06-16'
            },
            {
                title: 'Meeting with UI/UX Designers',
                date: '2024-06-28'
            },
            {
                title: 'Meeting with Developers',
                date: '2024-07-02'
            },
            {
                title: 'Consultation with Employees',
                date: '2024-07-06'
            },
            {
                title: 'Call for payment Project NOK',
                date: '2024-07-16'
            },
            {
                title: 'Meeting with UI/UX Designers',
                date: '2024-07-28'
            },
            {
                title: 'Meeting with Developers',
                date: '2024-08-02'
            },
            {
                title: 'Consultation with Employees',
                date: '2024-08-06'
            },
            {
                title: 'Call for payment Project NOK',
                date: '2024-08-16'
            },
            {
                title: 'Meeting with UI/UX Designers',
                date: '2024-08-28'
            },
            {
                title: 'Meeting with Developers',
                date: '2024-09-02'
            },
            {
                title: 'Consultation with Employees',
                date: '2024-09-06'
            },
            {
                title: 'Call for payment Project NOK',
                date: '2024-09-16'
            },
            {
                title: 'Meeting with UI/UX Designers',
                date: '2024-09-28'
            },
            {
                title: 'Meeting with Developers',
                date: '2024-10-02'
            },
            {
                title: 'Consultation with Employees',
                date: '2024-10-06'
            },
            {
                title: 'Call for payment Project NOK',
                date: '2024-10-16'
            },
            {
                title: 'Meeting with UI/UX Designers',
                date: '2024-10-28'
            }
        ],
        plugins: [dayGridPlugin]
    };

}