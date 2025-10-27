import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../../icons/feathericons/feathericons.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule, NgFor } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { OutletsDetailsComponent } from './outlets-details/outlets-details.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ActivatedRoute } from '@angular/router';
import { EventService,Event } from '../../../services/event.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommentServiceService } from '../../../services/comment.service.service';

@Component({
    selector: 'app-e-product-details',
    standalone: true,
    providers: [
    EventService,CommentServiceService
  ],
    imports: [CommonModule,HttpClientModule, RouterLink, MatCardModule, MatButtonModule, FeathericonsModule, CarouselModule, NgFor, MatProgressBarModule, MatMenuModule, OutletsDetailsComponent, ReviewsComponent,HttpClientModule],
    templateUrl:'./e-product-details.component.html',
    styleUrl: './e-product-details.component.scss'
})
export class EProductDetailsComponent implements OnInit{
event: Event | null = null;
  isLoading = true;

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(+id).subscribe({
        next: (data) => {
          this.event = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading event', err);
          this.isLoading = false;
        }
      });
    }
  }
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