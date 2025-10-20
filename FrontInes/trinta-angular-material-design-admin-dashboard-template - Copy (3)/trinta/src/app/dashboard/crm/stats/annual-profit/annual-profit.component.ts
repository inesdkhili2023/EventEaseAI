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
    ApexFill,
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
    grid: ApexGrid;
    stroke: ApexStroke;
    xaxis: ApexXAxis;
    fill: ApexFill;
    colors: string[];
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    markers: ApexMarkers;
};

@Component({
    selector: 'app-annual-profit',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './annual-profit.component.html',
    styleUrl: './annual-profit.component.scss'
})
export class AnnualProfitComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Annual Profit",
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
                height: 130,
                type: "rangeArea",
                toolbar: {
                    show: false
                }
            },
            stroke: {
                curve: "straight"
            },
            colors: [
                "#2DB6F5"
            ],
            markers: {
                hover: {
                    sizeOffset: 5
                }
            },
            grid: {
                show: false,
                strokeDashArray: 0,
                borderColor: "#edeff5"
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 1
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
                    show: false,
                    style: {
                        colors: "#262626",
                        fontSize: "13px"
                    }
                }
            },
            yaxis: {
                labels: {
                    show: false,
                    style: {
                        colors: "#a9a9c8",
                        fontSize: "13px"
                    },
                    formatter: (val) => {
                        return "$" + val + "k";
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#edeff5'
                }
            },
        };
    }

}