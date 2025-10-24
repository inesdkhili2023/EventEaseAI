import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexLegend,
    ApexMarkers,
    ApexStroke,
    ApexGrid,
    ApexXAxis,
    ApexFill,
    ApexTooltip,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    colors: string[];
    xaxis: ApexXAxis;
    grid: ApexGrid;
    markers: ApexMarkers;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
};

@Component({
    selector: 'app-total-growth',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './total-growth.component.html',
    styleUrl: './total-growth.component.scss'
})
export class TotalGrowthComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Morning Sales",
                    type: "column",
                    data: [44, 50, 41, 67, 22, 41]
                },
                {
                    name: "Evening Sales",
                    type: "line",
                    data: [42, 54, 43, 62, 24, 42]
                }
            ],
            chart: {
                type: "line",
                height: 130,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 0,
                    horizontal: false,
                    columnWidth: "8px"
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 6,
                strokeWidth: 2,
                hover: {
                    sizeOffset: 1
                }
            },
            colors: [
                "#ebeefd", "#3761ee"
            ],
            stroke: {
                width: [0, 2],
                curve: "smooth"
            },
            grid: {
                show: false,
                strokeDashArray: 0,
                borderColor: "#edeff5"
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
                },
                categories: [
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul"
                ]
            },
            yaxis: {
                labels: {
                    show: false,
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
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val + "k";
                    }
                }
            },
            legend: {
                show: false
            }
        };
    }

}