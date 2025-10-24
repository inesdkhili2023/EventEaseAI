import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexTooltip,
    ApexLegend,
    ApexStroke,
    ApexYAxis,
    ApexTitleSubtitle,
    ApexFill,
    ApexGrid,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
    yaxis: ApexYAxis;
    colors: any;
    legend: ApexLegend;
    fill: ApexFill;
    title: ApexTitleSubtitle;
    grid: ApexGrid;
};

@Component({
    selector: 'app-negative-values-area-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './negative-values-area-chart.component.html',
    styleUrl: './negative-values-area-chart.component.scss'
})
export class NegativeValuesAreaChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "North",
                    data: [
                        {
                            x: 1996,
                            y: 322
                        },
                        {
                            x: 1997,
                            y: 324
                        },
                        {
                            x: 1998,
                            y: 329
                        },
                        {
                            x: 1999,
                            y: 342
                        },
                        {
                            x: 2000,
                            y: 348
                        },
                        {
                            x: 2001,
                            y: 334
                        },
                        {
                            x: 2002,
                            y: 325
                        },
                        {
                            x: 2003,
                            y: 316
                        },
                        {
                            x: 2004,
                            y: 318
                        },
                        {
                            x: 2005,
                            y: 330
                        },
                        {
                            x: 2006,
                            y: 355
                        },
                        {
                            x: 2007,
                            y: 366
                        },
                        {
                            x: 2008,
                            y: 337
                        },
                        {
                            x: 2009,
                            y: 352
                        },
                        {
                            x: 2010,
                            y: 377
                        },
                        {
                            x: 2011,
                            y: 383
                        },
                        {
                            x: 2012,
                            y: 344
                        },
                        {
                            x: 2013,
                            y: 366
                        },
                        {
                            x: 2014,
                            y: 389
                        },
                        {
                            x: 2015,
                            y: 334
                        }
                    ]
                },
                {
                    name: "South",
                    data: [
                        {
                            x: 1996,
                            y: 162
                        },
                        {
                            x: 1997,
                            y: 90
                        },
                        {
                            x: 1998,
                            y: 50
                        },
                        {
                            x: 1999,
                            y: 77
                        },
                        {
                            x: 2000,
                            y: 35
                        },
                        {
                            x: 2001,
                            y: -45
                        },
                        {
                            x: 2002,
                            y: -88
                        },
                        {
                            x: 2003,
                            y: -120
                        },
                        {
                            x: 2004,
                            y: -156
                        },
                        {
                            x: 2005,
                            y: -123
                        },
                        {
                            x: 2006,
                            y: -88
                        },
                        {
                            x: 2007,
                            y: -66
                        },
                        {
                            x: 2008,
                            y: -45
                        },
                        {
                            x: 2009,
                            y: -29
                        },
                        {
                            x: 2010,
                            y: -45
                        },
                        {
                            x: 2011,
                            y: -88
                        },
                        {
                            x: 2012,
                            y: -132
                        },
                        {
                            x: 2013,
                            y: -146
                        },
                        {
                            x: 2014,
                            y: -169
                        },
                        {
                            x: 2015,
                            y: -184
                        }
                    ]
                }
            ],
            chart: {
                type: "area",
                height: 375
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight"
            },
            title: {
                text: "Area with Negative Values",
                align: "left",
                offsetX: -9,
                offsetY: -6,
                style: {
                    fontWeight: '500',
                    fontSize: '14px',
                    color: '#5b5b98'
                }
            },
            colors: [
                "#3761ee", "#0f79f3"
            ],
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
            yaxis: {
                tickAmount: 4,
                floating: false,
                labels: {
                    show: true,
                    style: {
                        colors: "#a9a9c8",
                        fontSize: "13px"
                    },
                    offsetY: -7,
                    offsetX: 0
                },
                axisBorder: {
                    show: false,
                    color: '#edeff5'
                },
                axisTicks: {
                    show: false
                }
            },
            fill: {
                opacity: 0.5
            },
            tooltip: {
                x: {
                    format: "yyyy"
                },
                fixed: {
                    enabled: false,
                    position: "topRight"
                }
            },
            grid: {
                yaxis: {
                    lines: {
                        offsetX: -30
                    }
                },
                padding: {
                    left: 20
                },
                show: true,
                strokeDashArray: 5,
                borderColor: "#edeff5"
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
            }
        };
    }

}