import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasicDatepickerComponent } from './basic-datepicker/basic-datepicker.component';
import { DrpComparisonRangesComponent } from './drp-comparison-ranges/drp-comparison-ranges.component';
import { DrpFormsIntegrationComponent } from './drp-forms-integration/drp-forms-integration.component';
import { DrpwcaSelectionStrategyComponent } from './drpwca-selection-strategy/drpwca-selection-strategy.component';
import { DatepickerActionButtonsComponent } from './datepicker-action-buttons/datepicker-action-buttons.component';
import { DatepickerOpenMethodComponent } from './datepicker-open-method/datepicker-open-method.component';
import { DpPaletterColorsComponent } from './dp-paletter-colors/dp-paletter-colors.component';
import { DpwCustomIconComponent } from './dpw-custom-icon/dpw-custom-icon.component';
import { DpwCustomDateClassesComponent } from './dpw-custom-date-classes/dpw-custom-date-classes.component';
import { DisabledDatepickerComponent } from './disabled-datepicker/disabled-datepicker.component';
import { DpwFilterValidationComponent } from './dpw-filter-validation/dpw-filter-validation.component';
import { DpwCustomFormatsComponent } from './dpw-custom-formats/dpw-custom-formats.component';
import { DpInlineCalendarComponent } from './dp-inline-calendar/dp-inline-calendar.component';
import { DpwDifferentLocaleComponent } from './dpw-different-locale/dpw-different-locale.component';
import { DpwMinMaxValidationComponent } from './dpw-min-max-validation/dpw-min-max-validation.component';
import { DptuMomentJsDatesComponent } from './dptu-moment-js-dates/dptu-moment-js-dates.component';
import { DpStartDateComponent } from './dp-start-date/dp-start-date.component';
import { DpTouchUiComponent } from './dp-touch-ui/dp-touch-ui.component';
import { DpSelectedValueComponent } from './dp-selected-value/dp-selected-value.component';
import { DpeaYearMonthPickerComponent } from './dpea-year-month-picker/dpea-year-month-picker.component';

@Component({
    selector: 'app-datepicker',
    standalone: true,
    imports: [RouterLink, BasicDatepickerComponent, DrpComparisonRangesComponent, DrpFormsIntegrationComponent, DrpwcaSelectionStrategyComponent, DatepickerActionButtonsComponent, DatepickerOpenMethodComponent, DpPaletterColorsComponent, DpwCustomIconComponent, DpwCustomDateClassesComponent, DisabledDatepickerComponent, DpwFilterValidationComponent, DpwCustomFormatsComponent, DpInlineCalendarComponent, DpwDifferentLocaleComponent, DpwMinMaxValidationComponent, DptuMomentJsDatesComponent, DpStartDateComponent, DpTouchUiComponent, DpSelectedValueComponent, DpeaYearMonthPickerComponent],
    templateUrl: './datepicker.component.html',
    styleUrl: './datepicker.component.scss'
})
export class DatepickerComponent {}