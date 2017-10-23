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
  MatCardModule, 
  MatNativeDateModule
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
    MatCardModule,
    MatNativeDateModule 
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
    MatCardModule,
    MatNativeDateModule
  ]
})
export class CustomMaterialDesignModule { }
