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

export interface User {
    name: string;
}

@Component({
    selector: 'app-display-value',
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
    templateUrl: './display-value.component.html',
    styleUrl: './display-value.component.scss'
})
export class DisplayValueComponent {

    // Display Value
    myControl = new FormControl<string | User>('');
    options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
    filteredOptions: Observable<User[]>;
    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => {
                const name = typeof value === 'string' ? value : value?.name;
                return name ? this._filter(name as string) : this.options.slice();
            }),
        );
    }
    displayFn(user: User): string {
        return user && user.name ? user.name : '';
    }
    private _filter(name: string): User[] {
        const filterValue = name.toLowerCase();
        return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
    }

}