import { Component, OnInit, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { User } from '../../models/user';
import { AccountFinance } from '../../models/account-finance';
import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';
import { CurrencyExchangeService } from '../../../../currency-exchange.service';

@Component({
  selector: 'account-finance-info',
  templateUrl: './account-finance-info.component.html',
  styleUrls: ['./account-finance-info.component.scss']
})
export class AccountFinanceInfoComponent implements OnInit {

  @Input() user : User;
  model : any = { 
    email : null, 
    annualIncome : null,
    annualIncomeUnit : null,
    incomeTaxRate : null, 
    savings : null,
    savingsUnit : null
  };
  accountFinanceServiceRunning : boolean = false;

  
  constructor(private usersService : UsersService, private appService : AppService, public currencyExchangeService : CurrencyExchangeService) {}

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    
    this.model.email = this.user.email;
    this.model.annualIncomeUnit = this.user.currency;
    this.model.savingsUnit = this.user.currency;

    if (this.user.financialInfo) {
      this.model = {
        annualIncome : this.user.financialInfo.annualIncome,
        annualIncomeUnit : this.user.financialInfo.annualIncomeUnit,
        incomeTaxRate : this.user.financialInfo.incomeTaxRate,
        savings : this.user.financialInfo.savings,
        savingsUnit : this.user.financialInfo.savingsUnit
      };
    }
  }

  onCurrencyUnitChange($event : MatSelectChange) {
    if ($event.source.id === 'annualIncomeUnit') {
      this.model.annualIncomeUnit = $event.value;
    } else if ($event.source.id === 'savingsUnit') {
      this.model.savingsUnit = $event.value;
    }
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging

    this.accountFinanceServiceRunning = true;

    //call the account service
    this.usersService.updateFinancialInfo(this.model).subscribe(
      (data : any) => {
        if (data === null) {
          let user = this.usersService.getUser();
          user.financialInfo = new AccountFinance(this.model.annualIncome, this.model.annualIncomeUnit, 
            this.model.savings, this.model.savingsUnit, this.model.incomeTaxRate);
          this.usersService.setUser(user);
          
          this.appService.showResults(`Your personal information was successfully updated!.`);
        } else {
          console.error(`${methodTrace} Unexpected data format.`)
        }

        this.accountFinanceServiceRunning = false;
      },
      (error : any) => {
        console.error(`${methodTrace} There was an error with the update personal info service > ${error}`);
        if (error.codeno === 400) {
          //the mail system failed for external reasons
          this.appService.showResults(`There was an error with the personal info service, please try again in a few minutes.`);
        }

        this.accountFinanceServiceRunning = false;
      }
    );
  }
}
