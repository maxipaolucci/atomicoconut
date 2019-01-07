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
import { HousesEditComponent } from './components/houses-edit/houses-edit.component';
import { PropertiesTableComponent } from './components/properties-table/properties-table.component';
import { PropertySelectorDialogComponent } from './components/property-selector-dialog/property-selector-dialog.component';
import { CalculatorsModule } from '../calculators/calculators.module';
import { HouseFiguresDialogComponent } from './components/house-figures-dialog/house-figures-dialog.component';
import { PropertyYieldsDialogComponent } from './components/property-yields-dialog/property-yields-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    FormsModule,
    FlexLayoutModule,
    CustomMaterialDesignModule,
    SharedModule,
    CalculatorsModule
  ],
  declarations: [ 
    PropertiesDashboardComponent, 
    PropertiesEditComponent, 
    HousesEditComponent, 
    PropertiesTableComponent, 
    PropertySelectorDialogComponent, 
    HouseFiguresDialogComponent, 
    PropertyYieldsDialogComponent 
  ],
  providers: [ PropertiesService ],
  entryComponents: [
    PropertySelectorDialogComponent, // added as material doc suggest to allow AOT on this on the fly created class
    HouseFiguresDialogComponent,
    PropertyYieldsDialogComponent
  ]
})
export class PropertiesModule { }
