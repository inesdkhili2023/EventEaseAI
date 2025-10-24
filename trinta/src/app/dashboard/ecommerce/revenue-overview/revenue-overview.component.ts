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
    ApexLegend,
    ApexMarkers,
    ApexPlotOptions,
    ApexXAxis,
    ApexGrid,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    title: ApexTitleSubtitle;
    labels: string[];
    plotOptions: ApexPlotOptions;
    stroke: any; // ApexStroke;
    dataLabels: any; // ApexDataLabels;
    grid: ApexGrid;
    legend: ApexLegend;
    markers: ApexMarkers;
    colors: string[];
    fill: ApexFill;
    tooltip: ApexTooltip;
};

@Component({
    selector: 'app-revenue-overview',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './revenue-overview.component.html',
    styleUrl: './revenue-overview.component.scss'
})
export class RevenueOverviewComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Orders",
                    type: "column",
                    data: [217, 184, 284, 217, 184, 318, 184, 284, 236, 184, 184, 254]
                },
                {
                    name: "Revenue",
                    type: "line",
                    data: [183, 65, 70, 145, 125, 240, 145, 198, 195, 135, 140, 210]
                }
            ],
            chart: {
                height: 448,
                type: "line",
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 6,
                    columnWidth: '34px'
                }
            },
            stroke: {
                width: [0, 5]
            },
            dataLabels: {
                enabled: false
            },
            colors: [
                "#EFF2FF", "#2DB6F5"
            ],
            grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#edeff5"
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
            yaxis: [
                {
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
            ],
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