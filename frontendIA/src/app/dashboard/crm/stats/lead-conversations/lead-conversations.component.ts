import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexStroke,
    ApexTooltip,
    ApexYAxis,
    ApexGrid,
    ApexTitleSubtitle,
    ApexLegend,
    NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    colors: string[];
    grid: ApexGrid;
	tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    labels: string[];
    legend: ApexLegend;
    subtitle: ApexTitleSubtitle;
};

@Component({
    selector: 'app-lead-conversations',
    standalone: true,
    imports: [RouterLink, MatCardModule, NgApexchartsModule],
    templateUrl: './lead-conversations.component.html',
    styleUrl: './lead-conversations.component.scss'
})
export class LeadConversationsComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
				{
					name: "Income",
                    data: [11, 32, 45, 36, 36, 52, 41]
				}
            ],
            chart: {
                type: "area",
                height: 115,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#ee8336"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            grid: {
                show: false,
                strokeDashArray: 0,
                borderColor: "#edeff5"
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
                    show: false,
                    style: {
                        colors: "#262626",
                        fontSize: "13px"
                    }
                },
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul"
                ]
            },
            yaxis: {
                labels: {
                    show: false,
                    style: {
                        colors: "#a9a9c8",
                        fontSize: "13px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#edeff5'
                }
            },
            legend: {
                show: false
            },
			tooltip: {
				y: {
					formatter: function(val:any) {
						return "$" + val;
					}
				}
      		}
        };
    }

}