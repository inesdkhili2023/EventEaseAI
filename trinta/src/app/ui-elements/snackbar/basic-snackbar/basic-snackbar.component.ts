import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-basic-snackbar',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FeathericonsModule],
    templateUrl: './basic-snackbar.component.html',
    styleUrl: './basic-snackbar.component.scss'
})
export class BasicSnackbarComponent {

    constructor(
        private _snackBar: MatSnackBar
    ) {}

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action);
    }

}