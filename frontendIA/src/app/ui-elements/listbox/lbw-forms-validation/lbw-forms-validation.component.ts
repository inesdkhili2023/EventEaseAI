import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';

@Component({
    selector: 'app-lbw-forms-validation',
    standalone: true,
    imports: [CdkListbox, FormsModule, ReactiveFormsModule, CdkOption, AsyncPipe, JsonPipe],
    templateUrl: './lbw-forms-validation.component.html',
    styleUrl: './lbw-forms-validation.component.scss'
})
export class LbwFormsValidationComponent {

    signs = [
        'Rat',
        'Ox',
        'Tiger',
        'Rabbit',
        'Dragon',
        'Snake',
        'Horse',
        'Goat',
        'Monkey',
        'Rooster',
        'Dog',
        'Pig',
    ];
    invalid: Observable<boolean>;

    constructor() {
        this.invalid = this.signCtrl.valueChanges.pipe(
            map(() => this.signCtrl.touched && !this.signCtrl.valid),
        );
    }

    signCtrl = new FormControl<string[]>([], Validators.required);

    getErrors() {
        const errors = [];
        if (this.signCtrl.hasError('required')) {
            errors.push('You must enter your zodiac sign');
        }
        if (this.signCtrl.hasError('cdkListboxUnexpectedMultipleValues')) {
            errors.push('You can only select one zodiac sign');
        }
        if (this.signCtrl.hasError('cdkListboxUnexpectedOptionValues')) {
            const invalidOptions = this.signCtrl.getError('cdkListboxUnexpectedOptionValues').values;
            errors.push(`You entered an invalid zodiac sign: ${invalidOptions[0]}`);
        }
        return errors.length ? errors : null;
    }

}