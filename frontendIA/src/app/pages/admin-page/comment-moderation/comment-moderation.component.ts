import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { CommentServiceService, Comment } from '../../../services/comment.service.service';

@Component({
  selector: 'app-comment-moderation',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './comment-moderation.component.html',
  styleUrl: './comment-moderation.component.scss'
})
export class CommentModerationComponent implements OnInit {
  
  hiddenComments: Comment[] = [];
  displayedColumns: string[] = ['content', 'rating', 'moderationReason', 'createdDate', 'actions'];
  dataSource = new MatTableDataSource<Comment>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private commentService: CommentServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadHiddenComments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadHiddenComments() {
    this.commentService.getHiddenComments().subscribe({
      next: (comments) => {
        this.hiddenComments = comments;
        this.dataSource.data = comments;
      },
      error: (error) => {
        console.error('Error loading hidden comments:', error);
        this.snackBar.open('Error loading hidden comments', 'Close', { duration: 3000 });
      }
    });
  }

  approveComment(comment: Comment) {
    if (comment.idComment) {
      this.commentService.toggleCommentVisibility(comment.idComment).subscribe({
        next: (updatedComment) => {
          this.snackBar.open('Comment approved and made visible', 'Close', { duration: 3000 });
          this.loadHiddenComments(); // Reload the list
        },
        error: (error) => {
          console.error('Error approving comment:', error);
          this.snackBar.open('Error approving comment', 'Close', { duration: 3000 });
        }
      });
    }
  }

  getModerationReasonClass(reason: string): string {
    if (reason.includes('toxic') || reason.includes('obscene') || reason.includes('insult')) {
      return 'text-danger';
    } else if (reason.includes('threat') || reason.includes('hate')) {
      return 'text-warning';
    }
    return 'text-info';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
