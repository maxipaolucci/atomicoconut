import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquityComponent } from './components/equity/equity.component';
import { CalculatorsDashboardComponent } from './components/calculators-dashboard/calculators-dashboard.component';
import { HouseFiguresComponent } from './components/house-figures/house-figures.component';

const routes: Routes = [
  { 
    path : 'equity', 
    component : EquityComponent 
  },
  { 
    path : 'house-figures', 
    component : HouseFiguresComponent
  },
  { 
    path : '',
    pathMatch : 'full', 
    component : CalculatorsDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorsRoutingModule { }
