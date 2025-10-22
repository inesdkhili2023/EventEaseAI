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
    markers: ApexMarkers;
    tooltip: any; // ApexTooltip;
    colors: string[];
    yaxis: ApexYAxis;
    grid: ApexGrid;
    legend: ApexLegend;
    title: ApexTitleSubtitle;
};

@Component({
    selector: 'app-avg-response-time',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './avg-response-time.component.html',
    styleUrl: './avg-response-time.component.scss'
})
export class AvgResponseTimeComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Session Duration",
                    data: [45, 52, 38, 24, 33, 26, 21]
                },
                {
                    name: "Page Views",
                    data: [35, 41, 62, 42, 13, 18, 29]
                }
            ],
            chart: {
                height: 457,
                type: "line",
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
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
                    vertical: 2
                },
                markers: {
                    radius: 12,
                    offsetY: -1
                }
            },
            colors: [
                "#2DB6F5", "#FBE38E"
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
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul"
                ]
            },
            yaxis: {
                tickAmount: 6,
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
            tooltip: {
                y: [
                    {
                        title: {
                            formatter: function(val:any) {
                                return val + " (mins)";
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function(val:any) {
                                return val + " per session";
                            }
                        }
                    }
                ]
            },
            grid: {
                show: true,
                strokeDashArray: 0,
                borderColor: "#edeff5"
            }
        };
    }

}