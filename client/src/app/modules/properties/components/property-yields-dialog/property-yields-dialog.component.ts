import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'property-yields-dialog',
  templateUrl: './property-yields-dialog.component.html',
  styleUrls: ['./property-yields-dialog.component.scss']
})
export class PropertyYieldsDialogComponent implements OnInit {

  model: any = {};

  constructor(public dialogRef: MatDialogRef<PropertyYieldsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.model = data.model;
  }

  ngOnInit() { }

}
