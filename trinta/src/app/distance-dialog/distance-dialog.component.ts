import { Component,OnInit } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-distance-dialog',
  standalone:true,
  imports:[MatSelectModule,FormsModule,CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './distance-dialog.component.html',
  styleUrls: ['./distance-dialog.component.scss']
})
export class DistanceDialogComponent {
  distanceForm: FormGroup;
  numbers: string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
  constructor(public dialogRef: MatDialogRef<DistanceDialogComponent>) {
    this.distanceForm = new FormGroup({
      distance: new FormControl('0'),
      unit: new FormControl('MILE')
    });
    
  }
  ngOnInit(): void {}
  
  onInputFocus(): void {
    let currentDistance = this.distanceForm.controls['distance'].value;
    if (currentDistance === '0') {
      this.distanceForm.controls['distance'].setValue('');
    }
  }
  appendNumber(number: string): void {
    let currentDistance = this.distanceForm.controls['distance'].value;
    if (currentDistance === '0'|| currentDistance === '') {
      currentDistance = number;
    } else {
      currentDistance += number;
    }
    this.distanceForm.controls['distance'].setValue(currentDistance);
  }

  appendDecimal(): void {
    let currentDistance = this.distanceForm.controls['distance'].value;
    if (!currentDistance.includes('.')) {
      currentDistance += '.';
    }
    this.distanceForm.controls['distance'].setValue(currentDistance);
  }

  clear(): void {
    this.distanceForm.controls['distance'].setValue('0');
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    this.dialogRef.close({ distance: this.distanceForm.controls['distance'].value, unit: this.distanceForm.controls['unit'].value });
  }
}
