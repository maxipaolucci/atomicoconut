import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoadingData } from '../../../../models/loadingData';

@Component({
  selector: 'progress-bar-dialog',
  templateUrl: './progress-bar-dialog.component.html',
  styleUrls: ['./progress-bar-dialog.component.scss']
})
export class ProgressBarDialogComponent implements OnInit {

  color: string = 'primary';
  message: string = '';
  extraClasses: string = '';

  constructor(public dialogRef: MatDialogRef<ProgressBarDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: LoadingData) { }
  
  ngOnInit() {
    this.color = this.data.color ? this.data.color : this.color;
    this.message = this.data.message ? this.data.message : this.message;
    this.extraClasses = this.data.extraClasses ? this.data.extraClasses : this.extraClasses;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
