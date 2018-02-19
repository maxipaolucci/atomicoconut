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

@NgModule({
  imports: [
    CommonModule,
    InvestmentsRoutingModule,
    FormsModule,
    FlexLayoutModule,
    CustomMaterialDesignModule,
    SharedModule
  ],
  declarations: [
    CurrencyInvestmentComponent,
    InvestmentsDashboardComponent,
    InvestmentSelectorDialogComponent,
    InvestmentsEditComponent,
    CurrencyInvestmentFormComponent,
    PropertyInvestmentFormComponent
  ],
  entryComponents: [
    InvestmentSelectorDialogComponent //added as material doc suggest to allow AOT on this on the fly created class
  ],
  providers: [ InvestmentsService ]
})
export class InvestmentsModule {}
