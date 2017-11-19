import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MainNavigatorComponent } from './components/main-navigator/main-navigator.component';
import { CurrencyUnitComponent } from './components/currency-unit/currency-unit.component';
import { CustomMaterialDesignModule } from '../../modules/shared/custom-material-design.module';
import { YesNoDialogComponent } from './components/yes-no-dialog/yes-no-dialog.component';
import { SnackbarSimpleComponent } from './components/snackbar-simple/snackbar-simple.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FlexLayoutModule,
    CustomMaterialDesignModule
  ],
  exports: [ MainNavigatorComponent, CurrencyUnitComponent, YesNoDialogComponent, SnackbarSimpleComponent ],
  declarations: [ MainNavigatorComponent, CurrencyUnitComponent, YesNoDialogComponent, SnackbarSimpleComponent ],
  entryComponents: [
    YesNoDialogComponent, //added as material doc suggest to allow AOT on this on the fly created class
    SnackbarSimpleComponent
  ]
})
export class SharedModule { }
