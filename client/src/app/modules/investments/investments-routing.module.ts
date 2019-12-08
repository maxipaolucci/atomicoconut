import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestmentsDashboardComponent } from './components/investments-dashboard/investments-dashboard.component';
import { InvestmentsEditComponent } from './components/investments-edit/investments-edit.component';
import { UserResolver } from '../users/user-resolver.service';
import { AuthGuard } from '../../auth.guard';
import { InvestmentResolver } from './investment-resolver.service';
import { PropertyResolver } from '../properties/property-resolver.service';

const routes: Routes = [
  {
    path : 'investments',
    canActivate: [ AuthGuard ],
    children : [
      { 
        path : ':type/create', 
        component : InvestmentsEditComponent 
      },
      { 
        // this happens just when creating a new property investment from the properties dashboard
        path : ':type/create/:id',
        component : InvestmentsEditComponent,
        resolve : {
          property : PropertyResolver
        }
      },
      { 
        path : ':type/edit/:id', 
        component : InvestmentsEditComponent,
        resolve : {
          investment : InvestmentResolver
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
