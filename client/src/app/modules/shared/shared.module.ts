import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MainNavigatorComponent } from './components/main-navigator/main-navigator.component';
import { CurrencyUnitComponent } from './components/currency-unit/currency-unit.component';
import { CustomMaterialDesignModule } from '../../modules/shared/custom-material-design.module';
import { YesNoDialogComponent } from './components/yes-no-dialog/yes-no-dialog.component';
import { SnackbarSimpleComponent } from './components/snackbar-simple/snackbar-simple.component';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { NumberValidatorDirective } from './directives/number-validator.directive';
import { InfoTooltipComponent } from './components/info-tooltip/info-tooltip.component';
import { AddressAutocompleteComponent } from './components/address-autocomplete/address-autocomplete.component';
import { DynamicMapComponent } from './components/dynamic-map/dynamic-map.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../environments/environment';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { FilesUploaderComponent } from './components/files-uploader/files-uploader.component';
import { ProgressBarDialogComponent } from './components/progress-bar-dialog/progress-bar-dialog.component';
import { LinkDialogComponent } from './components/link-dialog/link-dialog.component';
import { StoreModule } from '@ngrx/store';
import { HouseFiguresResultsComponent } from './components/house-figures-results/house-figures-results.component';
import * as fromMainNavigator from './components/main-navigator/main-navigator.reducer';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FlexLayoutModule,
    CustomMaterialDesignModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey,
      libraries: ['places']
    }),
    StoreModule.forFeature(fromMainNavigator.mainNavigatorFeatureKey, fromMainNavigator.reducer),
  ],
  declarations: [ 
    MainNavigatorComponent, 
    CurrencyUnitComponent, 
    YesNoDialogComponent, 
    SnackbarSimpleComponent, 
    EqualValidatorDirective, 
    NumberValidatorDirective,
    InfoTooltipComponent,
    AddressAutocompleteComponent,
    DynamicMapComponent,
    ProgressBarComponent,
    FilesUploaderComponent,
    ProgressBarDialogComponent,
    HouseFiguresResultsComponent,
    LinkDialogComponent
  ],
  exports: [ 
    MainNavigatorComponent, 
    CurrencyUnitComponent, 
    YesNoDialogComponent, 
    SnackbarSimpleComponent,
    EqualValidatorDirective,
    NumberValidatorDirective,
    InfoTooltipComponent,
    AddressAutocompleteComponent,
    DynamicMapComponent,
    ProgressBarComponent,
    FilesUploaderComponent,
    ProgressBarDialogComponent,
    HouseFiguresResultsComponent,
    LinkDialogComponent
  ]
})
export class SharedModule { }
