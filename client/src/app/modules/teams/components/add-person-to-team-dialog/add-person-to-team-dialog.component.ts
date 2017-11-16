import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-add-person-to-team-dialog',
  templateUrl: './add-person-to-team-dialog.component.html',
  styleUrls: ['./add-person-to-team-dialog.component.scss']
})
export class AddPersonToTeamDialogComponent implements OnInit {

  model : any = { email : null };

  constructor(public dialogRef: MatDialogRef<AddPersonToTeamDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
