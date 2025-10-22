import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexChart,
    ApexFill,
    ApexDataLabels,
    ApexStroke,
    ApexTooltip,
    ApexLegend,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: any;
    colors: string[];
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    fill: ApexFill;
    legend: ApexLegend;
    dataLabels: ApexDataLabels;
};

@Component({
    selector: 'app-organic-sessions',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule],
    templateUrl: './organic-sessions.component.html',
    styleUrl: './organic-sessions.component.scss'
})
export class OrganicSessionsComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [50, 30, 25, 20, 15, 10],
            chart: {
                height: 416,
                type: "donut"
            },
            labels: [
                "USA - 50%", "Canada - 30%", "Japan - 25%", "Australia - 20%", "France - 15%", "UK - 10%"
            ],
            stroke: {
                width: 2,
                show: true,
                curve: "smooth"
            },
            dataLabels: {
                enabled: false
            },
            colors: [
                "#2DB6F5", "#6794DC", "#6771DC", "#8067DC", "#A367DC", "#C767DC"
            ],
            legend: {
                offsetY: 0,
                fontSize: "13px",
                position: "bottom",
                horizontalAlign: "left",
                labels: {
                    colors: "#77838F",
                },
                itemMargin: {
                    horizontal: 12,
                    vertical: 8
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            }
        };
    }

}