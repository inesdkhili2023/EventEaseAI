import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-tables-of-content',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatExpansionModule, FeathericonsModule],
    templateUrl: './tables-of-content.component.html',
    styleUrl: './tables-of-content.component.scss'
})
export class TablesOfContentComponent {

    // Expansion
    panelOpenState = false;

}