import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommentServiceService, Comment } from '../../../services/comment.service.service';

@Component({
  selector: 'app-comment-admin',
  standalone: true,
  providers: [CommentServiceService,HttpClient],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule
  ],
  templateUrl: './comment-admin.component.html',
  styleUrl: './comment-admin.component.scss'
})
export class CommentAdminComponent implements OnInit {
  displayedColumns: string[] = [
    'idComment', 'content', 'rating', 'createdDate', 'moderationReason', 'event'
  ];

  dataSource = new MatTableDataSource<Comment>();
  comments: Comment[] = [];
  searchQuery: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private commentService: CommentServiceService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadComments(): void {
    this.commentService.getAllComments().subscribe({
      next: (comments) => {
        this.comments = comments;
        this.dataSource.data = comments;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error('Error loading comments:', err)
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }

  clearAll(): void {
    this.searchQuery = '';
    this.dataSource.filter = '';
  }





  deleteComment(comment: Comment): void {
    if (confirm('Are you sure you want to delete this comment?')) {
      if (comment.idComment) {
        this.commentService.deleteComment(comment.idComment).subscribe({
          next: (response) => {
            console.log('Comment deleted successfully:', response);
            this.loadComments();
          },
          error: (err) => {
            console.error('Error deleting comment:', err);
            alert('Error deleting comment. Please try again.');
          }
        });
      } else {
        console.error('Comment ID is missing');
        alert('Error: Comment ID is missing');
      }
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  }


}