import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertiesEditComponent } from './components/properties-edit/properties-edit.component';
import { AuthResolver } from '../../auth-resolver.service';
import { PropertiesDashboardComponent } from './components/properties-dashboard/properties-dashboard.component';

const routes: Routes = [
  {
    path : 'properties',
    children : [
      { 
        path : ':type/create', 
        component : PropertiesEditComponent,
        resolve : {
          authUser : AuthResolver
        } 
      },
      { 
        path : ':type/edit/:id', 
        component : PropertiesEditComponent,
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
