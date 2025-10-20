import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { RouterLink } from '@angular/router';
import { RadiosWithNgmodelComponent } from './radios-with-ngmodel/radios-with-ngmodel.component';

@Component({
    selector: 'app-radio',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatRadioModule, RadiosWithNgmodelComponent],
    templateUrl: './radio.component.html',
    styleUrl: './radio.component.scss'
})
export class RadioComponent {}