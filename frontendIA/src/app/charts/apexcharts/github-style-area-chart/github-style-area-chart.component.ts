import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import {
    ApexAxisChartSeries,
    ApexDataLabels,
    ApexFill,
    ApexYAxis,
    ApexXAxis,
    ApexStroke,
    ApexGrid,
    ApexLegend,
    ApexChart,
    NgApexchartsModule
} from "ng-apexcharts";

import { githubData } from "./github-data";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    fill: ApexFill;
    legend: ApexLegend;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    grid: ApexGrid;
    stroke: ApexStroke;
    colors: any;
};

@Component({
    selector: 'app-github-style-area-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './github-style-area-chart.component.html',
    styleUrl: './github-style-area-chart.component.scss'
})
export class GithubStyleAreaChartComponent {

    public chartMonths: Partial<ChartOptions>;
    public chartYears: Partial<ChartOptions>;
    public commonOptions: Partial<ChartOptions> = {
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1,
            type: "solid"
        },
        xaxis: {
            type: "datetime",
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
        stroke: {
            width: 0,
            curve: "smooth"
        },
        grid: {
            show: true,
            strokeDashArray: 5,
            borderColor: "#edeff5"
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

    constructor() {
        this.initCharts();
    }

    public initCharts(): void {
        this.chartMonths = {
            series: [
                {
                    name: "commits",
                    data: githubData.series
                }
            ],
            chart: {
                id: "chartyear",
                type: "area",
                height: 160,
                toolbar: {
                    show: false,
                    autoSelected: "pan"
                }
            },
            colors: [
                "#3761ee"
            ],
            yaxis: {
                show: false,
                tickAmount: 3,
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
        this.chartYears = {
            series: [
                {
                    name: "commits",
                    data: githubData.series
                }
            ],
            chart: {
                height: 200,
                type: "area",
                toolbar: {
                    autoSelected: "selection"
                },
                brush: {
                    enabled: true,
                    target: "chartyear"
                },
                selection: {
                    enabled: true,
                    xaxis: {
                        min: new Date("26 Jan 2014").getTime(),
                        max: new Date("29 Mar 2015").getTime()
                    }
                }
            },
            colors: [
                "#7bd39a"
            ],
            legend: {
                position: "top",
                horizontalAlign: "left"
            }
        };
    }

}