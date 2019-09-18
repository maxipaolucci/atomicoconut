import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertiesEditComponent } from './components/properties-edit/properties-edit.component';
import { UserResolver } from '../users/user-resolver.service';
import { PropertiesDashboardComponent } from './components/properties-dashboard/properties-dashboard.component';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  {
    path : 'properties',
    canActivate: [ AuthGuard ],
    children : [
      { 
        path : ':type/create', 
        component : PropertiesEditComponent,
        resolve : {
          authUser : UserResolver
        } 
      },
      { 
        path : ':type/edit/:id', 
        component : PropertiesEditComponent,
        resolve : {
          authUser : UserResolver
        } 
      },
      { 
        path : '', 
        pathMatch : 'full',
        component : PropertiesDashboardComponent,
        resolve : {
          authUser : UserResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesRoutingModule { }
