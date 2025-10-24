import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ApexAxisChartSeries,
    ApexTitleSubtitle,
    ApexChart,
    ApexXAxis,
    ApexYAxis,
    ChartComponent,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    title: ApexTitleSubtitle;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    colors: any;
};

@Component({
    selector: 'app-basic-radar-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './basic-radar-chart.component.html',
    styleUrl: './basic-radar-chart.component.scss'
})
export class BasicRadarChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Trinta",
                    data: [80, 50, 30, 40, 100, 20]
                }
            ],
            chart: {
                height: 350,
                type: "radar",
                toolbar: {
                    show: true
                }
            },
            title: {
                text: "Basic Radar Chart",
                align: "left",
                offsetX: -9,
                style: {
                    fontWeight: '500',
                    fontSize: '14px',
                    color: '#5b5b98'
                }
            },
            xaxis: {
                categories: [
                    "January", "February", "March", "April", "May", "June"
                ],
                labels: {
                    show: true,
                    style: {
                        colors: "#262626",
                        fontSize: "13px"
                    }
                }
            },
            colors: [
                "#3761ee"
            ],
            yaxis: {
                tickAmount: 5
            }
        };
    }

}