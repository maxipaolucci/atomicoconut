import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainNavigatorService } from '../../modules/shared/components/main-navigator/main-navigator.service';
import { AppService } from '../../app.service';
import { User } from '../../modules/users/models/user';
import { CurrencyExchangeService } from '../../modules/currency-exchange/currency-exchange.service';
import { Investment } from '../../modules/investments/models/investment';
import { CurrencyInvestment } from '../../modules/investments/models/currencyInvestment';
import { Subscription, of, from, Observable, combineLatest } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';
import { INVESTMENTS_TYPES, ConsoleNotificationTypes } from '../../constants';
import { UtilService } from '../../util.service';
import { PropertyInvestment } from '../../modules/investments/models/propertyInvestment';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { userSelector } from 'src/app/modules/users/user.selectors';
import { RequestAuthenticatedUser } from 'src/app/modules/users/user.actions';
import { RequestAll as RequestAllInvestments } from 'src/app/modules/investments/investment.actions';
import { investmentsSelector } from 'src/app/modules/investments/investment.selectors';
import { allCurrencyRateByIdsLoadedSelector, currencyRateByIdsSelector } from 'src/app/modules/currency-exchange/currency-rate.selectors';
import { RequestMany as RequestManyCurrencyRates } from 'src/app/modules/currency-exchange/currency-rate.actions';
import { CurrencyRate } from 'src/app/modules/currency-exchange/models/currency-rate';
import _ from 'lodash';


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

  constructor(
    private mainNavigatorService: MainNavigatorService,
    private appService: AppService, 
    private currencyExchangeService: CurrencyExchangeService, 
    private utilService: UtilService,
    private store: Store<State>
  ) { }

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

    // let todayRatesLoaded: boolean = false;
    let additionalUserDataRequested: boolean = false;
    let currentUserInvestments: Investment[] = [];
    let currentUserInvestmentsDates: string[] = [];

    let newSubscription: Subscription = combineLatest(
      this.store.select(userSelector()),
      this.store.select(currencyRateByIdsSelector([this.utilService.formatToday()])) //request is trigger by app component
    ).pipe(
      filter(([user, todayRates]: [User, { string: CurrencyRate }]) => {
        if (!user) {
          this.user = null;
          additionalUserDataRequested = false;
          return false;
        }

        if (!Object.keys(todayRates).length) {
          // no rates for today yet
          return false;
        }

        if (this.user && _.isEqual(user, this.user)) {
          // this means the observer was trigger again with data no new data. Block it
          return false;
        }

        if (!additionalUserDataRequested && !(user.personalInfo && user.financialInfo)) {
          // no complete user data yet
          additionalUserDataRequested = true;
          this.store.dispatch(new RequestAuthenticatedUser({ personalInfo: true, financialInfo: true }));
          return false;
        }

        return true;
      })
    ).subscribe(([user, todayRates]: [User, { string: CurrencyRate }]) => {
      this.user = user;
      // todayRatesLoaded = true;
      // reset all values to recalculate for this user 
      this.wealthAmount = 0;
      this.expectedWealth = 0;
      this.progressBarWealthValue = 0;
      currentUserInvestmentsDates = [];
      currentUserInvestments = [];
      
      this.wealthAmount += this.currencyExchangeService.getUsdValueOf(user.financialInfo.savings || 0, user.financialInfo.savingsUnit, todayRates);
      if (user.personalInfo.age) {
        this.expectedWealth = this.currencyExchangeService.getUsdValueOf(user.financialInfo.annualIncome || 0, user.financialInfo.annualIncomeUnit, todayRates) * user.personalInfo.age / 10;
      } else {
        this.expectedWealth = 0;
      }
      
      this.calculateProgressBarWealthValue();
      this.store.dispatch(new RequestAllInvestments({ userEmail: this.user.email }));
    });
    this.subscription.add(newSubscription);

    // get investments and currency rates from investments
    newSubscription = this.store.select(investmentsSelector()).pipe(
      filter((investments: Investment[]) => !!investments.length),
      switchMap((investments: Investment[]) => {
        currentUserInvestments = investments;
        let investmentsDates: string[] = investments.map((investment: Investment) => {
          if (investment instanceof CurrencyInvestment) {  
            return this.utilService.formatDate((<CurrencyInvestment>investment).buyingDate);
          } else if (investment instanceof PropertyInvestment) {
            return this.utilService.formatDate((<PropertyInvestment>investment).buyingDate);
          }
          
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Invalid investment instance type.`);
          return this.utilService.formatToday(); // this should never happen. BuyingDate is required in investments
        });
        
        if (investments.length) {
          // to avoid call the service if no investments available yet
          investmentsDates.push(this.utilService.formatToday());
        }
        investmentsDates = [...new Set(investmentsDates)]; //remove duplicates
        currentUserInvestmentsDates = investmentsDates;

        return of(investmentsDates);
      }),
      switchMap((investmentsDates: string[]) => combineLatest(
        this.store.select(allCurrencyRateByIdsLoadedSelector(investmentsDates)), 
        of(investmentsDates)
      )),
      filter(([allCurrencyRatesByIdsLoaded, investmentsDates]: [boolean, string[]]) => {
        if (!allCurrencyRatesByIdsLoaded) {
          this.store.dispatch(new RequestManyCurrencyRates({ dates: investmentsDates, base: 'USD' }));
          return false;
        }

        return true;
      })
    ).subscribe(([allCurrencyRatesByIdsLoaded, investmentsDates]: [boolean, string[]]) => {
      this.combineInvestmentsWithCurrencyRates(currentUserInvestments, currentUserInvestmentsDates);

    });
    this.subscription.add(newSubscription);
    
    
  }

  /**
   * This method make pair of { Investment, CurrencyRate (on investment buying date) ) to calculate the invesment numbers based on currency
   * 
   * @param { Investment[] } currentUserInvestments . The user investments 
   * @param { string[] } currentUserInvestmentsDates . The dates of the investment buying date
   */
  combineInvestmentsWithCurrencyRates(currentUserInvestments: Investment[], currentUserInvestmentsDates: string[]) {
    const methodTrace = `${this.constructor.name} > combineInvestmentsWithCurrencyRates() > `; // for debugging
    
    const newSubscription = this.store.select(currencyRateByIdsSelector(currentUserInvestmentsDates)).pipe(
      filter((currencyRates: {string: CurrencyRate}) => {
        if (!this.user) {
          return false;
        }
        const currencyRatesLength = Object.keys(currencyRates).length;

        if (!(currencyRatesLength && currentUserInvestmentsDates.length) || currencyRatesLength !== currentUserInvestmentsDates.length) {
          return false;
        }
        
        return true;
      }),
      switchMap((currencyRates: {string: CurrencyRate}) => {
        const investmentsAndCurrencyRates: any[] = currentUserInvestments.map((investment: Investment) => {
          return { currencyRates, investment };
        });

        return from(investmentsAndCurrencyRates);
      }),
      switchMap((investmentAndCurrencyRates: any): Observable<any> => {
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
          this.wealthAmount += (this.currencyExchangeService.getUsdValueOf(investment.property.marketValue, investment.property.marketValueUnit, investmentAndCurrencyRates['currencyRates'])
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
      
    });
    this.subscription.add(newSubscription);
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
