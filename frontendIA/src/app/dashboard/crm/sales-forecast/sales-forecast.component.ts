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
    ApexGrid,
    ApexYAxis,
    ApexPlotOptions,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    colors: string[];
    plotOptions: ApexPlotOptions;
    grid: ApexGrid;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
};

@Component({
    selector: 'app-sales-forecast',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './sales-forecast.component.html',
    styleUrl: './sales-forecast.component.scss'
})
export class SalesForecastComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Sales",
                    data: [187, 261, 335]
                }
            ],
            chart: {
                type: "bar",
                height: 401,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 10,
                    borderRadiusApplication: 'end',
                    borderRadiusWhenStacked: 'last',
                    barHeight: '56px'
                }
            },
            grid: {
                show: true,
                strokeDashArray: 0,
                borderColor: "#EDEFF5",
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
            colors: [
                "#3761EE"
            ],
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
                        colors: "#A9A9C8",
                        fontSize: "13px"
                    }
                },
                categories: [
                    "Pending",
                    "Revenue",
                    "Goal"
                ]
            },
            yaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: "#262626",
                        fontSize: "13px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#edeff5'
                }
            }
        };
    }

}