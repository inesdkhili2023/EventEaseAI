import { Component } from '@angular/core';
import {
    MatBottomSheet,
    MatBottomSheetModule,
    MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-bottom-sheet',
    standalone: true,
    imports: [MatButtonModule, MatBottomSheetModule, RouterLink, MatCardModule, MatButtonModule],
    templateUrl: './bottom-sheet.component.html',
    styleUrl: './bottom-sheet.component.scss'
})
export class BottomSheetComponent {

    constructor(private _bottomSheet: MatBottomSheet) {}
    openBottomSheet(): void {
        this._bottomSheet.open(BottomSheetOverviewExampleSheet);
    }

}

@Component({
    selector: './bottom-sheet-overview',
    templateUrl: './bottom-sheet-overview.html',
    standalone: true,
    imports: [MatListModule],
})
export class BottomSheetOverviewExampleSheet {

    constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}
    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }

}