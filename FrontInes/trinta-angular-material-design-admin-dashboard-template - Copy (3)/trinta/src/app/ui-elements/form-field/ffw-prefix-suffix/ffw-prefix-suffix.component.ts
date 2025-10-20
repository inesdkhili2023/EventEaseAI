import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-ffw-prefix-suffix',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, FeathericonsModule],
    templateUrl: './ffw-prefix-suffix.component.html',
    styleUrl: './ffw-prefix-suffix.component.scss'
})
export class FfwPrefixSuffixComponent {

    // Password hide
    hide = true;

}