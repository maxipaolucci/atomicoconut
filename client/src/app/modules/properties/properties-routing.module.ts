import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertiesEditComponent } from './components/properties-edit/properties-edit.component';
import { PropertiesDashboardComponent } from './components/properties-dashboard/properties-dashboard.component';
import { PropertyResolver } from './property-resolver.service';

const routes: Routes = [  
  { 
    path : ':type/create', 
    component : PropertiesEditComponent
  },
  { 
    path : ':type/edit/:id', 
    component : PropertiesEditComponent,
    resolve : {
      property : PropertyResolver
    } 
  },
  { 
    path : '', 
    pathMatch : 'full',
    component : PropertiesDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesRoutingModule { }
