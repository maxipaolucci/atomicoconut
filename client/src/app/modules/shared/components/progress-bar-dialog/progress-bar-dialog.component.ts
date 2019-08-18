import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'progress-bar-dialog',
  templateUrl: './progress-bar-dialog.component.html',
  styleUrls: ['./progress-bar-dialog.component.scss']
})
export class ProgressBarDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProgressBarDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
