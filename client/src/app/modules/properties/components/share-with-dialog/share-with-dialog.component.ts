import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'share-with-dialog',
  templateUrl: './share-with-dialog.component.html',
  styleUrls: ['./share-with-dialog.component.scss']
})
export class ShareWithDialogComponent implements OnInit {

  model : any = { email : null };

  constructor(public dialogRef: MatDialogRef<ShareWithDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
