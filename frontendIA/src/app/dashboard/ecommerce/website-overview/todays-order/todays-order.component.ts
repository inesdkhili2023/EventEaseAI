import { Component, ViewChild } from '@angular/core';

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
    colors: string[];
    labels: string[];
    plotOptions: ApexPlotOptions;
};

@Component({
    selector: 'app-todays-order',
    standalone: true,
    imports: [NgApexchartsModule],
    templateUrl: './todays-order.component.html',
    styleUrl: './todays-order.component.scss'
})
export class TodaysOrderComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [63],
            chart: {
                height: 110,
                type: "radialBar"
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: "50%"
                    },
                    dataLabels: {
                        value: {
                            offsetY: -11
                        }
                    },
                    track: {
                        background: '#eeeeee',
                    }
                }
            },
            colors: [
                "#3354f4"
            ],
            labels: [""]
        };
    }

}