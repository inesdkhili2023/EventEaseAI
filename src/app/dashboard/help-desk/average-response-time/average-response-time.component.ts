import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexFill,
    ApexYAxis,
    ApexTooltip,
    ApexTitleSubtitle,
    ApexGrid,
    ApexXAxis,
    ApexMarkers,
    ApexLegend,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    title: ApexTitleSubtitle;
    labels: string[];
    stroke: any; // ApexStroke;
    dataLabels: any; // ApexDataLabels;
    fill: ApexFill;
    colors: string[];
    markers: ApexMarkers;
    legend: ApexLegend;
    grid: ApexGrid;
    tooltip: ApexTooltip;
};

@Component({
    selector: 'app-average-response-time',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './average-response-time.component.html',
    styleUrl: './average-response-time.component.scss'
})
export class AverageResponseTimeComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Morning Pick",
                    type: "column",
                    data: [440, 505, 414, 671, 227, 413]
                },
                {
                    name: "Evening Pick",
                    type: "line",
                    data: [423, 542, 435, 627, 243, 422]
                }
            ],
            chart: {
                height: 288,
                type: "line",
                toolbar: {
                    show: false
                }
            },
            stroke: {
                width: [0, 2],
                curve: "smooth"
            },
            markers: {
                size: 5,
                strokeWidth: 0,
                hover: {
                    sizeOffset: 1
                }
            },
            grid: {
                show: true,
                strokeDashArray: 0,
                borderColor: "#edeff5"
            },
            dataLabels: {
                enabled: false
            },
            colors: [
                "#fcdceb", "#EE368C"
            ],
            xaxis: {
                axisBorder: {
                    show: false,
                    color: '#edeff5'
                },
                axisTicks: {
                    show: false,
                    color: '#edeff5'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#262626",
                        fontSize: "13px"
                    }
                },
                categories: [
                    "00.00",
                    "01.30",
                    "05.00",
                    "07.30",
                    "14.00",
                    "17.30"
                ]
            },
            yaxis: [
                {
                    labels: {
                        show: true,
                        style: {
                            colors: "#a9a9c8",
                            fontSize: "13px"
                        }
                    },
                    axisBorder: {
                        show: true,
                        color: '#edeff5'
                    }
                }
            ],
            legend: {
                show: false,
                position: 'bottom',
                fontSize: '13px',
                horizontalAlign: 'center',
                labels: {
                    colors: '#77838f',
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 2
                },
                markers: {
                    radius: 12,
                    offsetY: -1
                }
            }
        };
    }

}