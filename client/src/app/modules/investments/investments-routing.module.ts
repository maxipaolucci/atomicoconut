import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { CrytoCurrencyService } from './investments/crypto-currency/crypto-currency.service';
import { InvestmentsComponent } from './investments.component';
import { InvestmentsDashboardComponent } from './components/investments-dashboard/investments-dashboard.component';
import { AuthResolver } from '../../auth-resolver.service';

const routes: Routes = [
  {
    path : 'investments',
    component : InvestmentsComponent,
    resolve : {
      authUser : AuthResolver
    },
    children : [
      { path : '', component : InvestmentsDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentsRoutingModule { }
