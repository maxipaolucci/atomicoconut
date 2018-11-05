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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FlexLayoutModule,
    CustomMaterialDesignModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey,
      libraries: ["places"]
    }),
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
    ProgressBarComponent
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
    ProgressBarComponent
  ],
  entryComponents: [
    YesNoDialogComponent, //added as material doc suggest to allow AOT on this on the fly created class
    SnackbarSimpleComponent
  ]
})
export class SharedModule { }
