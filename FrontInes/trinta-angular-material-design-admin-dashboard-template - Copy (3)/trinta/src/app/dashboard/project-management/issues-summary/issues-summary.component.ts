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
    ApexXAxis,
    ApexPlotOptions,
    ApexLegend,
    ApexGrid,
    ApexYAxis,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    xaxis: ApexXAxis;
    grid: ApexGrid;
    plotOptions: ApexPlotOptions;
    colors: string[];
    yaxis: ApexYAxis;
    legend: ApexLegend;
};

@Component({
    selector: 'app-issues-summary',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './issues-summary.component.html',
    styleUrl: './issues-summary.component.scss'
})
export class IssuesSummaryComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "New Issues",
                    data: [77, 122, 53, 137, 174, 77, 69]
                },
                {
                    name: "Fixed Issues",
                    data: [100, 54, 78, 51, 65, 42, 73]
                },
                {
                    name: "Closed Issues",
                    data: [94, 60, 75, 74, 34, 124, 78]
                }
            ],
            chart: {
                type: "bar",
                height: 350,
                stacked: true,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#3761ee", "#f0e5fc", "#c893fd"
            ],
            grid: {
                show: true,
                strokeDashArray: 0,
                borderColor: "#edeff5"
            },
            plotOptions: {
                bar: {
                    borderRadius: 7,
                    columnWidth: '43px',
                }
            },
            dataLabels: {
                enabled: false
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
                show: false
            }
        };
    }

}