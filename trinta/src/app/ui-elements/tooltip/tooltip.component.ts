import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { TwaShowHideDelayComponent } from './twa-show-hide-delay/twa-show-hide-delay.component';

@Component({
    selector: 'app-tooltip',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatTooltipModule, MatButtonModule, TwaShowHideDelayComponent],
    templateUrl: './tooltip.component.html',
    styleUrl: './tooltip.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class TooltipComponent {}