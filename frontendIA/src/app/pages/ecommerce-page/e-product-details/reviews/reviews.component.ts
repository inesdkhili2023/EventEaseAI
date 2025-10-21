import { Component, ViewChild, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FeathericonsModule } from '../../../../icons/feathericons/feathericons.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { CommentServiceService, Comment, TypeReport } from '../../../../services/comment.service.service';
import { ActivatedRoute } from '@angular/router';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';

@Component({
    selector: 'app-reviews',
    standalone: true,
    imports: [
        MatCardModule, 
        MatButtonModule, 
        MatPaginatorModule, 
        MatTableModule, 
        FeathericonsModule, 
        MatProgressBarModule, 
        MatMenuModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        NgIf, 
        NgFor,
        CommonModule
    ],
    templateUrl: './reviews.component.html',
    styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit, OnChanges {

    @Input() eventId?: number; // Receive event ID from parent component
    @Input() event: any; // Receive event data from parent component
    comments: Comment[] = [];
    displayedColumns: string[] = ['reviewer', 'ratings', 'date', 'action'];
    dataSource = new MatTableDataSource<any>();
    selectedRating: number = 0;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private commentService: CommentServiceService,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        // If eventId is not passed as input, try to get it from route
        if (!this.eventId) {
            this.getEventIdFromRoute();
        } else {
            this.loadEventComments();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['eventId'] && changes['eventId'].currentValue && changes['eventId'].currentValue > 0) {
            this.loadEventComments();
        }
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    private getEventIdFromRoute() {
        this.route.params.subscribe(params => {
            // Try different possible parameter names
            this.eventId = params['id'] || params['eventId'] || params['productId'];
            if (this.eventId) {
                this.loadEventComments();
            }
        });
    }

    loadEventComments() {
        if (this.eventId && this.eventId > 0) {
            // Load only visible comments (filtered by moderation)
            this.commentService.getVisibleEventComments(this.eventId).subscribe({
                next: (comments) => {
                    this.comments = comments;
                    this.updateDataSource();
                    this.calculateRatings();
                },
                error: (error) => {
                    console.error('Error loading comments:', error);
                }
            });
        }
    }

    private updateDataSource() {
        const tableData = this.comments.map(comment => ({
            id: comment.idComment, // Add the comment ID
            reviewer: {
                img: 'assets/images/users/user-default.jpg', // Default avatar
                name: 'Anonymous User', // You might want to add user names to your Comment entity
                email: 'user@example.com'
            },
            ratings: {
                stars: this.generateStars(comment.rating),
                review: comment.content
            },
            date: {
                date: this.formatDate(comment.createdDate|| new Date().toISOString()),
                time: this.formatTime(comment.createdDate|| new Date().toISOString())
            },
            action: 'ri-more-fill'
        }));

        this.dataSource.data = tableData;
    }

    generateStars(rating: number): any[] {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push({ star: 'ri-star-fill' });
        }

        if (hasHalfStar) {
            stars.push({ star: 'ri-star-half-fill' });
        }

        const remainingStars = 5 - stars.length;
        for (let i = 0; i < remainingStars; i++) {
            stars.push({ star: 'ri-star-line' });
        }

        return stars;
    }

    private formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

     private formatTime(dateString: string | undefined): string {
        if (!dateString) {
            return 'Unknown time';
        }
        try {
            const date = new Date(dateString);
            return isNaN(date.getTime()) ? 'Invalid time' : date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } catch {
            return 'Invalid time';
        }
    }
    getAverageRating(): number {
        if (this.comments.length === 0) return 0;
        const total = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
        return Math.round((total / this.comments.length) * 10) / 10;
    }

     getRatingCount(rating: number): number {
        return this.comments.filter(comment => Math.floor(comment.rating) === rating).length;
    }

    getRatingPercentage(rating: number): number {
        if (this.comments.length === 0) return 0;
        const count = this.getRatingCount(rating);
        return (count / this.comments.length) * 100;
    }

    // Calculate overall ratings for the event
    calculateRatings() {
        // This would calculate the average rating and distribution
        // You can implement this based on your needs
    }

    // Add a new comment
    addComment(content: string, rating: number) {
        if (!content || !rating || !this.eventId) {
            return;
        }

        const newComment: Comment = {
            content: content,
            rating: rating
        };

        this.commentService.assignCommentToEvent(this.eventId, newComment).subscribe({
            next: (comment) => {
                // Only add the comment to the display if it's not hidden
                if (!comment.isHidden) {
                    this.comments.push(comment);
                    this.updateDataSource();
                } else {
                    // Show a message that the comment was moderated
                    alert('Your comment has been submitted and is under review.');
                }
                
                // Clear the form
                const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
                if (textarea) {
                    textarea.value = '';
                }
                this.selectedRating = 0;
            },
            error: (error) => {
                console.error('Error adding comment:', error);
                alert('Error adding comment. Please try again.');
            }
        });
    }

    // Report a comment
    reportComment(commentId: number) {
        console.log('Reporting comment with ID:', commentId);
        
        const dialogRef = this.dialog.open(ReportDialogComponent, {
            width: '400px',
            data: { commentId: commentId }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('Report type selected:', result);
                console.log('Sending report for comment ID:', commentId);
                
                this.commentService.assignReport(commentId, result).subscribe({
                    next: (report) => {
                        console.log('Comment reported successfully:', report);
                        alert('Comment reported successfully!');
                    },
                    error: (error) => {
                        console.error('Error reporting comment:', error);
                        console.error('Full error details:', error);
                        alert('Error reporting comment. Please try again.');
                    }
                });
            }
        });
    }
}