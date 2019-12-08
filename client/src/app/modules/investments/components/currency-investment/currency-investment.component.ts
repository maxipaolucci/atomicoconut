import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { YesNoDialogComponent } from '../../../shared/components/yes-no-dialog/yes-no-dialog.component';
import { AppService } from '../../../../app.service';
import { User } from '../../../users/models/user';
import { CurrencyInvestment } from '../../models/currencyInvestment';
import { Observable, BehaviorSubject, Subscription, combineLatest, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Team } from '../../../teams/models/team';
import { INVESTMENTS_TYPES, ConsoleNotificationTypes, COINCAP_CRYPTO_TYPES } from '../../../../constants';
import { UtilService } from '../../../../util.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { userSelector } from 'src/app/modules/users/user.selectors';
import { cryptoRateByIdSelector } from 'src/app/modules/currency-exchange/crypto-rate.selectors';
import { CryptoRate } from 'src/app/modules/currency-exchange/models/crypto-rate';
import { currencyRateByIdsSelector } from 'src/app/modules/currency-exchange/currency-rate.selectors';
import { CurrencyRate } from 'src/app/modules/currency-exchange/models/currency-rate';
import { RequestDelete } from '../../investment.actions';
import { LoadingData } from 'src/app/models/loadingData';
import { loadingSelector } from 'src/app/app.selectors';

@Component({
  selector: 'currency-investment',
  templateUrl: './currency-investment.component.html',
  styleUrls: ['./currency-investment.component.scss']
})
export class CurrencyInvestmentComponent implements OnInit, OnDestroy {

  @Input() investment: CurrencyInvestment;
  @Input()
  set teams(teams: Team[]) {
    this.teams$.next(teams);
  }
  get teams(): Team[] {
    return this.teams$.getValue();
  }
  @Output() totalReturns: EventEmitter<any> = new EventEmitter();
  private teams$ = new BehaviorSubject<Team[]>([]);
  investmentAmount = 0;
  buyingPrice = 0;
  investmentReturn = 0;
  investmentValueWhenBought = 0;
  currentPrice = 0;
  loanAmount = 0;
  user: User = null;
  team: Team = null; // if the investment has a tema this will be populated with the full info of the team
  investmentDistribution: any[] = [];
  subscription: Subscription = new Subscription();
  loading$: Observable<LoadingData>;


  constructor(
    private appService: AppService,
    public dialog: MatDialog,
    private utilService: UtilService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging
    
    this.loading$ = this.store.select(loadingSelector());
    
    let newSubscription = null;
    const combineLatest$ = combineLatest(
      this.store.select(userSelector()),
      this.store.select(currencyRateByIdsSelector([this.utilService.formatToday(), this.utilService.formatDate(this.investment.buyingDate)])),
      this.teams$,
      this.investment.type === INVESTMENTS_TYPES.CRYPTO ? this.store.select(cryptoRateByIdSelector(COINCAP_CRYPTO_TYPES[this.investment.unit])) : of(null)
    );
    newSubscription = combineLatest$.pipe(
      filter(([user, currencyRates, teams, cryptoRates]: [User, { string: CurrencyRate }, Team[], CryptoRate]) => {
        if (this.investment.type === INVESTMENTS_TYPES.CRYPTO && !cryptoRates) {
          return false;
        }

        if (!currencyRates || !currencyRates[this.utilService.formatToday()] || !currencyRates[this.utilService.formatDate(this.investment.buyingDate)]) {
          return false;
        }

        return true;
      })
    ).subscribe(([user, currencyRates, teams, cryptoRates]: [User, { string: CurrencyRate }, Team[], CryptoRate]) => {
      this.user = user;
      // for all this info I need to be sure currencyRates are here
      if (currencyRates && Object.keys(currencyRates).length) {
        if (this.investment.type === INVESTMENTS_TYPES.CRYPTO  && cryptoRates) {
          this.currentPrice = Number(cryptoRates.priceUsd);
        } else if (this.investment.type === INVESTMENTS_TYPES.CURRENCY) {
          this.currentPrice = 1 / (currencyRates[this.utilService.formatToday()][`USD${this.investment.unit}`] || 1);
        }
        
        // the investment amount was paid on the date of the investment so we need to convert using that day rates
        this.investmentAmount = this.investment.investmentAmount / (currencyRates[this.utilService.formatDate(this.investment.buyingDate)][`USD${this.investment.investmentAmountUnit}`] || 1);
        // the loan amount was requested on the date of the investment so we need to convert using that day rates
        this.loanAmount = this.investment.loanAmount / (currencyRates[this.utilService.formatDate(this.investment.buyingDate)][`USD${this.investment.loanAmountUnit}`] || 1);
        // the buying price that was paid on the date of the investment so we need to convert using that day rates
        this.buyingPrice = this.investment.buyingPrice / (currencyRates[this.utilService.formatDate(this.investment.buyingDate)][`USD${this.investment.buyingPriceUnit}`] || 1);
        this.investmentValueWhenBought = this.buyingPrice * this.investment.amount;
        this.investmentReturn = this.currentPrice * this.investment.amount - this.loanAmount;
      }
      
      this.setInvestmentTeamData(teams);
    });
    this.subscription.add(newSubscription);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  /**
   * Populates team data as well as the distribution on the investment between team members when the investment is asigned to a team
   * 
   * @param {Team[]} teams . The teams of the current user
   */
  setInvestmentTeamData(teams: Team[]) {
    this.team = this.investment.team ? teams.filter(team => team.slug === this.investment.team.slug)[0] : null; // look for the team of the investment
    
    // set totals to emit to parent component. If no team assigned then the total of the investment is the same as my portion
    const totals = {
      investmentId : this.investment.id,
      investmentAmount : this.investmentAmount,
      investmentReturn : this.investmentReturn,
      myInvestmentAmount : this.investmentAmount,
      myInvestmentReturn : this.investmentReturn
    };

    if (this.team) {
      // if team is present then get my portion of the investment
      for (const member of this.team.members) {
        const percentage = (this.investment.investmentDistribution.filter(portion => portion.email === member.email)[0]).percentage;
        this.investmentDistribution.push({
          member,
          percentage,
          money : this.investmentReturn * percentage / 100
        });

        if (this.user && this.user.email === member.email) {
          totals.myInvestmentAmount = this.investmentAmount * percentage / 100;
          totals.myInvestmentReturn = this.investmentReturn * percentage / 100;  
        }
      }
    }

    this.totalReturns.emit(totals);
  }

  openDeleteDialog() {
    const methodTrace = `${this.constructor.name} > openDeleteDialog() > `; // for debugging
    
    if (!this.investment.id) {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Investment ID is required to delete.`);
      return false;
    }

    const yesNoDialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '250px',
      data: { 
        title : 'Delete investment',
        message : `Are you sure you want to delete this investment forever?`
      }
    });

    const newSubscription: Subscription = yesNoDialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.delete();
      }
    });
    this.subscription.add(newSubscription);

    return false;
  }

  delete() {
    const methodTrace = `${this.constructor.name} > delete() > `; // for debugging

    this.store.dispatch(new RequestDelete({ userEmail: this.user.email, id: this.investment.id }));
  }
    
}
