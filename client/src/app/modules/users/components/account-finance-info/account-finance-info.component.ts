import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { User } from '../../models/user';
import { AccountFinance } from '../../models/account-finance';
import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'account-finance-info',
  templateUrl: './account-finance-info.component.html',
  styleUrls: ['./account-finance-info.component.scss']
})
export class AccountFinanceInfoComponent implements OnInit, OnDestroy {

  @Input() user: User;
  model: any = { 
    email : null, 
    annualIncome : null,
    annualIncomeUnit : null,
    incomeTaxRate : null, 
    savings : null,
    savingsUnit : null
  };
  accountFinanceServiceRunning = false;
  subscription: Subscription = new Subscription();
  
  constructor(private usersService: UsersService, private appService: AppService) {}

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging
    
    this.model.email = this.user.email;
    this.model.annualIncomeUnit = this.user.currency;
    this.model.savingsUnit = this.user.currency;

    if (this.user.financialInfo) {
      Object.assign(this.model, {
        annualIncome : this.user.financialInfo.annualIncome,
        annualIncomeUnit : this.user.financialInfo.annualIncomeUnit,
        incomeTaxRate : this.user.financialInfo.incomeTaxRate,
        savings : this.user.financialInfo.savings,
        savingsUnit : this.user.financialInfo.savingsUnit
      });
    }
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
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

    this.accountFinanceServiceRunning = true;

    // call the account service
    const newSubscription: Subscription = this.usersService.updateFinancialInfo$(this.model).subscribe(
      (user: User) => {
        if (user) {
          this.appService.showResults(`Your financial information was successfully updated!.`, 'success');
        }

        this.accountFinanceServiceRunning = false;
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.accountFinanceServiceRunning = false;
      }
    );
    this.subscription.add(newSubscription);
  }
}
