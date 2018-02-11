import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HousesEditComponent } from './components/houses-edit/houses-edit.component';
import { AuthResolver } from '../../auth-resolver.service';
import { PropertiesDashboardComponent } from './components/properties-dashboard/properties-dashboard.component';

const routes: Routes = [
  {
    path : 'properties',
    children : [
      { 
        path : 'house/create', 
        component : HousesEditComponent,
        resolve : {
          authUser : AuthResolver
        } 
      },
      { 
        path : 'house/edit/:id', 
        component : HousesEditComponent,
        resolve : {
          authUser : AuthResolver
        } 
      },
      { 
        path : '', 
        pathMatch : 'full',
        component : PropertiesDashboardComponent,
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
export class PropertiesRoutingModule { }
