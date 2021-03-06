import { Component, OnInit, Inject } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from '../../../../util.service';

@Component({
  selector: 'investment-selector-dialog',
  templateUrl: './investment-selector-dialog.component.html',
  styleUrls: ['./investment-selector-dialog.component.scss']
})
export class InvestmentSelectorDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InvestmentSelectorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public utilService: UtilService) { }
  
  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChange(event: MatButtonToggleChange) {
    this.dialogRef.close();
  }
}
