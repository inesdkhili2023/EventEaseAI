import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-forms',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './forms.component.html',
    styleUrl: './forms.component.scss'
})
export class FormsComponent {}