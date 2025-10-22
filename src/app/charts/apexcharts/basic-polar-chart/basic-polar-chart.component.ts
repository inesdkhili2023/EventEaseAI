import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart,
    ApexStroke,
    ApexGrid,
    ApexPlotOptions,
    ApexLegend,
    ApexFill,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
    plotOptions: ApexPlotOptions;
    legend: ApexLegend;
    grid: ApexGrid;
    stroke: ApexStroke;
    fill: ApexFill;
};

@Component({
    selector: 'app-basic-polar-chart',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './basic-polar-chart.component.html',
    styleUrl: './basic-polar-chart.component.scss'
})
export class BasicPolarChartComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                14, 23, 21, 17, 15, 10, 12, 17, 21
            ],
            chart: {
                type: "polarArea"
            },
            stroke: {
                colors: ["#ffffff"]
            },
            fill: {
                opacity: 0.8
            },
            plotOptions: {
                polarArea: {
                    rings: {
                        strokeWidth: 1,
                        strokeColor: '#edeff5',
                    },
                    spokes: {
                        strokeWidth: 1,
                        connectorColors: '#edeff5',
                    }
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
            labels: [
                'Bananas', 'Apples', 'Grapes', 'Papayas', 'Mangos', 'Blueberrys', 'Cherrys', 'Oranges', 'Pineapples'
            ],
            grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#edeff5"
            },
            legend: {
                offsetY: 0,
                fontSize: "13px",
                labels: {
                    colors: '#77838f'
                },
                itemMargin: {
                    horizontal: 0,
                    vertical: 7
                }
            }
        };
    }

}