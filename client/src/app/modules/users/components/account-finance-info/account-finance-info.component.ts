import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {User} from '../../models/user';
import {AccountFinance} from '../../models/account-finance';
import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';

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
    incomeTaxRate : null, 
    netWorth : null
  };
  accountFinanceServiceRunning : boolean = false;

  constructor(private usersService : UsersService, private appService : AppService) {}

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    
    if (this.user.financialInfo) {
      this.model = {
        annualIncome : this.user.financialInfo.annualIncome,
        incomeTaxRate : this.user.financialInfo.incomeTaxRate,
        netWorth : this.user.financialInfo.netWorth
      };
    }

    this.model.email = this.user.email;
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging

    this.accountFinanceServiceRunning = true;
    //call the account service
    this.usersService.updateFinancialInfo(this.model).subscribe(
      (data : any) => {
        if (data === null) {
          this.usersService.user.financialInfo = new AccountFinance(this.model.annualIncome, this.model.incomeTaxRate, this.model.netWorth);
          console.log(this.usersService.user);
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
