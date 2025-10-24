import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart,
    ApexTheme,
    ApexStroke,
    ApexLegend,
    ApexTooltip,
    ApexDataLabels,
    ApexTitleSubtitle,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
    theme: ApexTheme;
    title: ApexTitleSubtitle;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
};
@Component({
    selector: 'app-pie-monochrome-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './pie-monochrome-chart.component.html',
    styleUrl: './pie-monochrome-chart.component.scss'
})
export class PieMonochromeChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [25, 15, 44, 55, 41, 17],
            chart: {
                width: "100%",
                type: "pie"
            },
            labels: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            theme: {
                monochrome: {
                    enabled: true
                }
            },
            title: {
                text: "Number of leads",
                align: "left",
                offsetX: -9,
                style: {
                    fontWeight: '500',
                    fontSize: '14px',
                    color: '#5b5b98'
                }
            },
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