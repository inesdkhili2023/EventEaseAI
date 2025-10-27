import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { TasksPerformanceComponent } from './tasks-performance/tasks-performance.component';

@Component({
    selector: 'app-pm-tasks',
    standalone: true,
    imports: [MyTasksComponent, TasksPerformanceComponent, RouterLink, MatCardModule, MatButtonModule, FeathericonsModule],
    templateUrl: './pm-tasks.component.html',
    styleUrl: './pm-tasks.component.scss'
})
export class PmTasksComponent {}