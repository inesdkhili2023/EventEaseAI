import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-stepper-animations',
    standalone: true,
    imports: [
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FeathericonsModule
    ],
    templateUrl: './stepper-animations.component.html',
    styleUrl: './stepper-animations.component.scss'
})
export class StepperAnimationsComponent {

    constructor(private _formBuilder: FormBuilder) {}
    firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
    secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});

}