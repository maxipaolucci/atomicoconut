import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-property-selector-dialog',
  templateUrl: './property-selector-dialog.component.html',
  styleUrls: ['./property-selector-dialog.component.scss']
})
export class PropertySelectorDialogComponent implements OnInit {

  showLinkToProperties : boolean = false;

  constructor(public dialogRef: MatDialogRef<PropertySelectorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit() { }

  onPropertySelected($event) {
    this.dialogRef.close($event);
  }

  onPropertiesLoad($event) {
    this.showLinkToProperties = $event <= 0;
  }

}
