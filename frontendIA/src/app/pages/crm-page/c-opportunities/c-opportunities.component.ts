import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart,
    NgApexchartsModule
} from "ng-apexcharts";
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    plotOptions: ApexPlotOptions;
    colors: any;
};

@Component({
    selector: 'app-c-opportunities',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, NgApexchartsModule, FeathericonsModule],
    templateUrl: './c-opportunities.component.html',
    styleUrl: './c-opportunities.component.scss'
})
export class COpportunitiesComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [80, 70, 60, 50],
            chart: {
                height: 330,
                type: "radialBar"
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        show: false
                    },
                    track: {
                        margin: 10,
                    },
                    hollow: {
                        size: '35%',
                    }
                }
            },
            labels: [
                "Won", "In Progress", "Lost", "Hot"
            ],
            colors: [
                "#2db6f5", "#c767dc", "#6771dc", "#a367dc"
            ]
        };
    }

}