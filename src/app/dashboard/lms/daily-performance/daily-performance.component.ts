import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
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
    selector: 'app-daily-performance',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './daily-performance.component.html',
    styleUrl: './daily-performance.component.scss'
})
export class DailyPerformanceComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [72],
            chart: {
                height: 300,
                type: "radialBar"
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    dataLabels: {
                        name: {
                            offsetY: 103
                        },
                        value: {
                            offsetY: 60,
                            formatter: function(val) {
                                return val + "%";
                            }
                        }
                    },
                    track: {
                        background: '#EFF7FF',
                    }
                }
            },
            colors: [
                "#EE368C"
            ],
            stroke: {
                dashArray: 4
            },
            labels: ["Today"]
        };
    }

}