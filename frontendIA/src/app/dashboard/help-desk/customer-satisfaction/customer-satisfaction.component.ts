import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexChart,
    ApexStroke,
    ApexFill,
    ApexLegend,
    ApexGrid,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: any;
    legend: ApexLegend;
    colors: string[];
    grid: ApexGrid;
    stroke: ApexStroke;
    fill: ApexFill;
};

@Component({
    selector: 'app-customer-satisfaction',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './customer-satisfaction.component.html',
    styleUrl: './customer-satisfaction.component.scss'
})
export class CustomerSatisfactionComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [14, 23, 21, 17, 15, 10],
            chart: {
                type: "polarArea",
                height: 390
            },
            stroke: {
                width: 0,
                colors: ["#ffffff"]
            },
            fill: {
                opacity: 1
            },
            labels: [
                'Active Ticket', 'Solved Ticket', 'Closed Ticket', 'Open Ticket', 'Critical Ticket', 'High Ticket'
            ],
            colors: [
                "#3761EE", "#A9A9C8", "#E4D4F6", "#5B5B98", "#DC9393", "#D2DC93"
            ],
            grid: {
                show: true,
                strokeDashArray: 0,
                borderColor: "#f2f2f2"
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '13px',
                horizontalAlign: 'left',
                labels: {
                    colors: '#77838f',
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5
                },
                markers: {
                    offsetY: 1
                }
            }
        };
    }

}