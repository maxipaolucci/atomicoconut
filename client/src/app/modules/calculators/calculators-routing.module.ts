import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquityComponent } from './components/equity/equity.component';
import { CalculatorsDashboardComponent } from './components/calculators-dashboard/calculators-dashboard.component';

const routes: Routes = [{
  path : 'calculators',
  children : [
    { path : '', component : CalculatorsDashboardComponent },
    { path : 'equity', component : EquityComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatorsRoutingModule { }
