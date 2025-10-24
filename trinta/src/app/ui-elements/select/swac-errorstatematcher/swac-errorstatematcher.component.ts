import { Component } from '@angular/core';
import {
    FormControl,
    FormGroupDirective,
    NgForm,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-swac-errorstatematcher',
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, FeathericonsModule],
    templateUrl: './swac-errorstatematcher.component.html',
    styleUrl: './swac-errorstatematcher.component.scss'
})
export class SwacErrorstatematcherComponent {

    selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

    selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

    nativeSelectFormControl = new FormControl('valid', [
        Validators.required,
        Validators.pattern('valid'),
    ]);

    matcher = new MyErrorStateMatcher();
    
}