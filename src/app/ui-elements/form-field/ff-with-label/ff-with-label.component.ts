import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-ff-with-label',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatCardModule,
        FeathericonsModule
    ],
    templateUrl: './ff-with-label.component.html',
    styleUrl: './ff-with-label.component.scss'
})
export class FfWithLabelComponent {

    // Form field with label
    hideRequiredControl = new FormControl(false);
    floatLabelControl = new FormControl('auto' as FloatLabelType);
    options = this._formBuilder.group({
        hideRequired: this.hideRequiredControl,
        floatLabel: this.floatLabelControl,
    });

    constructor(
        private _formBuilder: FormBuilder
    ) {}

    getFloatLabelValue(): FloatLabelType {
        return this.floatLabelControl.value || 'auto';
    }

}