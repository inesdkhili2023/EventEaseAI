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
    ApexTitleSubtitle,
    ApexGrid,
    ApexXAxis,
    ApexFill,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    colors: string[];
    grid: ApexGrid;
    xaxis: ApexXAxis;
    fill: ApexFill;
    title: ApexTitleSubtitle;
};

@Component({
    selector: 'app-user-activity',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './user-activity.component.html',
    styleUrl: './user-activity.component.scss'
})
export class UserActivityComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Users Activity",
                    data: [2, 3, 4, 10, 4, 3, 3]
                }
            ],
            chart: {
                height: 225,
                type: "bar",
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 6,
                    columnWidth: '30px'
                }
            },
            colors: [
                "#3354F4"
            ],
            dataLabels: {
                enabled: true,
                formatter: function(val) {
                    return val + "k";
                },
                offsetY: 7,
                style: {
                    fontSize: "12px",
                    fontWeight: '500',
                    colors: ["#ffffff"]
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
                    show: true,
                    style: {
                        colors: "#262626",
                        fontSize: "13px"
                    }
                },
                categories: [
                    "S",
                    "S",
                    "M",
                    "T",
                    "W",
                    "T",
                    "F"
                ]
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    show: false,
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            }
        };
    }

}