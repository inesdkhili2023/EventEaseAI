import { Component } from '@angular/core';
import {
    FormControl,
    FormGroupDirective,
    NgForm,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-custom-errorstatematcher',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FeathericonsModule],
    templateUrl: './custom-errorstatematcher.component.html',
    styleUrl: './custom-errorstatematcher.component.scss'
})
export class CustomErrorstatematcherComponent {

    // ErrorStateMatcher
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    matcher = new MyErrorStateMatcher();

}