import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import {
    ApexAxisChartSeries,
    ApexTitleSubtitle,
    ApexChart,
    ApexXAxis,
    ApexFill,
    ApexDataLabels,
    ChartComponent,
    ApexStroke,
    ApexPlotOptions,
    ApexYAxis,
    ApexMarkers,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    title: ApexTitleSubtitle;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    tooltip: any;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    colors: string[];
    yaxis: ApexYAxis;
    markers: ApexMarkers;
    xaxis: ApexXAxis;
};

@Component({
    selector: 'app-deals-statistics',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './deals-statistics.component.html',
    styleUrl: './deals-statistics.component.scss'
})
export class DealsStatisticsComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Won",
                    data: [20, 100, 40, 30, 50, 80, 33]
                }
            ],
            chart: {
                height: 410,
                type: "radar",
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '11px',
                    fontWeight: '500',
                }
            },
            plotOptions: {
                radar: {
                    polygons: {
                        fill: {
                            colors: ["#feeaf3", "#ffffff"]
                        }
                    }
                }
            },
            colors: [
                "#00B69B"
            ],
            markers: {
                size: 4,
                colors: ["#00B69B"],
                strokeColors: ["#00B69B"],
                strokeWidth: 2
            },
            tooltip: {
                y: {
                    formatter: function(val:any) {
                        return val;
                    }
                }
            },
            xaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: "#a9a9c8",
                        fontSize: "13px"
                    }
                },
                categories: [
                    "2021",
                    "2022",
                    "2023",
                    "2024",
                    "2018",
                    "2019",
                    "2020"
                ]
            },
            yaxis: {
                tickAmount: 5
            }
        };
    }

}