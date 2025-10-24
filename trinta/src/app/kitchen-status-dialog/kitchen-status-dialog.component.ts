import { Component, Inject , OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
@Component({
  selector: 'app-kitchen-status-dialog',
  standalone: true,
  imports: [MatTableModule,MatCardModule,MatDialogModule,CommonModule],
  templateUrl: './kitchen-status-dialog.component.html',
  styleUrl: './kitchen-status-dialog.component.scss'
})
export class KitchenStatusDialogComponent {
  displayedColumns: string[] = ['name', 'status'];
  elapsedTime: string = '00:00:00';
  timerInterval: any;
  constructor(
    public dialogRef: MatDialogRef<KitchenStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.startTimer();

  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer(): void {
    const startTime = new Date(this.data.startTime).getTime();

    this.timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const elapsed = now - startTime;
      this.elapsedTime = this.formatTime(elapsed);
      this.cdr.detectChanges();

    }, 1000);
  }

  formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  isTimeExceeded(): boolean {
    const startTime = new Date(this.data.startTime).getTime();
    const now = new Date().getTime();
    const elapsed = now - startTime;
    return elapsed > 30 * 60 * 1000; // 30 minutes in milliseconds
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getCardColor(): string {
    const startTime = new Date(this.data.startTime).getTime();
    const now = new Date().getTime();
    const elapsed = now - startTime;

    if (elapsed > 30 * 60 * 1000) {
      return 'red-card'; // More than 30 minutes
    } else if (elapsed > 15 * 60 * 1000) {
      return 'yellow-card'; // Between 15 and 30 minutes
    } else {
      return 'green-card'; // Less than 15 minutes
    }
  }
}
