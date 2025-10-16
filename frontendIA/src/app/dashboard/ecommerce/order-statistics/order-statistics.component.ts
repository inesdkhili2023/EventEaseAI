import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    plotOptions: ApexPlotOptions;
    colors: any;
};

@Component({
    selector: 'app-order-statistics',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './order-statistics.component.html',
    styleUrl: './order-statistics.component.scss'
})
export class OrderStatisticsComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [80, 85, 80, 85],
            chart: {
                height: 273,
                type: "radialBar"
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        show: false
                    }
                }
            },
            labels: [
                "Orders", "Profit", "Payout", "Customer"
            ],
            colors: [
                "#3354f4", "#74abff", "#3fb8f7", "#aae2ff"
            ]
        };
    }

}