import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesDashboardComponent } from './components/properties-dashboard/properties-dashboard.component';
import { HousesEditComponent } from './components/houses-edit/houses-edit.component';
import { SharedModule } from '../shared/shared.module';
import { PropertiesService } from './properties.service';

@NgModule({
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    // FormsModule,
    // FlexLayoutModule,
    // CustomMaterialDesignModule,
    SharedModule
  ],
  declarations: [ PropertiesDashboardComponent, HousesEditComponent ],
  providers: [ PropertiesService ]
})
export class PropertiesModule { }
