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
    ApexMarkers,
    ApexGrid,
    ApexXAxis,
    ApexLegend,
    ApexPlotOptions,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    labels: string[];
    grid: ApexGrid;
    colors: string[];
    stroke: any; // ApexStroke;
    markers: ApexMarkers;
    legend: ApexLegend;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    tooltip: ApexTooltip;
};

@Component({
    selector: 'app-tasks-overview',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './tasks-overview.component.html',
    styleUrl: './tasks-overview.component.scss'
})
export class TasksOverviewComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Revenue",
                    type: "column",
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 34]
                },
                {
                    name: "Number of Project",
                    type: "area",
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 34]
                },
                {
                    name: "Active Project",
                    type: "line",
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 34]
                }
            ],
            chart: {
                height: 434,
                type: "line",
                stacked: false,
                toolbar: {
                    show: false
                }
            },
            stroke: {
                width: [0, 2, 2],
                curve: "smooth"
            },
            grid: {
                show: false,
                strokeDashArray: 0,
                borderColor: "#edeff5"
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    borderRadiusApplication: 'end',
                    columnWidth: "18px"
                }
            },
            colors: [
                "#90acd6", "#ee368c", "#3761ee"
            ],
            fill: {
                opacity: [1, 0.10, 1]
            },
            xaxis: {
                axisBorder: {
                    show: true,
                    color: '#edeff5'
                },
                axisTicks: {
                    show: true,
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
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
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
                    show: true,
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
            }
        };
    }

}