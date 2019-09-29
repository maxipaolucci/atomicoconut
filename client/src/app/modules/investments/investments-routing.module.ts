import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestmentsDashboardComponent } from './components/investments-dashboard/investments-dashboard.component';
import { InvestmentsEditComponent } from './components/investments-edit/investments-edit.component';
import { AuthResolver } from '../../auth-resolver.service';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  {
    path : 'investments',
    canActivate: [ AuthGuard ],
    children : [
      { 
        path : ':type/create', 
        component : InvestmentsEditComponent,
        resolve : {
          authUser : AuthResolver
        } 
      },
      { 
        path : ':type/create/:id', // this happens just with properties
        component : InvestmentsEditComponent,
        resolve : {
          authUser : AuthResolver
        } 
      },
      { 
        path : ':type/edit/:id', 
        component : InvestmentsEditComponent,
        resolve : {
          authUser : AuthResolver
        } 
      },
      { 
        path : '', 
        pathMatch : 'full',
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
