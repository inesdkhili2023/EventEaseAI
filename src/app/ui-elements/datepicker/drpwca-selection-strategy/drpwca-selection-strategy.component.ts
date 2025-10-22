import { Component, Injectable } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
    MatDateRangeSelectionStrategy,
    DateRange,
    MAT_DATE_RANGE_SELECTION_STRATEGY,
    MatDatepickerModule,
} from '@angular/material/datepicker';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
    constructor(private _dateAdapter: DateAdapter<D>) {}
    selectionFinished(date: D | null): DateRange<D> {
        return this._createFiveDayRange(date);
    }
    createPreview(activeDate: D | null): DateRange<D> {
        return this._createFiveDayRange(activeDate);
    }
    private _createFiveDayRange(date: D | null): DateRange<D> {
        if (date) {
            const start = this._dateAdapter.addCalendarDays(date, -2);
            const end = this._dateAdapter.addCalendarDays(date, 2);
            return new DateRange<D>(start, end);
        }
        return new DateRange<D>(null, null);
    }
}

@Component({
    selector: 'app-drpwca-selection-strategy',
    standalone: true,
    providers: [
        {
            provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
            useClass: FiveDayRangeSelectionStrategy,
        }
    ],
    imports: [MatCardModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, FeathericonsModule],
    templateUrl: './drpwca-selection-strategy.component.html',
    styleUrl: './drpwca-selection-strategy.component.scss'
})
export class DrpwcaSelectionStrategyComponent {}