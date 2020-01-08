import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { User } from '../../../users/models/user';
import { InvestmentSelectorDialogComponent } from '../investment-selector-dialog/investment-selector-dialog.component';
import { Investment } from '../../models/investment';
import { AppService } from '../../../../app.service';
import { Team } from '../../../teams/models/team';
import { Observable, Subscription, from, of, combineLatest } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';
import { CurrencyInvestment } from '../../models/currencyInvestment';
import { INVESTMENTS_TYPES, COINCAP_CRYPTO_TYPES } from '../../../../constants';
import { UtilService } from '../../../../util.service';
import { PropertyInvestment } from '../../models/propertyInvestment';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { userSelector } from 'src/app/modules/users/user.selectors';
import _ from 'lodash';
import { LoadingData } from 'src/app/models/loadingData';
import { loadingSelector } from 'src/app/app.selectors';
import { RequestAll, ResetAllEntitiesLoaded } from '../../investment.actions';
import { RequestAll as RequestAllTeams, ResetAllEntitiesLoaded as ResetAllTeamsLoaded } from '../../../teams/team.actions';
import { investmentsSelector } from '../../investment.selectors';
import { teamsSelector } from 'src/app/modules/teams/team.selectors';
import { cryptoRateByIdSelector, allCryptoRateByIdsLoadedSelector } from 'src/app/modules/currency-exchange/crypto-rate.selectors';
import { CryptoRate } from 'src/app/modules/currency-exchange/models/crypto-rate';
import { RequestMany as RequestManyCryptoRate } from 'src/app/modules/currency-exchange/crypto-rate.actions';
import { RequestMany as RequestManyCurrencyRates } from 'src/app/modules/currency-exchange/currency-rate.actions';
import { allCurrencyRateByIdsLoadedSelector } from 'src/app/modules/currency-exchange/currency-rate.selectors';
import { SetLinks } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';


@Component({
  selector: 'investments-dashboard',
  templateUrl: './investments-dashboard.component.html',
  styleUrls: ['./investments-dashboard.component.scss']
})
export class InvestmentsDashboardComponent implements OnInit, OnDestroy {
  investments: Investment[] = [];
  teams: Team[] = [];
  investmentsUI: any[] = []; // this is a structure to use in the view an make the rendering easier organizing the info in rows
  totalInvestment = 0;
  totalReturn = 0;
  myTotalInvestment = 0;
  myTotalReturn = 0;
  totals: any = {};
  user: User = null;
  subscription: Subscription = new Subscription();
  INVESTMENTS_TYPES: any = INVESTMENTS_TYPES; // make it available in the view
  loading$: Observable<LoadingData>;
  teams$: Observable<Team[]>;

