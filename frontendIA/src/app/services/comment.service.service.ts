import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface Comment {
  idComment?: number;
  content: string;
  rating: number;
  createdDate?: string;
  isHidden?: boolean;
  moderationReason?: string;
  event?: any; 
}

export interface Report {
  idReport?: number;
  typeReport: string; 
  reportedAt?: string;
  comment?: Comment;
}

export enum TypeReport {
  SPAM = 'SPAM',
  HARASSMENT = 'HARASSMENT'
}

@Injectable({
  providedIn: 'root'
})

export class CommentServiceService {

  private baseUrl = 'http://localhost:8095/api/comments';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }


addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/addComment`, comment, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/getAllComment`)
      .pipe(
        catchError(this.handleError)
      );
  }


  getCommentById(idComment: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/getComment/${idComment}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.baseUrl}/updateComment`, comment, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  assignReport(idComment: number, typeReport: TypeReport): Observable<Report> {
    // Send the enum value as a string to match backend expectations
    const typeReportString = typeReport.toString();
    console.log('Sending report request:', {
      url: `${this.baseUrl}/assignReport/${idComment}`,
      typeReport: typeReport,
      typeReportString: typeReportString
    });
    
    return this.http.post<Report>(`${this.baseUrl}/assignReport/${idComment}`, typeReportString, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  getAllCommentReports(idComment: number): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/All-Comment-reports/${idComment}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  assignCommentToEvent(idEvent: number, commentRequest: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/assignComment/${idEvent}/comments`, commentRequest, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllEventComments(idEvent: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/All-event-comments/${idEvent}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getVisibleEventComments(idEvent: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/visible-event-comments/${idEvent}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteComment(idComment: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/deleteComment/${idComment}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getHiddenComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/hidden-comments`)
      .pipe(
        catchError(this.handleError)
      );
  }

  toggleCommentVisibility(idComment: number): Observable<Comment> {
    return this.http.put<Comment>(`${this.baseUrl}/toggle-visibility/${idComment}`, {}, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
  

