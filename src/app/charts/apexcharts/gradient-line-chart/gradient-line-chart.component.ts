import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexTitleSubtitle,
    ApexStroke,
    ApexGrid,
    ApexFill,
    ApexMarkers,
    ApexYAxis,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    fill: ApexFill;
    markers: ApexMarkers;
    yaxis: ApexYAxis;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
};

@Component({
    selector: 'app-gradient-line-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './gradient-line-chart.component.html',
    styleUrl: './gradient-line-chart.component.scss'
})
export class GradientLineChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Likes",
                    data: [0, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
                }
            ],
            chart: {
                height: 350,
                type: "line",
                toolbar: {
                    show: true
                }
            },
            stroke: {
                width: 7,
                curve: "smooth"
            },
            xaxis: {
                type: "datetime",
                categories: [
                    "1/11/2000",
                    "2/11/2000",
                    "3/11/2000",
                    "4/11/2000",
                    "5/11/2000",
                    "6/11/2000",
                    "7/11/2000",
                    "8/11/2000",
                    "9/11/2000",
                    "10/11/2000",
                    "11/11/2000",
                    "12/11/2000",
                    "1/11/2001",
                    "2/11/2001",
                    "3/11/2001",
                    "4/11/2001",
                    "5/11/2001",
                    "6/11/2001"
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
            grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#edeff5"
            },
            title: {
                text: "Social Media",
                align: "left",
                offsetX: -9,
                style: {
                    fontWeight: '500',
                    fontSize: '14px',
                    color: '#5b5b98'
                }
            },
            fill: {
                type: "gradient",
                gradient: {
                    gradientToColors: ["#FDD835"],
                    type: "horizontal",
                    shadeIntensity: 1,
                    opacityFrom: 1,
                    shade: "dark",
                    opacityTo: 1,
                }
            },
            markers: {
                size: 4,
                strokeWidth: 2,
                colors: ["#FFA41B"],
                strokeColors: "#ffffff",
                hover: {
                    size: 7
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
            }
        };
    }

}