import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-plain-input',
    standalone: true,
    imports: [MatCardModule, FormsModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, FeathericonsModule],
    templateUrl: './plain-input.component.html',
    styleUrl: './plain-input.component.scss'
})
export class PlainInputComponent {

    // Plain Input Autocomplete
    control = new FormControl('');
    streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
    filteredStreets: Observable<string[]>;
    ngOnInit() {
        this.filteredStreets = this.control.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
        );
    }
    private _filter(value: string): string[] {
        const filterValue = this._normalizeValue(value);
        return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
    }
    private _normalizeValue(value: string): string {
        return value.toLowerCase().replace(/\s/g, '');
    }

}