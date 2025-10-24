import { Component } from '@angular/core';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { VerticalComponent } from './vertical/vertical.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-wizard',
    standalone: true,
    imports: [HorizontalComponent, VerticalComponent, MatCardModule],
    templateUrl: './wizard.component.html',
    styleUrl: './wizard.component.scss'
})
export class WizardComponent {}