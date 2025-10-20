import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CustomErrorstatematcherComponent } from './custom-errorstatematcher/custom-errorstatematcher.component';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule, MatButtonModule, CustomErrorstatematcherComponent, ReactiveFormsModule, FeathericonsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss'
})
export class InputComponent {

    // Input with a Clear Button Value
    value = 'Clear me';

    // Input with error messages
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);

}