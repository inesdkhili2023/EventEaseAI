import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { TypeReport } from '../../../../services/comment.service.service';

@Component({
    selector: 'app-report-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        CommonModule
    ],
    template: `
        <mat-card class="report-dialog-card">
            <mat-card-header>
                <mat-card-title>Report Comment</mat-card-title>
            </mat-card-header>
            <mat-card-content>
                <p>Please select the reason for reporting this comment:</p>
                <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Report Type</mat-label>
                    <mat-select [(value)]="selectedReportType">
                        <mat-option value="SPAM">Spam</mat-option>
                        <mat-option value="HARASSMENT">Harassment</mat-option>
                    </mat-select>
                </mat-form-field>
            </mat-card-content>
            <mat-card-actions align="end">
                <button mat-button (click)="onCancel()">Cancel</button>
                <button mat-button color="warn" (click)="onReport()" [disabled]="!selectedReportType">
                    Report
                </button>
            </mat-card-actions>
        </mat-card>
    `,
    styles: [`
        .report-dialog-card {
            max-width: 400px;
            margin: 0 auto;
        }
        .full-width {
            width: 100%;
        }
        mat-card-content p {
            margin-bottom: 16px;
            color: #666;
        }
    `]
})
export class ReportDialogComponent {
    selectedReportType: TypeReport | null = null;

    constructor(
        public dialogRef: MatDialogRef<ReportDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { commentId: number }
    ) {}

    onCancel(): void {
        this.dialogRef.close();
    }

    onReport(): void {
        if (this.selectedReportType) {
            this.dialogRef.close(this.selectedReportType);
        }
    }
}

