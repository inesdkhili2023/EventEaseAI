import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-alerts',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgIf],
    templateUrl: './alerts.component.html',
    styleUrl: './alerts.component.scss'
})
export class AlertsComponent {

    showAlert = true;
    showAlert2 = true;
    showAlert3 = true;
    showAlert4 = true;
    showAlert5 = true;
    showAlert6 = true;
    showAlert7 = true;
    showAlert8 = true;
    showAlert9 = true;
    showAlert10 = true;
    showAlert11 = true;
    showAlert12 = true;
    showAlert13 = true;
    showAlert14 = true;
    showAlert15 = true;
    showAlert16 = true;
    showAlert17 = true;
    showAlert18 = true;

    dismissAlert() {
        this.showAlert = false;
    }
    dismissAlert2() {
        this.showAlert2 = false;
    }
    dismissAlert3() {
        this.showAlert3 = false;
    }
    dismissAlert4() {
        this.showAlert4 = false;
    }
    dismissAlert5() {
        this.showAlert5 = false;
    }
    dismissAlert6() {
        this.showAlert6 = false;
    }
    dismissAlert7() {
        this.showAlert7 = false;
    }
    dismissAlert8() {
        this.showAlert8 = false;
    }
    dismissAlert9() {
        this.showAlert9 = false;
    }
    dismissAlert10() {
        this.showAlert10 = false;
    }
    dismissAlert11() {
        this.showAlert11 = false;
    }
    dismissAlert12() {
        this.showAlert12 = false;
    }
    dismissAlert13() {
        this.showAlert13 = false;
    }
    dismissAlert14() {
        this.showAlert14 = false;
    }
    dismissAlert15() {
        this.showAlert15 = false;
    }
    dismissAlert16() {
        this.showAlert16 = false;
    }
    dismissAlert17() {
        this.showAlert17 = false;
    }
    dismissAlert18() {
        this.showAlert18 = false;
    }

}