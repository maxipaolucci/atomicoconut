import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestmentsDashboardComponent } from './components/investments-dashboard/investments-dashboard.component';
import { AuthGuard } from '../../auth.guard';
import { AuthResolver } from '../../auth-resolver.service';

const routes: Routes = [
  {
    path : 'investments',
    canActivate: [ AuthGuard ],
    children : [
      { 
        path : '', 
        component : InvestmentsDashboardComponent,
        resolve : {
          authUser : AuthResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentsRoutingModule { }
