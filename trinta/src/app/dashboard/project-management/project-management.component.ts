import { Component } from '@angular/core';
import { StatsComponent } from './stats/stats.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { IssuesSummaryComponent } from './issues-summary/issues-summary.component';
import { TasksPerformanceComponent } from './tasks-performance/tasks-performance.component';
import { TasksOverviewComponent } from './tasks-overview/tasks-overview.component';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
    selector: 'app-project-management',
    standalone: true,
    imports: [StatsComponent, AllProjectsComponent, ToDoListComponent, IssuesSummaryComponent, TasksPerformanceComponent, TasksOverviewComponent, CalendarComponent],
    templateUrl: './project-management.component.html',
    styleUrl: './project-management.component.scss'
})
export class ProjectManagementComponent {}