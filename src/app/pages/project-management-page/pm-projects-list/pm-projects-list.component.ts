import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { AllComponent } from './all/all.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { CompletedComponent } from './completed/completed.component';
import { PendingComponent } from './pending/pending.component';

@Component({
    selector: 'app-pm-projects-list',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTabsModule, AllComponent, InProgressComponent, CompletedComponent, PendingComponent],
    templateUrl: './pm-projects-list.component.html',
    styleUrl: './pm-projects-list.component.scss'
})
export class PmProjectsListComponent {}