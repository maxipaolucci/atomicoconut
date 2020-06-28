import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialDesignModule } from '../../modules/shared/custom-material-design.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { CalculatorsRoutingModule } from './calculators-routing.module';
import { EquityComponent } from './components/equity/equity.component';
import { CalculatorsDashboardComponent } from './components/calculators-dashboard/calculators-dashboard.component';
import { HouseFiguresComponent } from './components/house-figures/house-figures.component';


@NgModule({
  imports: [
    CommonModule,
    CalculatorsRoutingModule,
    FormsModule,
    FlexLayoutModule,
    CustomMaterialDesignModule,
    SharedModule
  ],
  declarations: [
    EquityComponent, 
    CalculatorsDashboardComponent, 
    HouseFiguresComponent
  ]
})
export class CalculatorsModule { }
