import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestmentsDashboardComponent } from './components/investments-dashboard/investments-dashboard.component';
import { InvestmentsEditComponent } from './components/investments-edit/investments-edit.component';
import { UserResolver } from '../users/user-resolver.service';
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
          authUser : UserResolver
        } 
      },
      { 
        path : ':type/create/:id', // this happens just with properties
        component : InvestmentsEditComponent,
        resolve : {
          authUser : UserResolver
        } 
      },
      { 
        path : ':type/edit/:id', 
        component : InvestmentsEditComponent,
        resolve : {
          authUser : UserResolver
        } 
      },
      { 
        path : '', 
        pathMatch : 'full',
        component : InvestmentsDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentsRoutingModule { }
