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
  MatProgressSpinnerModule,
  MatCardModule, 
  MatNativeDateModule,
  MatTabsModule,
  MatExpansionModule,
  MatTooltipModule,
  MatDialogModule,
  MatSelectModule
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
    MatProgressSpinnerModule,
    MatCardModule,
    MatNativeDateModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule
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
    MatProgressSpinnerModule,
    MatCardModule,
    MatNativeDateModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class CustomMaterialDesignModule { }
