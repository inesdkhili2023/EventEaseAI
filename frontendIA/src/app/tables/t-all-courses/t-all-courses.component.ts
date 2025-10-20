import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TAllComponent } from './t-all/t-all.component';
import { TInProgressComponent } from './t-in-progress/t-in-progress.component';
import { TFinishedComponent } from './t-finished/t-finished.component';
import { TPassedComponent } from './t-passed/t-passed.component';
import { TFailedComponent } from './t-failed/t-failed.component';

@Component({
    selector: 'app-t-all-courses',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTabsModule, TAllComponent, TInProgressComponent, TFinishedComponent, TPassedComponent, TFailedComponent],
    templateUrl: './t-all-courses.component.html',
    styleUrl: './t-all-courses.component.scss'
})
export class TAllCoursesComponent {}