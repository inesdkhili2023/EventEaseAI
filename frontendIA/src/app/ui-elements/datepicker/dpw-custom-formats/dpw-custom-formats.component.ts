import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-dpw-custom-formats',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule, MatNativeDateModule, FeathericonsModule
    ],
    templateUrl: './dpw-custom-formats.component.html',
    styleUrl: './dpw-custom-formats.component.scss'
})
export class DpwCustomFormatsComponent {

    // Datepicker with Custom Formats
    date = new FormControl(moment());

}