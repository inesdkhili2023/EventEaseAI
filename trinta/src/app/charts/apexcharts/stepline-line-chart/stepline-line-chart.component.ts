import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexStroke,
    ApexTitleSubtitle,
    ApexYAxis,
    ApexXAxis,
    ApexGrid,
    ApexDataLabels,
    ApexMarkers,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    markers: ApexMarkers;
    stroke: ApexStroke;
    yaxis: ApexYAxis;
    grid: ApexGrid;
    colors: any;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
};

@Component({
    selector: 'app-stepline-line-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './stepline-line-chart.component.html',
    styleUrl: './stepline-line-chart.component.scss'
})
export class SteplineLineChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Stepline Series",
                    data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
                }
            ],
            chart: {
                type: "line",
                height: 350
            },
            stroke: {
                curve: "stepline"
            },
            colors: [
                "#3761ee"
            ],
            dataLabels: {
                enabled: false
            },
            title: {
                text: "Stepline Chart",
                align: "left",
                offsetX: -9,
                style: {
                    fontWeight: '500',
                    fontSize: '14px',
                    color: '#5b5b98'
                }
            },
            markers: {
                hover: {
                    sizeOffset: 4
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
            },
            grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#edeff5"
            }
        };
    }

}