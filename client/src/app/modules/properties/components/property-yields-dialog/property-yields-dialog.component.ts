import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectChange } from '@angular/material';

@Component({
  selector: 'property-yields-dialog',
  templateUrl: './property-yields-dialog.component.html',
  styleUrls: ['./property-yields-dialog.component.scss']
})
export class PropertyYieldsDialogComponent implements OnInit {

  model: any = {};

  grossYield = 0;
  netYield = 0;

  constructor(public dialogRef: MatDialogRef<PropertyYieldsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.model = data.model;
  }

  ngOnInit() { }

  onCurrencyUnitChange($event: MatSelectChange) {
    this.model[$event.source.id] = $event.value;
  }
}
