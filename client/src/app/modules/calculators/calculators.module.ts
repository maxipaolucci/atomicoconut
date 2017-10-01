import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialDesignModule } from '../../modules/custom-material-design/custom-material-design.module';

import { CalculatorsRoutingModule } from './calculators-routing.module';
import { EquityComponent } from './components/equity/equity.component';
import { CalculatorsDashboardComponent } from './components/calculators-dashboard/calculators-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    CalculatorsRoutingModule,
    FormsModule,
    FlexLayoutModule,
    CustomMaterialDesignModule
  ],
  declarations: [EquityComponent, CalculatorsDashboardComponent]
})
export class CalculatorsModule { }
