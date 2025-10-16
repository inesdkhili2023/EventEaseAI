import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { NgxGaugeModule } from 'ngx-gauge';

@Component({
    selector: 'app-gauge',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgxGaugeModule],
    templateUrl: './gauge.component.html',
    styleUrl: './gauge.component.scss'
})
export class GaugeComponent {

    // Dynamic Gauge Value
    dynamicGaugeDemoValue = 10.2;
    onUpdateClick() {
        this.dynamicGaugeDemoValue = 
        Math.round(Math.random() * 1000)/10;
    }

    // Adding Markers to the Gauge
    markerConfig = {
        "0": { color: '#555555', size: 8, label: '0', type: 'line'},
        "15": { color: '#555555', size: 4, type: 'line'},
        "30": { color: '#555555', size: 8, label: '30', type: 'line'},
        "40": { color: '#555555', size: 4, type: 'line'},
        "50": { color: '#555555', size: 8, label: '50', type: 'line'},
        "60": { color: '#555555', size: 4, type: 'line'},
        "70": { color: '#555555', size: 8, label: '70', type: 'line'},
        "85": { color: '#555555', size: 4, type: 'line'},
        "100": { color: '#555555', size: 8, label: '100', type: 'line'},
    }

}