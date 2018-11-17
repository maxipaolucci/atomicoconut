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
import { Subscription, of, from, Observable } from 'rxjs';
import { switchMap, take, flatMap, combineLatest, concatMap } from 'rxjs/operators';
import { INVESTMENTS_TYPES } from '../../constants';
import { UtilService } from '../../util.service';
import { PropertyInvestment } from '../../modules/investments/models/PropertyInvestment';
import { start } from 'repl';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  user: User = null;
  wealthAmount = 0;
  expectedWealth = 0;
  progressBarWealthValue = 0;
  subscription: Subscription = new Subscription();

  constructor(private mainNavigatorService: MainNavigatorService, private usersService: UsersService, private appService: AppService, 
      private investmentsService: InvestmentsService, private currencyExchangeService: CurrencyExchangeService, private utilService: UtilService) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: null, selected: true },
      { displayName: 'Investments', url: '/investments', selected: false },
      { displayName: 'Properties', url: '/properties', selected: false },
      { displayName: 'Calculators', url: '/calculators', selected: false }
    ]);
    
    let currentUserInvestments: Investment[] = [];
    const newSubscription: Subscription = this.setUserAndGetInvestments$().pipe(
      flatMap((userInvestments: Investment[]) => {
        currentUserInvestments = userInvestments;
        const investmentsDates: string[] = userInvestments.map((investment: Investment) => {
          if (investment instanceof CurrencyInvestment) {  
            return this.utilService.formatDate((<CurrencyInvestment>investment).buyingDate);
          } else if (investment instanceof PropertyInvestment) {
            return this.utilService.formatDate((<PropertyInvestment>investment).buyingDate);
          }

          return this.utilService.formatToday(); // this should never happen. BuyingDate is required in investments
        });
        
        return this.currencyExchangeService.getCurrencyRates$(investmentsDates);
      }),
      flatMap((currencyRates: any): Observable<any> => {
        const investmentsWithRates: any[] = currentUserInvestments.map((investment: Investment) => {
          return { currencyRates, investment };
        });

        return from(investmentsWithRates);
      }),
      flatMap((investmentWithRates: any): Observable<any> => {
        console.log(investmentWithRates);
        const myPercentage = (investmentWithRates.investment.investmentDistribution.filter(portion => portion.email === this.user.email)[0]).percentage;

        if (investmentWithRates.investment instanceof CurrencyInvestment) {
          const currencyInvestment: CurrencyInvestment = <CurrencyInvestment>investmentWithRates.investment;

          if (investmentWithRates.investment.type === INVESTMENTS_TYPES.CURRENCY) {
            this.wealthAmount += ((currencyInvestment.amount * (investmentWithRates['currencyRates'][this.utilService.formatToday()][`USD${currencyInvestment.unit}`] || 1)) 
                - (currencyInvestment.loanAmount / (investmentWithRates['currencyRates'][this.utilService.formatDate(currencyInvestment.buyingDate)][`USD${currencyInvestment.loanAmountUnit}`] || 1)))
                * myPercentage / 100;
            this.calculateProgressBarWealthValue();
            return of(null);
          } else if (investmentWithRates.investment.type === INVESTMENTS_TYPES.CRYPTO) {
            return this.currencyExchangeService.getCryptoRates$(currencyInvestment.unit).pipe(
              take(1),
              ...
            );
          }
        } else if (investmentWithRates.investment instanceof PropertyInvestment) {
          const propertyInvestment: PropertyInvestment = <PropertyInvestment>investmentWithRates.investment;
          this.wealthAmount += (this.currencyExchangeService.getUsdValueOf(propertyInvestment.property.marketValue, propertyInvestment.property.marketValueUnit)
              - (propertyInvestment.loanAmount / (investmentWithRates['currencyRates'][this.utilService.formatDate(propertyInvestment.buyingDate)][`USD${propertyInvestment.loanAmountUnit}`] || 1)))
              * myPercentage / 100;
          this.calculateProgressBarWealthValue();
          return of(null);
        } else {
          this.appService.consoleLog('error', `${methodTrace} Investment type not recognized by this component: ${investmentWithRates.investment.type}`);
          return of(null); // should never happen
        }
        
      })
    ).subscribe((data) => {
      if (data) {
        this.wealthAmount += ((data.investment.amount * data.cryptoRates.price) 
            - (data.investment.loanAmount / (data['currencyRates'][this.utilService.formatDate(data.investment.buyingDate)][`USD${data.investment.loanAmountUnit}`] || 1)))
            * myPercentage / 100;
        this.calculateProgressBarWealthValue();
      }
      
    },
    (error: any) => {
      this.appService.consoleLog('error', `${methodTrace} There was an error trying to get ${currencyInvestment.unit} rates data > `, error);
      this.appService.showResults(`There was an error trying to get ${currencyInvestment.unit} rates data, please try again in a few minutes.`, 'error');
    });

    this.subscription.add(newSubscription);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging
    
    // this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  /**
   * Sets the user property with the current user or null if nobody logged in yet.
   * 
   * @return { Observable<Investment[]> } . An observable with array of the logged in user investments or [] if nobody is logged in yet
   */
  setUserAndGetInvestments$(): Observable<Investment[]> {
    const methodTrace = `${this.constructor.name} > setUserAndGetInvestments$() > `; // for debugging

    let gotAuthenticatedUserFromServer = false;
    return  this.usersService.user$.pipe(
      flatMap((user: User) => {
        if (!user) {
          return of(null);
        } else if ((!user.personalInfo || !user.financialInfo) && gotAuthenticatedUserFromServer === false) {
          gotAuthenticatedUserFromServer = true;
          return this.usersService.getAuthenticatedUser$({ personalInfo : true, financialInfo : true });
        } else {
          return of(user);
        }
      }),
      flatMap((user: User) => {
        this.user = user;

        if (user) {
          if (user.financialInfo) {
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
          
          if (gotAuthenticatedUserFromServer) {
            gotAuthenticatedUserFromServer = null; // shut down the flag
          }
  
          return this.investmentsService.getInvestments$(user.email);
        }
        
        return of([]);
      })
    );
    
  }

  calculateProgressBarWealthValue() {
    if (!this.expectedWealth) {
      this.progressBarWealthValue = 0;
      return;
    }

    const value = this.wealthAmount * 100 / this.expectedWealth;
    this.progressBarWealthValue = value > 100 ? 100 : value;
  }

}
