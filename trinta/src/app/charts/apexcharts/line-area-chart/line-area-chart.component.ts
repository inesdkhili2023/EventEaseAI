import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexFill,
    ApexStroke,
    ApexYAxis,
    ApexGrid,
    ApexLegend,
    ApexTooltip,
    ApexMarkers,
    ApexXAxis,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    legend: ApexLegend;
    grid: ApexGrid;
    yaxis: ApexYAxis | ApexYAxis[];
    labels: string[];
    stroke: ApexStroke;
    markers: ApexMarkers;
    colors: any;
    fill: ApexFill;
    tooltip: ApexTooltip;
};

@Component({
    selector: 'app-line-area-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './line-area-chart.component.html',
    styleUrl: './line-area-chart.component.scss'
})
export class LineAreaChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Team A",
                    type: "area",
                    data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47]
                },
                {
                    name: "Team B",
                    type: "line",
                    data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61]
                }
            ],
            chart: {
                height: 350,
                type: "line",
                toolbar: {
                    show: false
                }
            },
            stroke: {
                curve: "smooth"
            },
            colors: [
                "#EDEFF5", "#3761EE"
            ],
            fill: {
                type: "solid",
                gradient: {
                    opacityFrom: 0.45,
                    opacityTo: 0.05
                }
            },
            labels: [
                "Dec 01",
                "Dec 02",
                "Dec 03",
                "Dec 04",
                "Dec 05",
                "Dec 06",
                "Dec 07",
                "Dec 08",
                "Dec 09 ",
                "Dec 10"
            ],
            markers: {
                size: 0
            },
            yaxis: [
                {
                    title: {
                        text: "Series A",
                        style: {
                            color: "#475569",
                            fontSize: "14px",
                            fontWeight: 500
                        }
                    },
                    labels: {
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
                {
                    opposite: true,
                    title: {
                        text: "Series B",
                        style: {
                            color: "#475569",
                            fontSize: "14px",
                            fontWeight: 500
                        }
                    },
                    labels: {
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
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function(y) {
                        if (typeof y !== "undefined") {
                            return y.toFixed(0) + " points";
                        }
                        return y;
                    }
                }
            },
            legend: {
                show: true,
                offsetY: 10,
                fontSize: '13px',
                position: "bottom",
                horizontalAlign: "center",
                labels: {
                    colors: '#77838f',
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 5
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