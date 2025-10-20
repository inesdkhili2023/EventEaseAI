import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexStroke,
    ApexMarkers,
    ApexYAxis,
    ApexGrid,
    ApexTitleSubtitle,
    ApexLegend,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    colors: string[];
    markers: ApexMarkers;
    tooltip: any; // ApexTooltip;
    yaxis: ApexYAxis;
    grid: ApexGrid;
    legend: ApexLegend;
    title: ApexTitleSubtitle;
};

@Component({
    selector: 'app-courses-overview',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './courses-overview.component.html',
    styleUrl: './courses-overview.component.scss'
})
export class CoursesOverviewComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Enrolled",
                    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
                },
                {
                    name: "Courses Completed",
                    data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
                }
            ],
            chart: {
                height: 433,
                type: "line",
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true,
                strokeDashArray: 0,
                borderColor: "#edeff5",
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            stroke: {
                width: 2,
                curve: "straight",
                dashArray: [0, 0]
            },
            colors: [
                "#2DB6F5", "#EE368C"
            ],
            markers: {
                size: 7,
                strokeWidth: 0,
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
            }
        };
    }

}