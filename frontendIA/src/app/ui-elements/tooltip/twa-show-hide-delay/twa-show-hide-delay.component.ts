import { Component } from '@angular/core';
import {
    MAT_TOOLTIP_DEFAULT_OPTIONS,
    MatTooltipDefaultOptions,
    MatTooltipModule,
} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 1000,
    hideDelay: 1000,
    touchendHideDelay: 1000,
};

@Component({
    selector: 'app-twa-show-hide-delay',
    standalone: true,
    imports: [MatButtonModule, MatTooltipModule],
    templateUrl: './twa-show-hide-delay.component.html',
    styleUrl: './twa-show-hide-delay.component.scss',
    providers: [{provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}],
})
export class TwaShowHideDelayComponent {}