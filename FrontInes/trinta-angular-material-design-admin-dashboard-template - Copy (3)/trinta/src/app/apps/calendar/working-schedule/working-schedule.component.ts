import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-working-schedule',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule],
    templateUrl: './working-schedule.component.html',
    styleUrl: './working-schedule.component.scss'
})
export class WorkingScheduleComponent {

    // Mat Calendar
    selected: Date | null;

}