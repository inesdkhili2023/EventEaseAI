import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
    selector: 'app-radios-with-ngmodel',
    standalone: true,
    imports: [MatRadioModule, FormsModule],
    templateUrl: './radios-with-ngmodel.component.html',
    styleUrl: './radios-with-ngmodel.component.scss'
})
export class RadiosWithNgmodelComponent {

    favoriteSeason: string;
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

}