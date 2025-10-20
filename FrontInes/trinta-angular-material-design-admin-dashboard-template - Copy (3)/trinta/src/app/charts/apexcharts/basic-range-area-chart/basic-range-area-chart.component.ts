import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexTitleSubtitle,
    ApexXAxis,
    ApexDataLabels,
    ApexStroke,
    ApexGrid,
    ApexYAxis,
    ApexMarkers,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
    xaxis: ApexXAxis;
    grid: ApexGrid;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    colors: any;
    markers: ApexMarkers;
};

@Component({
    selector: 'app-basic-range-area-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './basic-range-area-chart.component.html',
    styleUrl: './basic-range-area-chart.component.scss'
})
export class BasicRangeAreaChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "New York Temperature",
                    data: [
                        {
                            x: "Jan",
                            y: [-2, 4]
                        },
                        {
                            x: "Feb",
                            y: [-1, 6]
                        },
                        {
                            x: "Mar",
                            y: [3, 10]
                        },
                        {
                            x: "Apr",
                            y: [8, 16]
                        },
                        {
                            x: "May",
                            y: [13, 22]
                        },
                        {
                            x: "Jun",
                            y: [18, 26]
                        },
                        {
                            x: "Jul",
                            y: [21, 29]
                        },
                        {
                            x: "Aug",
                            y: [21, 28]
                        },
                        {
                            x: "Sep",
                            y: [17, 24]
                        },
                        {
                            x: "Oct",
                            y: [11, 18]
                        },
                        {
                            x: "Nov",
                            y: [6, 12]
                        },
                        {
                            x: "Dec",
                            y: [1, 7]
                        }
                    ]
                }
            ],
            chart: {
                height: 350,
                type: "rangeArea",
                toolbar: {
                    show: true
                }
            },
            stroke: {
                curve: "straight"
            },
            title: {
                text: "New York Temperature (all year round)",
                align: "left",
                offsetX: -9,
                style: {
                    fontWeight: '500',
                    fontSize: '14px',
                    color: '#5b5b98'
                }
            },
            colors: [
                "#3761EE"
            ],
            markers: {
                hover: {
                    sizeOffset: 5
                }
            },
            dataLabels: {
                enabled: false
            },
            yaxis: {
                labels: {
                    show: true,
                    formatter: (val) => {
                        return val + "°C";
                    },
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
            grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#edeff5"
            }
        };
    }

}