import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
    selector: 'app-color-picker',
    standalone: true,
    imports: [RouterLink, MatCardModule, ColorPickerModule],
    templateUrl: './color-picker.component.html',
    styleUrl: './color-picker.component.scss'
})
export class ColorPickerComponent {

    // Color Picker
    color: any;
    color2: any;
    color3: any;
    color4: any;
    color5: any;
    color6: any;
    color7: any;
    color8: any;
    color9: any;
    color10: any;
    color11: any;

}