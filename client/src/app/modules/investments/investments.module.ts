import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentsRoutingModule } from './investments-routing.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialDesignModule } from '../../modules/shared/custom-material-design.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { InvestmentsDashboardComponent } from './components/investments-dashboard/investments-dashboard.component';
import { CurrencyInvestmentComponent } from './components/currency-investment/currency-investment.component';
import { InvestmentSelectorDialogComponent } from './components/investment-selector-dialog/investment-selector-dialog.component';
import { InvestmentsEditComponent } from './components/investments-edit/investments-edit.component';
import { CurrencyInvestmentFormComponent } from './components/currency-investment-form/currency-investment-form.component';
import { InvestmentsService } from './investments.service';
import { PropertyInvestmentFormComponent } from './components/property-investment-form/property-investment-form.component';
import { PropertyInvestmentComponent } from './components/property-investment/property-investment.component';
import { StoreModule } from '@ngrx/store';
import * as fromInvestment from './investment.reducer';
import { EffectsModule } from '@ngrx/effects';
import { InvestmentEffects } from './investment.effects';
import { InvestmentResolver } from './investment-resolver.service';
import { PropertyResolver } from '../properties/property-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    InvestmentsRoutingModule,
    FormsModule,
    FlexLayoutModule,
    CustomMaterialDesignModule,
    SharedModule,
    StoreModule.forFeature(fromInvestment.investmentsFeatureKey, fromInvestment.reducer),
    EffectsModule.forFeature([InvestmentEffects])
  ],
  declarations: [
    CurrencyInvestmentComponent,
    InvestmentsDashboardComponent,
    InvestmentSelectorDialogComponent,
    InvestmentsEditComponent,
    CurrencyInvestmentFormComponent,
    PropertyInvestmentFormComponent,
    PropertyInvestmentComponent
  ],
  entryComponents: [
    InvestmentSelectorDialogComponent // added as material doc suggest to allow AOT on this on the fly created class
  ],
  providers: [ InvestmentsService, InvestmentResolver, PropertyResolver ]
})
export class InvestmentsModule {}
