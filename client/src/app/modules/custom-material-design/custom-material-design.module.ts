import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, 
  MatCheckboxModule, 
  MatSnackBarModule, 
  MatChipsModule, 
  MatDatepickerModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatCheckboxModule, 
    MatSnackBarModule, 
    MatChipsModule, 
    MatDatepickerModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule, 
    MatSnackBarModule, 
    MatChipsModule, 
    MatDatepickerModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule
  ]
})
export class CustomMaterialDesignModule { }
