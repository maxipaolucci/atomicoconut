import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesDashboardComponent } from './components/properties-dashboard/properties-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PropertiesService } from './properties.service';
import { CustomMaterialDesignModule } from '../shared/custom-material-design.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PropertiesEditComponent } from './components/properties-edit/properties-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    FormsModule,
    FlexLayoutModule,
    CustomMaterialDesignModule,
    SharedModule
  ],
  declarations: [ PropertiesDashboardComponent, PropertiesEditComponent ],
  providers: [ PropertiesService ]
})
export class PropertiesModule { }
