import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-highlight-first-option',
    standalone: true,
    imports: [
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        AsyncPipe,
        FeathericonsModule
    ],
    templateUrl: './highlight-first-option.component.html',
    styleUrl: './highlight-first-option.component.scss'
})
export class HighlightFirstOptionComponent {

    // Highlight first option
    myControl = new FormControl('');
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;
    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
        );
    }
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

}