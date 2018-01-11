import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA} from '@angular/material';
@Component({
  selector: 'app-snackbar-simple',
  templateUrl: './snackbar-simple.component.html',
  styleUrls: ['./snackbar-simple.component.scss']
})
export class SnackbarSimpleComponent implements OnInit {

  constructor(public snackBarRef : MatSnackBarRef<SnackbarSimpleComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() { }

  actionClicked() {
    this.snackBarRef.dismiss();
  }

}
