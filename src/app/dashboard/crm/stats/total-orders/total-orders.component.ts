import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart,
    ChartComponent,
    ApexStroke,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    colors: string[];
    labels: string[];
    plotOptions: ApexPlotOptions;
    stroke: ApexStroke;
};

@Component({
    selector: 'app-total-orders',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './total-orders.component.html',
    styleUrl: './total-orders.component.scss'
})
export class TotalOrdersComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [72],
            chart: {
                height: 180,
                type: "radialBar"
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    dataLabels: {
                        show: false
                    },
                    track: {
                        background: '#EFF7FF',
                    }
                }
            },
            colors: [
                "#2DB6F5"
            ],
            stroke: {
                dashArray: 4
            }
        };
    }

}