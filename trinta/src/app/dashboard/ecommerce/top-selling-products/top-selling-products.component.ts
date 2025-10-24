import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import {
	ChartComponent,
	ApexAxisChartSeries,
	ApexChart,
	ApexXAxis,
	ApexDataLabels,
	ApexStroke,
    ApexGrid,
	ApexYAxis,
	ApexTitleSubtitle,
	ApexMarkers,
	ApexTooltip,
	ApexLegend,
	NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	stroke: ApexStroke;
	dataLabels: ApexDataLabels;
	yaxis: ApexYAxis;
    grid: ApexGrid;
	title: ApexTitleSubtitle;
    markers: ApexMarkers;
	labels: string[];
	legend: ApexLegend;
	tooltip: ApexTooltip;
    colors: string[];
	subtitle: ApexTitleSubtitle;
};

@Component({
    selector: 'app-top-selling-products',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, CarouselModule, NgApexchartsModule],
    templateUrl: './top-selling-products.component.html',
    styleUrl: './top-selling-products.component.scss'
})
export class TopSellingProductsComponent {

	@ViewChild("chart") chart: ChartComponent;
	public chartOptions: Partial<ChartOptions>;

	constructor() {
		this.chartOptions = {
			series: [
				{
					name: "Income",
                    data: [180, 2150, 4000, 3995, 5225]
				}
			],
			chart: {
				type: "area",
				height: 292,
				zoom: {
					enabled: false
				},
                toolbar: {
                    show: false
                }
			},
            colors: [
                "#3761EE"
            ],
			dataLabels: {
				enabled: false
			},
			stroke: {
				curve: "straight",
                width: [3]
			},
            markers: {
                size: 5,
                strokeWidth: 0,
                hover: {
                    sizeOffset: 2
                }
            },
            grid: {
                show: false,
                strokeDashArray: 1,
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
                    "May"
                ]
			},
			yaxis: {
				labels: {
					show: true,
					style: {
						colors: "#262626",
						fontSize: "13px"
					}
				},
				axisBorder: {
					show: false,
					color: '#edeff5'
				}
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

    // Owl Carousel
    productsSlides: OwlOptions = {
        items: 1,
		nav: true,
		margin: 25,
		loop: true,
		dots: false,
		autoplay: false,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-line'></i>",
			"<i class='ri-arrow-right-line'></i>",
		]
    }

}