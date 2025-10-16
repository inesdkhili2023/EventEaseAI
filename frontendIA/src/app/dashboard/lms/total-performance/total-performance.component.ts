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
    ApexMarkers,
    ApexLegend,
    ApexGrid,
    ApexXAxis,
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
    grid: ApexGrid;
    colors: string[];
    legend: ApexLegend;
    tooltip: ApexTooltip;
    markers: ApexMarkers;
};

@Component({
    selector: 'app-total-performance',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './total-performance.component.html',
    styleUrl: './total-performance.component.scss'
})
export class TotalPerformanceComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Hours Spent",
                    type: "column",
                    data: [354, 413, 295]
                },
                {
                    name: "Progress",
                    type: "line",
                    data: [290, 150, 270]
                }
            ],
            chart: {
                height: 478,
                type: "line",
                toolbar: {
                    show: false
                }
            },
            stroke: {
                width: [0, 4]
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                strokeDashArray: 0,
                borderColor: "#edeff5"
            },
            colors: [
                "#64B5F6", "#3761EE"
            ],
            markers: {
                size: 5,
                strokeWidth: 2,
                hover: {
                    sizeOffset: 2
                }
            },
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
                    "2022",
                    "2023",
                    "2024"
                ]
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
                    vertical: 1
                },
                markers: {
                    offsetY: -1
                }
            }
        };
    }

}