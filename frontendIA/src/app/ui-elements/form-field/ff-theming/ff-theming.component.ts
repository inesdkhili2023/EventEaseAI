import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-ff-theming',
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatCardModule, FeathericonsModule],
    templateUrl: './ff-theming.component.html',
    styleUrl: './ff-theming.component.scss'
})
export class FfThemingComponent {

    // Form field theming
    colorControl = new FormControl('primary' as ThemePalette);

}