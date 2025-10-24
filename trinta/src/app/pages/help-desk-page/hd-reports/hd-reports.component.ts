import { Component } from '@angular/core';
import { AgentsPerformanceComponent } from './agents-performance/agents-performance.component';
import { TicketsStatusComponent } from './tickets-status/tickets-status.component';
import { AvgResponseTimeComponent } from './avg-response-time/avg-response-time.component';

@Component({
    selector: 'app-hd-reports',
    standalone: true,
    imports: [AgentsPerformanceComponent, TicketsStatusComponent, AvgResponseTimeComponent],
    templateUrl: './hd-reports.component.html',
    styleUrl: './hd-reports.component.scss'
})
export class HdReportsComponent {}