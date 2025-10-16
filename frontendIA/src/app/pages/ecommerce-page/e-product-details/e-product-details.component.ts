import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgFor } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { OutletsDetailsComponent } from './outlets-details/outlets-details.component';
import { ReviewsComponent } from './reviews/reviews.component';

@Component({
    selector: 'app-e-product-details',
    standalone: true,
    imports: [RouterLink, MatCardModule, MatButtonModule, FeathericonsModule, CarouselModule, NgFor, MatProgressBarModule, MatMenuModule, OutletsDetailsComponent, ReviewsComponent],
    templateUrl: './e-product-details.component.html',
    styleUrl: './e-product-details.component.scss'
})
export class EProductDetailsComponent {

    // Product Images
    productImages = [
        {
            url: 'assets/images/products/product-details1.jpg'
        },
        {
            url: 'assets/images/products/product-details2.jpg'
        },
        {
            url: 'assets/images/products/product-details3.jpg'
        },
        {
            url: 'assets/images/products/product-details4.jpg'
        }
    ]
    selectedImage: string;
    changeimage(image: string){
        this.selectedImage = image;
    }

}