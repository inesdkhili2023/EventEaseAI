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
    selector: 'app-seller-overview',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './seller-overview.component.html',
    styleUrl: './seller-overview.component.scss'
})
export class SellerOverviewComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "New Issues",
                    data: [77, 122, 53, 137, 174, 77, 69, 77, 122, 53, 137, 174]
                },
                {
                    name: "Fixed Issues",
                    data: [100, 54, 78, 51, 65, 42, 73, 100, 54, 78, 51, 65]
                },
                {
                    name: "Closed Issues",
                    data: [94, 60, 75, 74, 34, 124, 78, 94, 60, 75, 74, 34]
                }
            ],
            chart: {
                type: "bar",
                height: 400,
                stacked: true,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#9b56a2", "#ae8ff7", "#93aafd"
            ],
            grid: {
                show: true,
                strokeDashArray: 0,
                borderColor: "#edeff5"
            },
            plotOptions: {
                bar: {
                    borderRadius: 7,
                    columnWidth: '22px',
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
                show: false
            }
        };
    }

}