  constructor(
    public dialog: MatDialog,
    private appService: AppService,
    private utilService: UtilService,
    private store: Store<State>
  ) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.store.dispatch(new SetLinks({ links: [
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: null, selected: true },
      { displayName: 'Properties', url: '/properties', selected: false }
    ]}));

    this.loading$ = this.store.select(loadingSelector());

    // subscribe to the user
    this.subscription.add(this.store.select(userSelector()).subscribe((user: User) => this.user = user));
    
    // subscribe to teams
    this.teams$ = this.store.select(teamsSelector());
    
    // get investments and crypto rates for each crypto investment of the user
    let newSubscription: Subscription = this.store.select(investmentsSelector()).pipe(
      switchMap((investments: Investment[]) => {
        this.organizeInvestmentsData(investments); //here we save investments in our local component array
        
        let cryptoUnits: string[] = [];
        investments.map((investment: Investment) => {
          if (investment.type === INVESTMENTS_TYPES.CRYPTO) {
            cryptoUnits.push(COINCAP_CRYPTO_TYPES[(<CurrencyInvestment>investment).unit.toUpperCase()]);
          }
        });
        cryptoUnits = [...new Set(cryptoUnits)]; //remove duplicates

        return of(cryptoUnits);
      }),
      switchMap((cryptoUnits: string[]) => combineLatest(this.store.select(allCryptoRateByIdsLoadedSelector(cryptoUnits)), of(cryptoUnits)))
    ).subscribe(([allCryptoRatesByIdsLoaded, cryptoUnits]: [boolean, string[]]) => {
      if (!allCryptoRatesByIdsLoaded) {
        this.store.dispatch(new RequestManyCryptoRate({ cryptos: cryptoUnits }));
      }
    });
    this.subscription.add(newSubscription);
    
    // get investments buying dates
    newSubscription = this.store.select(investmentsSelector()).pipe(
      switchMap((investments: Investment[]) => {
        let dates: string[] = [];
        investments.map((investment: Investment) => {
          if ([ INVESTMENTS_TYPES.CURRENCY, INVESTMENTS_TYPES.CRYPTO ].includes(investment.type)) {
            dates.push(this.utilService.formatDate((<CurrencyInvestment>investment).buyingDate));
          } else if ([ INVESTMENTS_TYPES.PROPERTY ].includes(investment.type)) {
            dates.push(this.utilService.formatDate((<PropertyInvestment>investment).buyingDate));
          }
        });
        if (investments.length) {
          // to avoid call the service if no investments available yet
          dates.push(this.utilService.formatToday());
        }
        dates = [...new Set(dates)]; //remove duplicates

        return of(dates);
      }),
      switchMap((dates: string[]) => combineLatest(this.store.select(allCurrencyRateByIdsLoadedSelector(dates)), of(dates)))
    ).subscribe(([allCurrencyRatesByIdsLoaded, dates]: [boolean, string[]]) => {
      if (!allCurrencyRatesByIdsLoaded) {
        this.store.dispatch(new RequestManyCurrencyRates({ dates, base: 'USD' }));
      }
    });
    this.subscription.add(newSubscription);

    this.bindToPushNotificationEvents();
    this.getInvestments();
    this.getTeams();
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
    this.unbindToPushNotificationEvents();
  }

  /**
   * Start listening to Pusher notifications comming from server
   */
  bindToPushNotificationEvents() {
    // when a user updates an investment
    this.appService.pusherChannel.bind('investment-updated', data => {
      let reloadData = this.investments.some((investment : Investment) => investment.id == data.investment.id);
      if (!reloadData && data.investment.team) {
        // check if the updated investment was associated to one of my teams
        reloadData = data.investment.team.members.some((member: any) => member.email == this.user.email);
      }

      if (!reloadData) {
        return;
      }

      this.store.dispatch(new ResetAllEntitiesLoaded()); // to force to reload from server
      this.getInvestments();
    });

    // when a user removes an investment
    this.appService.pusherChannel.bind('investment-deleted', data => {
      let reloadData = this.investments.some((investment : Investment) => investment.id == data.investment.id);
      if (!reloadData) {
        return;
      }

      this.store.dispatch(new ResetAllEntitiesLoaded()); // to force to reload from server
      this.getInvestments();
    });

    // when a user creates an investment
    this.appService.pusherChannel.bind('investment-created', data => {
      let reloadData = data.investment.team && data.investment.team.members.some((member: any) => member.email == this.user.email);
      if (!reloadData) {
        return;
      }

      this.store.dispatch(new ResetAllEntitiesLoaded()); // to force to reload from server
      this.getInvestments();
    });

    // when a user updates a team
    this.appService.pusherChannel.bind('team-updated', data => {
      // if I am related to this team the reload the team data
      let reloadData = data.team && data.team.memberState[this.user.email];
      
      if (!reloadData) {
        return;
      }
      this.store.dispatch(new ResetAllTeamsLoaded()); // to force to reload from server
      this.getTeams();
    });
  }

  /**
   * Stop listening to Pusher notifications comming from server
   */
  unbindToPushNotificationEvents() {
    this.appService.pusherChannel.unbind('investment-deleted');
    this.appService.pusherChannel.unbind('investment-updated');
    this.appService.pusherChannel.unbind('investment-created');
    this.appService.pusherChannel.unbind('team-updated');
  }

  /**
   * Organize investments into a kind of matrix to allow show it in the view as a grid
   * 
   * @param {Array<Investment>} investments . The investments of the user to organize
   */
  organizeInvestmentsData(investments : Investment[]) {
    const methodTrace = `${this.constructor.name} > organizeInvestmentsData$() > `; // for debugging
    
    let investmentsRow: any[] = [];
    this.totals = {}; //empty totals object to be refilled with the set of investments
    this.investmentsUI = [];
    for (const item of investments) {
      if (investmentsRow.length < 2) {
        investmentsRow.push(item);
      } else {
        this.investmentsUI.push(investmentsRow);
        investmentsRow = [item];
      }
    }

    if (investmentsRow.length) {
      this.investmentsUI.push(investmentsRow);
    }
    
    this.investments = investments;
  }

  /**
   * Make and explicit request for user investments to the server
   */
  getInvestments()  {
    const methodTrace = `${this.constructor.name} > getInvestments$() > `; // for debugging

    this.store.dispatch(new RequestAll({ userEmail: this.user.email }));
  }

  /**
   * Get my teams from server
   */
  getTeams() {
    const methodTrace = `${this.constructor.name} > getTeams() > `; // for debugging

    this.store.dispatch(new RequestAllTeams({ userEmail: this.user.email, forceServerRequest: false }));
  }

  setTotals(totalReturns: any): void {
    // update the total that matches the id
    this.totals[totalReturns.investmentId] = totalReturns;
    // reset totals
    this.totalReturn = 0;
    this.totalInvestment = 0;
    this.myTotalInvestment = 0;
    this.myTotalReturn = 0;

    // re calculate totals
    for (const investmentId of Object.keys(this.totals)) {
      this.totalReturn += this.totals[investmentId].investmentReturn;
      this.totalInvestment += this.totals[investmentId].investmentAmount;
      this.myTotalInvestment += this.totals[investmentId].myInvestmentAmount;
      this.myTotalReturn += this.totals[investmentId].myInvestmentReturn;
    }

  }

  openNewInvestmentDialog() {
    this.dialog.open(InvestmentSelectorDialogComponent, {});
    return false;
  }
}
