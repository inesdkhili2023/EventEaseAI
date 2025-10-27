import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexTitleSubtitle,
    ApexDataLabels,
    ApexChart,
    ApexPlotOptions,
    ApexLegend,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    plotOptions: ApexPlotOptions;
    legend: ApexLegend;
};

@Component({
    selector: 'app-basic-treemap-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './basic-treemap-chart.component.html',
    styleUrl: './basic-treemap-chart.component.scss'
})
export class BasicTreemapChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    data: [
                        {
                            x: "London",
                            y: 218
                        },
                        {
                            x: "New York",
                            y: 149
                        },
                        {
                            x: "Tokyo",
                            y: 184
                        },
                        {
                            x: "Beijing",
                            y: 55
                        },
                        {
                            x: "Paris",
                            y: 84
                        },
                        {
                            x: "Chicago",
                            y: 31
                        },
                        {
                            x: "Osaka",
                            y: 70
                        },
                        {
                            x: "İstanbul",
                            y: 30
                        },
                        {
                            x: "Bangkok",
                            y: 44
                        },
                        {
                            x: "Madrid",
                            y: 68
                        },
                        {
                            x: "Barcelona",
                            y: 28
                        },
                        {
                            x: "Toronto",
                            y: 19
                        },
                        {
                            x: "Shanghai",
                            y: 29
                        }
                    ]
                }
            ],
            chart: {
                height: 350,
                type: "treemap",
                toolbar: {
                    show: true
                }
            },
            title: {
                text: "Basic Treemap",
                align: "left",
                offsetX: -9,
                style: {
                    fontWeight: '500',
                    fontSize: '14px',
                    color: '#5b5b98'
                }
            }
        };
    }

}