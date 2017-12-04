import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentsRoutingModule } from './investments-routing.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialDesignModule } from '../../modules/shared/custom-material-design.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { InvestmentsDashboardComponent } from './components/investments-dashboard/investments-dashboard.component';
import { CryptoCurrencyComponent } from './components/crypto-currency/crypto-currency.component';
import { CryptoCurrencyService } from './components/crypto-currency/crypto-currency.service';
import { InvestmentSelectorDialogComponent } from './components/investment-selector-dialog/investment-selector-dialog.component';
import { InvestmentsEditComponent } from './components/investments-edit/investments-edit.component';
import { CurrencyInvestmentComponent } from './components/currency-investment/currency-investment.component';
import { InvestmentsService } from './investments.service';

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
    CryptoCurrencyComponent,
    InvestmentsDashboardComponent,
    InvestmentSelectorDialogComponent,
    InvestmentsEditComponent,
    CurrencyInvestmentComponent
  ],
  entryComponents: [
    InvestmentSelectorDialogComponent //added as material doc suggest to allow AOT on this on the fly created class
  ],
  providers: [ CryptoCurrencyService, InvestmentsService ]
})
export class InvestmentsModule {}
