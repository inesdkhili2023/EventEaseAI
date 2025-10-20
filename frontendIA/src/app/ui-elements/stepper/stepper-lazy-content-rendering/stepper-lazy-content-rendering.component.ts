import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-stepper-lazy-content-rendering',
    standalone: true,
    imports: [MatStepperModule, MatButtonModule, FeathericonsModule],
    templateUrl: './stepper-lazy-content-rendering.component.html',
    styleUrl: './stepper-lazy-content-rendering.component.scss'
})
export class StepperLazyContentRenderingComponent {}