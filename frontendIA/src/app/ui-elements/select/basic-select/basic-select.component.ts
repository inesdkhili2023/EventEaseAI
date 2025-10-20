import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

interface Food {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-basic-select',
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, FeathericonsModule],
    templateUrl: './basic-select.component.html',
    styleUrl: './basic-select.component.scss'
})
export class BasicSelectComponent {

    foods: Food[] = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'},
    ];

}