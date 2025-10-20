import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexXAxis,
    ApexLegend,
    ApexGrid,
    ApexYAxis,
    ApexFill,
    NgApexchartsModule
  } from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    grid: ApexGrid;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    colors: string[];
    legend: ApexLegend;
    fill: ApexFill;
};

@Component({
    selector: 'app-live-calls',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './live-calls.component.html',
    styleUrl: './live-calls.component.scss'
})
export class LiveCallsComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Incoming",
                    data: [30, 37, 32, 34, 35, 44, 20]
                },
                {
                    name: "Outgoing",
                    data: [28, 42, 42, 38, 50, 38, 42]
                },
                {
                    name: "Canceled",
                    data: [50, 53, 42, 56, 35, 54, 48]
                }
            ],
            chart: {
                type: "bar",
                height: 275,
                stacked: true,
                stackType: "100%",
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "12px",
                    borderRadius: 7,
                    borderRadiusWhenStacked: 'last'
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: [
                "#A9A9C8", "#2DB6F5", "#3761EE"
            ],
            grid: {
                show: false,
                strokeDashArray: 0,
                borderColor: "#edeff5"
            },
            xaxis: {
                axisBorder: {
                    show: true,
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
                    "S",
                    "S",
                    "M",
                    "T",
                    "W",
                    "T",
                    "F"
                ]
            },
            yaxis: {
                tickAmount: 4,
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
            fill: {
                opacity: 1
            },
            legend: {
                show: true,
                position: 'bottom',
                fontSize: '13px',
                offsetY: 7,
                horizontalAlign: 'center',
                labels: {
                    colors: '#77838f',
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 4
                },
                markers: {
                    radius: 12,
                    offsetY: -1
                }
            }
        };
    }

}