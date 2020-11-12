import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'link-dialog',
  templateUrl: './link-dialog.component.html',
  styleUrls: ['./link-dialog.component.scss']
})
export class LinkDialogComponent implements OnInit {

  model: any = {
    displayText: null,
    address: null
  };

  constructor(public dialogRef: MatDialogRef<LinkDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
