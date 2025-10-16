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
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

const moment = _rollupMoment || _moment;

@Component({
    selector: 'app-dptu-moment-js-dates',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatCardModule,
        FeathericonsModule
    ],
    templateUrl: './dptu-moment-js-dates.component.html',
    styleUrl: './dptu-moment-js-dates.component.scss',
    providers: [
        // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
        // to your app config. We provide it at the component level here, due to limitations
        // of our example generation script.
    ]
})
export class DptuMomentJsDatesComponent {

    // Datepicker takes `Moment` objects instead of `Date` objects.
    date = new FormControl(moment([2024, 0, 1]));

}