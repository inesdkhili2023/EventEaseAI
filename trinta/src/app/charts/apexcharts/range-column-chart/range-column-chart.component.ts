import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexLegend,
    ApexXAxis,
    ApexYAxis,
    ApexGrid,
    ApexPlotOptions,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    grid: ApexGrid;
    colors: any;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    plotOptions: ApexPlotOptions;
};

@Component({
    selector: 'app-range-column-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './range-column-chart.component.html',
    styleUrl: './range-column-chart.component.scss'
})
export class RangeColumnChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Blue",
                    data: [
                        {
                            x: "Team A",
                            y: [1, 5]
                        },
                        {
                            x: "Team B",
                            y: [4, 6]
                        },
                        {
                            x: "Team C",
                            y: [5, 8]
                        },
                        {
                            x: "Team D",
                            y: [3, 11]
                        }
                    ]
                },
                {
                    name: "Green",
                    data: [
                        {
                            x: "Team A",
                            y: [2, 6]
                        },
                        {
                            x: "Team B",
                            y: [1, 3]
                        },
                        {
                            x: "Team C",
                            y: [7, 8]
                        },
                        {
                            x: "Team D",
                            y: [5, 9]
                        }
                    ]
                }
            ],
            chart: {
                type: "rangeBar",
                height: 350,
                toolbar: {
                    show: true
                }
            },
            colors: [
                "#3761ee", "#e74c3c"
            ],
            plotOptions: {
                bar: {
                    horizontal: false
                }
            },
            dataLabels: {
                enabled: true
            },
            legend: {
                show: true,
                offsetY: 10,
                fontSize: '13px',
                position: "bottom",
                horizontalAlign: "center",
                labels: {
                    colors: '#77838f',
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 5
                }
            },
            grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#edeff5",
                row: {
                    colors: ["#f4f6fc", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5
                }
            },
            xaxis: {
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
            }
        };
    }

}