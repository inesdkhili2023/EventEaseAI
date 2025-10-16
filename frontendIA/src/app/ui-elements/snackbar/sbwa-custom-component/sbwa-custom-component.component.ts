import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-sbwa-custom-component',
    standalone: true,
    imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, FeathericonsModule],
    templateUrl: './sbwa-custom-component.component.html',
    styleUrl: './sbwa-custom-component.component.scss'
})
export class SbwaCustomComponentComponent {

    durationInSeconds = 5;

    constructor(private _snackBar: MatSnackBar) {}

    openSnackBar() {
        this._snackBar.openFromComponent(PizzaPartyComponent, {
            duration: this.durationInSeconds * 1000,
        });
    }

}

@Component({
    selector: 'snack-bar-component-example-snack',
    templateUrl: 'snack-bar-component-example-snack.html',
    styles: [
        `
            .example-pizza-party {
                color: var(--whiteColor);
            }
        `,
    ],
    standalone: true,
})
export class PizzaPartyComponent {}