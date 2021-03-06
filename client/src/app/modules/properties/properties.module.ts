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
import { HouseFiguresDialogComponent } from './components/house-figures-dialog/house-figures-dialog.component';
import { PropertyYieldsDialogComponent } from './components/property-yields-dialog/property-yields-dialog.component';
import { ShareWithDialogComponent } from './components/share-with-dialog/share-with-dialog.component';
import { StoreModule } from '@ngrx/store';
import * as fromProperty from './property.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PropertyEffects } from './property.effects';
import { PropertyResolver } from './property-resolver.service';


@NgModule({
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    FormsModule,
    FlexLayoutModule,
    CustomMaterialDesignModule,
    SharedModule,
    StoreModule.forFeature(fromProperty.propertiesFeatureKey, fromProperty.reducer),
    EffectsModule.forFeature([PropertyEffects])
  ],
  declarations: [ 
    PropertiesDashboardComponent, 
    PropertiesEditComponent, 
    HousesEditComponent, 
    PropertiesTableComponent, 
    PropertySelectorDialogComponent, 
    HouseFiguresDialogComponent, 
    PropertyYieldsDialogComponent,
    ShareWithDialogComponent
  ],
  providers: [ PropertiesService, PropertyResolver ]
})
export class PropertiesModule { }
