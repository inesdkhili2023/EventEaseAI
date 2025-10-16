import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexTooltip,
    ApexFill,
    ApexYAxis,
    ApexGrid,
    ApexLegend,
    ApexStroke,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    fill: ApexFill;
    grid: ApexGrid;
    legend: ApexLegend;
    stroke: ApexStroke;
    colors: any;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
};

@Component({
    selector: 'app-spline-area-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './spline-area-chart.component.html',
    styleUrl: './spline-area-chart.component.scss'
})
export class SplineAreaChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Trinta",
                    data: [31, 40, 28, 51, 42, 70, 60]
                },
                {
                    name: "Social",
                    data: [11, 32, 45, 32, 34, 52, 41]
                }
            ],
            chart: {
                height: 350,
                type: "area",
                toolbar: {
                    show: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth"
            },
            fill: {
                type: "gradient",
                gradient: {
                    opacityFrom: 0.45,
                    opacityTo: 0.05
                }
            },
            colors: [
                "#EDEFF5", "#3761EE"
            ],
            xaxis: {
                type: "datetime",
                categories: [
                    "2018-09-19T00:00:00.000Z",
                    "2018-09-19T01:30:00.000Z",
                    "2018-09-19T02:30:00.000Z",
                    "2018-09-19T03:30:00.000Z",
                    "2018-09-19T04:30:00.000Z",
                    "2018-09-19T05:30:00.000Z",
                    "2018-09-19T06:30:00.000Z"
                ],
                axisBorder: {
                    show: false,
                    color: '#a9a9c8'
                },
                axisTicks: {
                    show: true,
                    color: '#a9a9c8',
                    borderType: 'dotted'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#262626",
                        fontSize: "13px"
                    }
                }
            },
            yaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: "#a9a9c8",
                        fontSize: "13px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#edeff5'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '13px',
                horizontalAlign: 'center',
                labels: {
                    colors: '#77838f',
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 0
                },
                markers: {
                    offsetY: -1
                }
            },
            grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#edeff5"
            }
        };
    }

}