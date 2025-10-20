import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-slider',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatSliderModule],
    templateUrl: './slider.component.html',
    styleUrl: './slider.component.scss'
})
export class SliderComponent {

    // Slider with custom thumb label formatting
    formatLabel(value: number): string {
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }
        return `${value}`;
    }

}