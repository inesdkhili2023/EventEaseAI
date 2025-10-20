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
    selector: 'app-all-courses',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTabsModule, AllComponent, InProgressComponent, FinishedComponent, PassedComponent, FailedComponent],
    templateUrl: './all-courses.component.html',
    styleUrl: './all-courses.component.scss'
})
export class AllCoursesComponent {}