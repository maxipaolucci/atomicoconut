import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { User } from '../../models/user';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { userSelector } from 'src/app/modules/users/user.selectors';
import _ from 'lodash';
import { LoadingData } from 'src/app/models/loadingData';
import { loadingSelector } from 'src/app/app.selectors';
import { DEFAULT_CURRENCY } from 'src/app/constants';
import { AccountFinancialInfoModel } from '../../models/account-financial-info-model';
import { RequestUpdateAccountFinancialInfo } from '../../user.actions';

@Component({
  selector: 'account-finance-info',
  templateUrl: './account-finance-info.component.html',
  styleUrls: ['./account-finance-info.component.scss']
})
export class AccountFinanceInfoComponent implements OnInit, OnDestroy {

  user: User;
  model: AccountFinancialInfoModel = {
    annualIncome : null,
    annualIncomeUnit : null,
    incomeTaxRate : null, 
    savings : null,
    savingsUnit : null
  };
  subscription: Subscription = new Subscription();
  loading$: Observable<LoadingData>;
  
  constructor(private store: Store<State>) {}

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging
    
    // get the user (this is fast)
    this.subscription.add(this.store.select(userSelector()).subscribe((user: User) => this.user = user));
    
    this.model.annualIncomeUnit = this.user.currency || DEFAULT_CURRENCY;
    this.model.savingsUnit = this.user.currency || DEFAULT_CURRENCY;

    if (this.user.financialInfo) {
      Object.assign(this.model, {
        annualIncome : this.user.financialInfo.annualIncome,
        annualIncomeUnit : this.user.financialInfo.annualIncomeUnit,
        incomeTaxRate : this.user.financialInfo.incomeTaxRate,
        savings : this.user.financialInfo.savings,
        savingsUnit : this.user.financialInfo.savingsUnit
      });
    }
    
    this.loading$ = this.store.select(loadingSelector());
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  onCurrencyUnitChange($event: MatSelectChange) {
    if ($event.source.id === 'annualIncomeUnit') {
      this.model.annualIncomeUnit = $event.value;
    } else if ($event.source.id === 'savingsUnit') {
      this.model.savingsUnit = $event.value;
    }
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging

    this.store.dispatch(new RequestUpdateAccountFinancialInfo(_.cloneDeep(this.model)));
  }
}
