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
    ApexGrid,
    ApexLegend,
    ApexYAxis,
    ApexStroke,
    NgApexchartsModule,
    ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    grid: ApexGrid;
    stroke: ApexStroke;
    fill: ApexFill;
    colors: string[];
    yaxis: ApexYAxis;
    legend: ApexLegend;
    dataLabels: ApexDataLabels;
};

@Component({
    selector: 'app-balance-overview',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './balance-overview.component.html',
    styleUrl: './balance-overview.component.scss'
})
export class BalanceOverviewComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Expense",
                    data: [130, 90, 120, 160, 200, 170, 130, 100, 70, 100, 120, 75]
                },
                {
                    name: "Revenue",
                    data: [20, 80, 50, 40, 120, 200, 180, 130, 230, 170, 90, 120]
                }
            ],
            chart: {
                height: 419,
                type: "area",
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                type: "gradient",
                gradient: {
                    opacityFrom: 0.45,
                    opacityTo: 0.05
                }
            },
            grid: {
                show: true,
                strokeDashArray: 0,
                borderColor: "#edeff5",
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            stroke: {
                width: 4,
                curve: "smooth"
            },
            colors: [
                "#EDEFF5", "#3761EE"
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
                    show: false,
                    color: '#edeff5'
                }
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
                    vertical: 0
                },
                markers: {
                    offsetY: -1
                }
            }
        };
    }

}