import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PropertyInvestment } from '../../models/propertyInvestment';
import { Team } from '../../../teams/models/team';
import { Observable, BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '../../../users/models/user';
import { CurrencyExchangeService } from '../../../currency-exchange/currency-exchange.service';
import { AppService } from '../../../../app.service';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from '../../../shared/components/yes-no-dialog/yes-no-dialog.component';
import { House } from '../../../properties/models/house';
import { UtilService } from '../../../../util.service';
import { ConsoleNotificationTypes, PROPERTY_TYPES } from 'src/app/constants';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { CurrencyRate } from 'src/app/modules/currency-exchange/models/currency-rate';
import { userSelector } from 'src/app/modules/users/user.selectors';
import { currencyRateByIdsSelector } from 'src/app/modules/currency-exchange/currency-rate.selectors';
import { RequestDelete, Update_ } from '../../investment.actions';
import { loadingSelector } from 'src/app/app.selectors';
import { LoadingData } from 'src/app/models/loadingData';


@Component({
  selector: 'property-investment',
  templateUrl: './property-investment.component.html',
  styleUrls: ['./property-investment.component.scss']
})
export class PropertyInvestmentComponent implements OnInit, OnDestroy {

  @Input() investment: PropertyInvestment;
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
  investmentTitle: string = null;
  user: User = null;
  team: Team = null; // if the investment has a tema this will be populated with the full info of the team
  investmentDistribution: any[] = [];
  subscription: Subscription = new Subscription();
  loading$: Observable<LoadingData>;
  

  constructor(
    private currencyExchangeService: CurrencyExchangeService, 
    private appService: AppService, 
    public dialog: MatDialog, 
    private utilService: UtilService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging
    
    this.loading$ = this.store.select(loadingSelector());
    if ([ PROPERTY_TYPES.HOUSE ].includes(this.investment.property.type)) {
      this.investmentTitle = this.utilService.capitalizeFirstLetter((<House>this.investment.property).buildingType);
    }

    let newSubscription = null;
    const combineLatest$ = combineLatest(
      this.store.select(userSelector()),
      this.store.select(currencyRateByIdsSelector([this.utilService.formatToday(), this.utilService.formatDate(this.investment.buyingDate)])),
      this.teams$
    ).pipe(
      filter(([ user, currencyRates, teams ]: [ User, { string: CurrencyRate }, Team[] ]) => {
        if (!currencyRates || !currencyRates[this.utilService.formatToday()] || 
            !currencyRates[this.utilService.formatDate(this.investment.buyingDate)]) {
          return false;
        }

        return true;
      })
    );

    newSubscription = combineLatest$.subscribe(([user, currencyRates, teams]: [User, { string: CurrencyRate }, Team[]]) => {
      this.user = user;

      // for all this info I need to be sure currencyRates are here
      if (currencyRates && Object.keys(currencyRates).length) {
        // market value should be always up to date so no rate conversion is required
        this.currentPrice = this.currencyExchangeService.getUsdValueOf(this.investment.property.marketValue, this.investment.property.marketValueUnit, currencyRates);
        // the investment amount was paid on the date of the investment so we need to convert using that day rates
        this.investmentAmount = this.investment.investmentAmount / ( currencyRates[this.utilService.formatDate(this.investment.buyingDate)][`USD${this.investment.investmentAmountUnit}`] || 1 );
        // the loan amount was requested on the date of the investment so we need to convert using that day rates
        this.loanAmount = this.investment.loanAmount / (currencyRates[this.utilService.formatDate(this.investment.buyingDate)][`USD${this.investment.loanAmountUnit}`] || 1);
        // the buying price (of the property) was requested on the date of the investment so we need to convert using that day rates
        this.buyingPrice = this.investment.buyingPrice / (currencyRates[this.utilService.formatDate(this.investment.buyingDate)][`USD${this.investment.buyingPriceUnit}`] || 1);
        this.investmentReturn = this.currentPrice;
      }

      this.team = this.investment.team ? teams.filter(team => team.slug === this.investment.team.slug)[0] : null; // look for the team of the investment
      this.setInvestmentTeamData(this.team);
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
   * @param {Team} team . The team of the investment
   */
  setInvestmentTeamData(team: Team) {
    // set totals to emit to parent component. If no team assigned then the total of the investment is the same as my portion
    const totals = {
      investmentId : this.investment.id,
      investmentAmount : this.investmentAmount,
      investmentReturn : this.investmentReturn,
      myInvestmentAmount : this.investmentAmount,
      myInvestmentReturn : this.investmentReturn
    };

    this.investmentDistribution = [];

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

    const newSubscription = yesNoDialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.delete();
      }
    });
    this.subscription.add(newSubscription);

    return false;
  }

  delete() {
    const methodTrace = `${this.constructor.name} > delete() > `; // for debugging

    this.store.dispatch(new RequestDelete({ id: this.investment.id }));
  }

}
