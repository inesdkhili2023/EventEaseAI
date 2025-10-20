import { Component } from '@angular/core';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';

@Component({
    selector: 'app-horizontal-listbox',
    standalone: true,
    imports: [CdkListbox, CdkOption],
    templateUrl: './horizontal-listbox.component.html',
    styleUrl: './horizontal-listbox.component.scss'
})
export class HorizontalListboxComponent {

    sizes = ['XS', 'S', 'M', 'L', 'XL'];

}