import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexStroke,
    ApexResponsive,
    ApexLegend,
    ApexTooltip,
    ApexDataLabels,
    ApexChart,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    stroke: ApexStroke;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    responsive: ApexResponsive[];
    labels: any;
    colors: any;
};

@Component({
    selector: 'app-basic-pie-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './basic-pie-chart.component.html',
    styleUrl: './basic-pie-chart.component.scss'
})
export class BasicPieChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [44, 55, 13, 43, 22],
            chart: {
                width: 380,
                type: "pie"
            },
            labels: [
                "Team A", "Team B", "Team C", "Team D", "Team E"
            ],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ],
            legend: {
                offsetY: 0,
                fontSize: '13px',
                labels: {
                    colors: '#77838f'
                },
                itemMargin: {
                    horizontal: 0,
                    vertical: 5
                }
            },
            stroke: {
                width: 0,
                show: true
            },
            colors: [
                // "#3761ee", "#796df6", "#e74c3c", "#00cae3", "#ffb264"
            ],
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '14px',
                },
                dropShadow: {
                    enabled: false
                }
            },
            tooltip: {
                y: {
                    formatter: function(val:any) {
                        return val + "%";
                    }
                }
            }
        };
    }

}