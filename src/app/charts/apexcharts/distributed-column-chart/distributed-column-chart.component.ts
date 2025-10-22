import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ApexChart,
    ApexAxisChartSeries,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexXAxis,
    ApexLegend,
    ApexGrid,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    grid: ApexGrid;
    colors: string[];
    legend: ApexLegend;
};

@Component({
    selector: 'app-distributed-column-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './distributed-column-chart.component.html',
    styleUrl: './distributed-column-chart.component.scss'
})
export class DistributedColumnChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "distibuted",
                    data: [21, 22, 10, 28, 16, 21, 13, 30]
                }
            ],
            chart: {
                height: 350,
                type: "bar",
                events: {
                    click: function(chart, w, e) {
                        // console.log(chart, w, e)
                    }
                }
            },
            colors: [
                "#3761ee",
                "#796df6",
                "#00cae3",
                "#ffb264",
                "#2ed47e",
                "#e74c3c",
                "#26a69a",
                "#d10ce8"
            ],
            plotOptions: {
                bar: {
                    columnWidth: "45%",
                    distributed: true
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false,
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
                categories: [
                    ["John", "Doe"],
                    ["Joe", "Smith"],
                    ["Jake", "Williams"],
                    "Amber",
                    ["Peter", "Brown"],
                    ["Mary", "Evans"],
                    ["David", "Wilson"],
                    ["Lily", "Roberts"]
                ],
                labels: {
                    show: true,
                    style: {
                        colors: [
                            "#3761ee",
                            "#796df6",
                            "#00cae3",
                            "#ffb264",
                            "#2ed47e",
                            "#e74c3c",
                            "#26a69a",
                            "#d10ce8"
                        ],
                        fontSize: "13px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#a9a9c8'
                },
                axisTicks: {
                    show: true,
                    color: '#a9a9c8',
                    borderType: 'dotted'
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