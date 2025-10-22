import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';

@Component({
    selector: 'app-lbw-reactive-forms',
    standalone: true,
    imports: [CdkListbox, FormsModule, ReactiveFormsModule, CdkOption, JsonPipe],
    templateUrl: './lbw-reactive-forms.component.html',
    styleUrl: './lbw-reactive-forms.component.scss'
})
export class LbwReactiveFormsComponent {

    languages = ['C++', 'Java', 'JavaScript', 'Python', 'TypeScript'];
    languageCtrl = new FormControl(['TypeScript']);

}