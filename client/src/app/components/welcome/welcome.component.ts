import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { MainNavigatorService } from '../../modules/shared/components/main-navigator/main-navigator.service';
import { UsersService } from '../../modules/users/users.service';
import { AppService } from '../../app.service';
import { User } from '../../modules/users/models/user';
import { AccountPersonal } from '../../modules/users/models/account-personal';
import { AccountFinance } from '../../modules/users/models/account-finance';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  user : User = null;

  constructor(private mainNavigatorService : MainNavigatorService, private usersService : UsersService, private appService : AppService) { }

  ngOnInit() {
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: null, selected: true },
      { displayName: 'Investments', url: '/investments', selected: false },
      { displayName: 'Calculators', url: '/calculators', selected: false   }]);
    
    this.setUser();
  }

  /**
   * Sets the user property with the current user or null of nobody logged in yet
   */
  setUser() {
    let methodTrace = `${this.constructor.name} > setUser() > `; //for debugging

    let parseNewData = false;
    const user$ = this.usersService.user$.switchMap((user : User) => {
      if (!user) {
        return Observable.of(null);
      } else if (user.financialInfo) {
        return Observable.of(user); 
      } else {
        parseNewData = true;
        return this.usersService.getAuthenticatedUser({ personalInfo : true, financialInfo : true });
      }
    });

    user$.subscribe(user => {
      if (user && user.email) {
        if (parseNewData) {
          parseNewData = false; //prevent cycles when we feed the user source setting the new user
          let personalInfo = null;
          if (user.personalInfo) {
            personalInfo = new AccountPersonal(user.personalInfo.birthday);
          }
  
          let financialInfo = null;
          if (user.financialInfo) {
            financialInfo = new AccountFinance(user.financialInfo.annualIncome, user.financialInfo.annualIncomeUnit, 
                user.financialInfo.savings, user.financialInfo.savingsUnit, user.financialInfo.incomeTaxRate);
          }
          user = new User(user.name, user.email, user.avatar, user.accessToInvestments, financialInfo, personalInfo, user.currency);          
          this.usersService.setUser(user);
        }
        
        this.user = user;
      } else {
        this.user = null;
      }
      
    },
    (error : any) => {
      this.appService.consoleLog('error', `${methodTrace} There was an error with the getAuthenticatedUser service.`, error);
      this.user = null;
    });
  }

}
