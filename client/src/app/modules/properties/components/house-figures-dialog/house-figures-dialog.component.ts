import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-house-figures-dialog',
  templateUrl: './house-figures-dialog.component.html',
  styleUrls: ['./house-figures-dialog.component.scss']
})
export class HouseFiguresDialogComponent implements OnInit {

  model : any = {};
  modelHouseFiguresResults : any = {};

  constructor(public dialogRef: MatDialogRef<HouseFiguresDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.model = data.model;
    this.modelHouseFiguresResults = data.modelHouseFiguresResults;
  }

  ngOnInit() {
  }

}
