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
  MatNativeDateModule,
  MatTabsModule,
  MatExpansionModule,
  MatTooltipModule
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
    MatNativeDateModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule
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
    MatNativeDateModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule
  ]
})
export class CustomMaterialDesignModule { }
