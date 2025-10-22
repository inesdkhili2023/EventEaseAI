import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { StepperOverviewComponent } from './stepper-overview/stepper-overview.component';
import { StepperAnimationsComponent } from './stepper-animations/stepper-animations.component';
import { StDisplaysErrorsItStepsComponent } from './st-displays-errors-it-steps/st-displays-errors-it-steps.component';
import { StepperHeaderPositionComponent } from './stepper-header-position/stepper-header-position.component';
import { StepperLabelBottomPositionComponent } from './stepper-label-bottom-position/stepper-label-bottom-position.component';
import { StepperLazyContentRenderingComponent } from './stepper-lazy-content-rendering/stepper-lazy-content-rendering.component';
import { SwRequiredStepsComponent } from './sw-required-steps/sw-required-steps.component';

@Component({
    selector: 'app-stepper',
    standalone: true,
    imports: [RouterLink, MatCardModule, StepperOverviewComponent, StepperAnimationsComponent, StDisplaysErrorsItStepsComponent, StepperHeaderPositionComponent, StepperLabelBottomPositionComponent, StepperLazyContentRenderingComponent, SwRequiredStepsComponent],
    templateUrl: './stepper.component.html',
    styleUrl: './stepper.component.scss'
})
export class StepperComponent {}