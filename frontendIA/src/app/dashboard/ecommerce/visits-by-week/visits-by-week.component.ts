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
    ApexGrid,
    ApexXAxis,
    ApexYAxis,
    ApexLegend,
    ApexTooltip,
    ApexPlotOptions,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    grid: ApexGrid;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    tooltip: ApexTooltip;
    legend: ApexLegend;
    colors: string[];
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
};

@Component({
    selector: 'app-visits-by-week',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './visits-by-week.component.html',
    styleUrl: './visits-by-week.component.scss'
})
export class VisitsByWeekComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Total Visited",
                    data: [
                        {
                            x: "Mon",
                            y: [1, 5]
                        },
                        {
                            x: "Tue",
                            y: [4, 6]
                        },
                        {
                            x: "Wed",
                            y: [5, 8]
                        },
                        {
                            x: "Thu",
                            y: [3, 11]
                        },
                        {
                            x: "Fri",
                            y: [4, 6]
                        },
                        {
                            x: "Sat",
                            y: [5, 8]
                        },
                        {
                            x: "Sun",
                            y: [2, 6]
                        }
                    ]
                }
            ],
            chart: {
                type: "rangeBar",
                height: 277,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "16px",
                    borderRadius: 8,
                    dataLabels: {
                        hideOverflowingLabels: false,
                    }
                }
            },
            colors: [
                "#ff8a54"
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true,
                strokeDashArray: 0,
                borderColor: "#edeff5"
            },
            legend: {
                show: false,
                fontSize: '14px',
                labels: {
                    colors: "#262626"
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 0
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
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ]
            },
            yaxis: {
                tickAmount: 5,
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
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val + "k";
                    }
                }
            }
        };
    }

}