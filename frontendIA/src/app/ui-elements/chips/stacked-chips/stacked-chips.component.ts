import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

export interface ChipColor {
    name: string;
    color: ThemePalette;
}

@Component({
    selector: 'app-stacked-chips',
    standalone: true,
    imports: [MatChipsModule, MatCardModule],
    templateUrl: './stacked-chips.component.html',
    styleUrl: './stacked-chips.component.scss'
})
export class StackedChipsComponent {

    // Stacked Chips
    availableColors: ChipColor[] = [
        {name: 'none', color: undefined},
        {name: 'Primary', color: 'primary'},
        {name: 'Accent', color: 'accent'},
        {name: 'Warn', color: 'warn'},
    ];

}