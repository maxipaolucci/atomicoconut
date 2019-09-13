import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainNavigatorService } from '../../modules/shared/components/main-navigator/main-navigator.service';
import { UsersService } from '../../modules/users/users.service';
import { AppService } from '../../app.service';
import { User } from '../../modules/users/models/user';
import { InvestmentsService } from '../../modules/investments/investments.service';
import { CurrencyExchangeService } from '../../modules/investments/currency-exchange.service';
import { Investment } from '../../modules/investments/models/investment';
import { CurrencyInvestment } from '../../modules/investments/models/currencyInvestment';
import { Subscription, of, from, Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { INVESTMENTS_TYPES, SnackbarNotificationTypes, ConsoleNotificationTypes } from '../../constants';
import { UtilService } from '../../util.service';
import { PropertyInvestment } from '../../modules/investments/models/propertyInvestment';

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
    
    this.generateWealthComponentInfo();
  }

  ngOnDestroy() {
    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  generateWealthComponentInfo() {
    const methodTrace = `${this.constructor.name} > generateWealthComponentInfo() > `; // for debugging

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
        const investmentsAndCurrencyRates: any[] = currentUserInvestments.map((investment: Investment) => {
          return { currencyRates, investment };
        });

        return from(investmentsAndCurrencyRates);
      }),
      flatMap((investmentAndCurrencyRates: any): Observable<any> => {
        const myPercentage = (investmentAndCurrencyRates.investment.investmentDistribution.filter(portion => portion.email === this.user.email)[0]).percentage;

        if (investmentAndCurrencyRates.investment instanceof CurrencyInvestment) {
          const investment: CurrencyInvestment = <CurrencyInvestment>investmentAndCurrencyRates.investment;

          if (investment.type === INVESTMENTS_TYPES.CURRENCY) {
            this.wealthAmount += ((investment.amount * (investmentAndCurrencyRates['currencyRates'][this.utilService.formatToday()][`USD${investment.unit}`] || 1)) 
                - (investment.loanAmount / (investmentAndCurrencyRates['currencyRates'][this.utilService.formatDate(investment.buyingDate)][`USD${investment.loanAmountUnit}`] || 1)))
                * myPercentage / 100;
            this.calculateProgressBarWealthValue();
            return of(null);
          } else if (investment.type === INVESTMENTS_TYPES.CRYPTO) {
            return this.currencyExchangeService.getCryptoRates$(investment.unit).pipe(
              map((cryptoRates) => {
                return { cryptoRates, myPercentage, investment, currencyRates: investmentAndCurrencyRates.currencyRates };
              })
            );
          } else {
            this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Currency Investment type not recognized by this component: ${investment.type}`);
            return of(null); // should never happen
          }
        } else if (investmentAndCurrencyRates.investment instanceof PropertyInvestment) {
          const investment: PropertyInvestment = <PropertyInvestment>investmentAndCurrencyRates.investment;
          this.wealthAmount += (this.currencyExchangeService.getUsdValueOf(investment.property.marketValue, investment.property.marketValueUnit)
              - (investment.loanAmount / (investmentAndCurrencyRates['currencyRates'][this.utilService.formatDate(investment.buyingDate)][`USD${investment.loanAmountUnit}`] || 1)))
              * myPercentage / 100;
          this.calculateProgressBarWealthValue();
          return of(null);
        } else {
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Investment type not recognized by this component: ${investmentAndCurrencyRates.investment.type}`);
          return of(null); // should never happen
        }
        
      })
    ).subscribe((data) => {
      if (data) {
        // this is a crryptorate investment (all the others returns null)
        this.wealthAmount += ((data.investment.amount * data.cryptoRates.price) 
            - (data.investment.loanAmount / (data['currencyRates'][this.utilService.formatDate(data.investment.buyingDate)][`USD${data.investment.loanAmountUnit}`] || 1)))
            * data.myPercentage / 100;
        this.calculateProgressBarWealthValue();
      }
      
    },
    (error: any) => {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} There was an error trying to get required data > `, error);
      this.appService.showResults(`There was an error trying to get required data, please try again in a few minutes.`, SnackbarNotificationTypes.ERROR);
    });
    this.subscription.add(newSubscription);
  }

  /**
   * Sets the user property with the current user or null if nobody logged in yet.
   * 
   * @return { Observable<Investment[]> } . An observable with array of the logged in user investments or [] if nobody is logged in yet
   */
  setUserAndGetInvestments$(): Observable<Investment[]> {
    const methodTrace = `${this.constructor.name} > setUserAndGetInvestments$() > `; // for debugging

    return this.usersService.user$.pipe(
      flatMap((user: User) => {
        // reset all values to recalculate for this user 
        this.wealthAmount = 0;
        this.expectedWealth = 0;
        this.progressBarWealthValue = 0;
        if (!user) {
          return of(null);
        } else if (!user.personalInfo || !user.financialInfo) {
          return this.usersService.getAuthenticatedUser$({ personalInfo: true, financialInfo: true });
        } else {
          return of(user);
        }
      }),
      flatMap((user: User) => {
        this.user = user;

        if (user) {
          if (user.financialInfo) {
            this.wealthAmount += this.currencyExchangeService.getUsdValueOf(user.financialInfo.savings || 0, user.financialInfo.savingsUnit);
            
            if (user.personalInfo && user.personalInfo.age) {
              this.expectedWealth = this.currencyExchangeService.getUsdValueOf(user.financialInfo.annualIncome || 0, user.financialInfo.annualIncomeUnit) * user.personalInfo.age / 10;
            } else {
              this.expectedWealth = 0;
            }
            
            this.calculateProgressBarWealthValue();
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
