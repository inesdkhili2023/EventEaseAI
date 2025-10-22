import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart,
    ApexStroke,
    ApexGrid,
    ApexFill,
    ApexLegend,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
    grid: ApexGrid;
    colors: string[];
    legend: ApexLegend;
    stroke: ApexStroke;
    fill: ApexFill;
};

@Component({
    selector: 'app-tasks-performance',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './tasks-performance.component.html',
    styleUrl: './tasks-performance.component.scss'
})
export class TasksPerformanceComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [14, 20, 21, 23, 15],
            chart: {
                type: "polarArea",
                height: 390
            },
            stroke: {
                width: 4,
                colors: ["#ffffff"]
            },
            fill: {
                opacity: 1
            },
            labels: [
                'Completed', 'Active', 'Assigned', 'Pending', 'In Progress '
            ],
            colors: [
                "#ffa5cb", "#9378c9", "#ffcf9f", "#a5dfdf", "#82f0ff"
            ],
            grid: {
                show: true,
                strokeDashArray: 0,
                borderColor: "#f2f2f2"
            },
            legend: {
                show: true,
                offsetX: -40,
                position: 'top',
                fontSize: '13px',
                horizontalAlign: 'left',
                labels: {
                    colors: '#77838f',
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5
                },
                markers: {
                    offsetY: 1
                }
            }
        };
    }

}