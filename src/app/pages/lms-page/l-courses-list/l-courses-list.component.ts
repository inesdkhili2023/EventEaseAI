import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { AllComponent } from './all/all.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { FinishedComponent } from './finished/finished.component';
import { PassedComponent } from './passed/passed.component';
import { FailedComponent } from './failed/failed.component';

@Component({
    selector: 'app-l-courses-list',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTabsModule, AllComponent, InProgressComponent, FinishedComponent, PassedComponent, FailedComponent],
    templateUrl: './l-courses-list.component.html',
    styleUrl: './l-courses-list.component.scss'
})
export class LCoursesListComponent {}