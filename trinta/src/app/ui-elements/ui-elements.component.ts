import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-ui-elements',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './ui-elements.component.html',
    styleUrl: './ui-elements.component.scss'
})
export class UiElementsComponent {}