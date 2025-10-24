import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-utwa-custom-label-template',
    standalone: true,
    imports: [MatTabsModule, MatIconModule],
    templateUrl: './utwa-custom-label-template.component.html',
    styleUrl: './utwa-custom-label-template.component.scss'
})
export class UtwaCustomLabelTemplateComponent {}