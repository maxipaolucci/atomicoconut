import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainNavigatorService } from '../../modules/shared/components/main-navigator/main-navigator.service';
import { UsersService } from '../../modules/users/users.service';
import { AppService } from '../../app.service';
import { User } from '../../modules/users/models/user';
import { AccountPersonal } from '../../modules/users/models/account-personal';
import { AccountFinance } from '../../modules/users/models/account-finance';
import { InvestmentsService } from '../../modules/investments/investments.service';
import { CurrencyExchangeService } from '../../modules/investments/currency-exchange.service';
import { Investment } from '../../modules/investments/models/investment';
import { CurrencyInvestment } from '../../modules/investments/models/currencyInvestment';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { INVESTMENTS_TYPES } from '../../constants';
import { UtilService } from '../../util.service';
import { PropertyInvestment } from '../../modules/investments/models/PropertyInvestment';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  user : User = null;
  wealthAmount : number = 0;
  expectedWealth : number = 0;
  progressBarWealthValue : number = 0;
  subscription : Subscription = new Subscription();

  constructor(private mainNavigatorService : MainNavigatorService, private usersService : UsersService, private appService : AppService, 
      private investmentsService : InvestmentsService, private currencyExchangeService : CurrencyExchangeService, private utilService : UtilService) { }

  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: null, selected: true },
      { displayName: 'Investments', url: '/investments', selected: false },
      { displayName: 'Properties', url: '/properties', selected: false },
      { displayName: 'Calculators', url: '/calculators', selected: false }
    ]);
    
    const userInvestments$ = this.setUserAndGetInvestments();
    const todayCurrencyRates$ = this.currencyExchangeService.getCurrencyRates();

    let newSubscription = userInvestments$.combineLatest(todayCurrencyRates$, (userInvestments : Investment[], todayCurrencyRates : any) => {
      return { userInvestments, todayCurrencyRates};
    }).subscribe((data : any) => {
      console.log(data);
      //iterate investments and sum returns using dated rates.
      for (let investment of data.userInvestments) {
        if (investment instanceof CurrencyInvestment) {
          let myPercentage = (investment.investmentDistribution.filter(portion => portion.email === this.user.email)[0]).percentage;
          
          let currencyInvestment : CurrencyInvestment = <CurrencyInvestment>investment;
          if (investment.type === INVESTMENTS_TYPES.CURRENCY) {
            const investmentDate = this.utilService.formatDate(new Date(), 'YYYY-MM-DD'); //today date
            let myReturnAmount = (currencyInvestment.amount * (data.todayCurrencyRates[investmentDate][`USD${currencyInvestment.unit}`] || 1)) * myPercentage / 100;
            this.wealthAmount += myReturnAmount;
            this.calculateProgressBarWealthValue();
          } else if (investment.type === INVESTMENTS_TYPES.CRYPTO) {
            this.currencyExchangeService.getCryptoRates(currencyInvestment.unit).take(1).subscribe((rates) => {
              let myReturnAmount = (currencyInvestment.amount * rates.price) * myPercentage / 100;
              this.wealthAmount += myReturnAmount;
              this.calculateProgressBarWealthValue();
            },
            (error : any) => {
              this.appService.consoleLog('error', `${methodTrace} There was an error trying to get ${currencyInvestment.unit} rates data > `, error);
              this.appService.showResults(`There was an error trying to get ${currencyInvestment.unit} rates data, please try again in a few minutes.`, 'error');
            });
          }
        }
      }
    }, (error : any) => {
      this.appService.consoleLog('error', `${methodTrace} There was an error when trying to combine today currency rates with user investments observables.`, error);
      this.user = null;
    });

    this.subscription.add(newSubscription);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; //for debugging
    
    //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  /**
   * Sets the user property with the current user or null if nobody logged in yet.
   * 
   * @return {Investment[]} . An array of the logged in user investments or [] if nobody is logged in yet
   */
  setUserAndGetInvestments() {
    let methodTrace = `${this.constructor.name} > setUser() > `; //for debugging

    let gotAuthenticatedUserFromServer = false;
    const user$ = this.usersService.user$.switchMap((user : User) => {
      if (!user) {
        return of(null);
      } else if ((!user.personalInfo || !user.financialInfo) && gotAuthenticatedUserFromServer === false) {
        gotAuthenticatedUserFromServer = true;
        return this.usersService.getAuthenticatedUser({ personalInfo : true, financialInfo : true });
      } else {
        return of(user);
      }
    });

    return user$.switchMap(user => {
      if (user && user.email) {
        let personalInfo = null;
        if (user.personalInfo) {
          personalInfo = new AccountPersonal(user.personalInfo.birthday);
        }

        let financialInfo = null;
        if (user.financialInfo) {
          financialInfo = new AccountFinance(user.financialInfo.annualIncome, user.financialInfo.annualIncomeUnit, 
              user.financialInfo.savings, user.financialInfo.savingsUnit, user.financialInfo.incomeTaxRate);
          
          if (gotAuthenticatedUserFromServer !== null) {
            this.wealthAmount += this.currencyExchangeService.getUsdValueOf(user.financialInfo.savings || 0, user.financialInfo.savingsUnit);
          }
          
          if (user.personalInfo && user.personalInfo.age) {
            this.expectedWealth = this.currencyExchangeService.getUsdValueOf(user.financialInfo.annualIncome || 0, user.financialInfo.annualIncomeUnit) * user.personalInfo.age / 10;
          } else {
            this.expectedWealth = 0;
          }
          
          this.calculateProgressBarWealthValue();
        }
        user = new User(user.name, user.email, user.avatar, financialInfo, personalInfo, user.currency);          
        this.user = user;
        if (gotAuthenticatedUserFromServer) {
          gotAuthenticatedUserFromServer = null; //shut down the flag
          //we just got updated information from server, let's update the current user source
          this.usersService.setUser(user);
        }

        return this.investmentsService.getInvestments(user.email);
      } else {
        this.user = null;
        return of([]);
      }
    });
    
  }

  calculateProgressBarWealthValue() {
    if (!this.expectedWealth) {
      this.progressBarWealthValue = 0;
      return;
    }

    let value = this.wealthAmount * 100 / this.expectedWealth;
    this.progressBarWealthValue = value > 100 ? 100 : value;
  }

}
