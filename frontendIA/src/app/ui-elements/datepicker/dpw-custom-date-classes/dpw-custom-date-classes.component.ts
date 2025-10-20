import { Component, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-dpw-custom-date-classes',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, FeathericonsModule],
    templateUrl: './dpw-custom-date-classes.component.html',
    styleUrl: './dpw-custom-date-classes.component.scss'
})
export class DpwCustomDateClassesComponent {

    // Datepicker with Custom Date Classes
    dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
        // Only highligh dates inside the month view.
        if (view === 'month') {
            const date = cellDate.getDate();

            // Highlight the 1st and 20th day of each month.
            return date === 1 || date === 20 ? 'active-custom-date' : '';
        }
        return '';
    };

}