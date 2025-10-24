import { Component, inject } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
    MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-sbwa-annotated-custom-component',
    standalone: true,
    imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, FeathericonsModule],
    templateUrl: './sbwa-annotated-custom-component.component.html',
    styleUrl: './sbwa-annotated-custom-component.component.scss'
})
export class SbwaAnnotatedCustomComponentComponent {

    durationInSeconds = 5;

    constructor(
        private _snackBar: MatSnackBar
    ) {}

    openSnackBar() {
        this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
            duration: this.durationInSeconds * 1000,
        });
    }

}

@Component({
    selector: 'snack-bar-annotated-component-example-snack',
    templateUrl: 'snack-bar-annotated-component-example-snack.html',
    styles: [
        `
            :host {
                display: flex;
            }
            .example-pizza-party {
                color: var(--whiteColor);
            }
        `,
    ],
    standalone: true,
    imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
})
export class PizzaPartyAnnotatedComponent {
    snackBarRef = inject(MatSnackBarRef);
}