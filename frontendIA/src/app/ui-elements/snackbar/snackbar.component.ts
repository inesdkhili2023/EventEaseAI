import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { BasicSnackbarComponent } from './basic-snackbar/basic-snackbar.component';
import { SbwaAnnotatedCustomComponentComponent } from './sbwa-annotated-custom-component/sbwa-annotated-custom-component.component';
import { SbwaCustomComponentComponent } from './sbwa-custom-component/sbwa-custom-component.component';
import { SbwConfigurablePositionComponent } from './sbw-configurable-position/sbw-configurable-position.component';

@Component({
    selector: 'app-snackbar',
    standalone: true,
    imports: [RouterLink, MatCardModule, BasicSnackbarComponent, SbwaAnnotatedCustomComponentComponent, SbwaCustomComponentComponent, SbwConfigurablePositionComponent],
    templateUrl: './snackbar.component.html',
    styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {}