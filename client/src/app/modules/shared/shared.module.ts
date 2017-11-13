import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MainNavigatorComponent } from './components/main-navigator/main-navigator.component';
import { CurrencyUnitComponent } from './components/currency-unit/currency-unit.component';
import { CustomMaterialDesignModule } from '../../modules/shared/custom-material-design.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CustomMaterialDesignModule
  ],
  exports: [ MainNavigatorComponent, CurrencyUnitComponent ],
  declarations: [ MainNavigatorComponent, CurrencyUnitComponent ]
})
export class SharedModule { }
