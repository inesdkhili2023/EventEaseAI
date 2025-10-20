import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MatSlideToggleModule,
    _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';

@Component({
    selector: 'app-st-with-forms',
    standalone: true,
    imports: [
        MatSlideToggleModule,
        FormsModule,
        _MatSlideToggleRequiredValidatorModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    templateUrl: './st-with-forms.component.html',
    styleUrl: './st-with-forms.component.scss'
})
export class StWithFormsComponent {

    isChecked = true;
    formGroup = this._formBuilder.group({
        enableWifi: '',
        acceptTerms: ['', Validators.requiredTrue],
    });

    constructor(private _formBuilder: FormBuilder) {}

    alertFormValues(formGroup: FormGroup) {
        alert(JSON.stringify(formGroup.value, null, 2));
    }

}