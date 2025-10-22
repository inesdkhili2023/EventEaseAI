import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart,
    ApexLegend,
    ChartComponent,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    colors: string[];
    legend: ApexLegend;
    plotOptions: ApexPlotOptions;
};

@Component({
    selector: 'app-custom-angle-circle-radialbar-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './custom-angle-circle-radialbar-chart.component.html',
    styleUrl: './custom-angle-circle-radialbar-chart.component.scss'
})
export class CustomAngleCircleRadialbarChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [100, 90, 80, 70],
            chart: {
                height: 350,
                type: "radialBar"
            },
            plotOptions: {
                radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                        margin: 10,
                        size: "30%",
                        image: undefined,
                        background: "transparent"
                    },
                    dataLabels: {
                        name: {
                            show: false
                        },
                        value: {
                            show: false
                        }
                    }
                }
            },
            colors: [
                "#757FEF", "#9EA5F4", "#C8CCF9", "#F1F2FD"
            ],
            labels: [
                "Completed", "Active", "Assigned", "Pending"
            ],
            legend: {
                show: true,
                offsetY: 0,
                offsetX: -20,
                floating: true,
                position: "left",
                fontSize: "13px",
                labels: {
                    colors: '#77838f'
                },
                formatter: function(seriesName, opts) {
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
                },
                itemMargin: {
                    horizontal: 0,
                    vertical: 5
                }
            }
        };
    }

}