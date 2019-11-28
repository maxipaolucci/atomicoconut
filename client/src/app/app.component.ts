import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { UsersService } from './modules/users/users.service';
import { User } from './modules/users/models/user';
import { MainNavigatorService } from './modules/shared/components/main-navigator/main-navigator.service';
import { CurrencyExchangeService } from './modules/currency-exchange/currency-exchange.service';
import { UtilService } from './util.service';
import { of, Subscription, interval, Observable } from 'rxjs';
import { flatMap, switchMap, filter } from 'rxjs/operators';
import { Team } from './modules/teams/models/team';
import { TeamsService } from './modules/teams/teams.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProgressBarDialogComponent } from 'src/app/modules/shared/components/progress-bar-dialog/progress-bar-dialog.component';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { RequestLogout } from './modules/users/user.actions';
import { loggedInSelector, userSelector } from './modules/users/user.selectors';
import { LoadingData } from './models/loadingData';
import { DEFAULT_DIALOG_WIDTH_DESKTOP, SnackbarNotificationTypes, ConsoleNotificationTypes } from './constants';
import { loadingSelector } from './app.selectors';
import { allCurrencyRateByIdsLoadedSelector, currencyRateByIdSelector } from './modules/currency-exchange/currency-rate.selectors';
import { CurrencyRate } from './modules/currency-exchange/models/currency-rate';
import { RequestMany as RequestManyCurrencyRates } from 'src/app/modules/currency-exchange/currency-rate.actions';
import { RequestAll as RequestAllTeams } from './modules/teams/team.actions';
import { teamsSelector } from './modules/teams/team.selectors';
import _ from 'lodash';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ MainNavigatorService ]
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'AtomiCoconut';
  user: User = null;
  todayUserPrefRate: number = null;
  subscription: Subscription = new Subscription();
  loading$: Observable<LoadingData> = null;
  teams: Team[] = [];

  constructor(
      private appService: AppService,
      public usersService: UsersService, 
      // public currencyExchangeService: CurrencyExchangeService,
      private utilService: UtilService,
      // public dialog: MatDialog,
      private store: Store<State>
  ) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    //Show or hide progress bar for loading...
    this.loading$ = this.store.select(loadingSelector());

    // subscribe to teams
    this.subscription.add(this.store.select(teamsSelector()).subscribe((teams: Team[]) => this.teams = teams));

    // On any user change let loads its preferred currency rate and show it in the currency secondary toolbar
    // subscribe to the user
    let newSubscription: Subscription = this.store.select(userSelector()).pipe(
      switchMap((user: User) => {
        if (!user) {
          this.user = null;
          this.todayUserPrefRate = null;
          this.unbindToPushNotificationEvents();
          
          return of(null);
        }

        if (!_.isEqual(user, this.user)) {
          this.user = user;
          //get the teams, will need them for the pusher notifications
          this.store.dispatch(new RequestAllTeams({ userEmail: this.user.email, forceServerRequest: false }));
          this.bindToPushNotificationEvents();
        }
        
        if (this.user.currency && this.user.currency !== 'USD') {
          return this.store.select(currencyRateByIdSelector(this.utilService.formatToday()));
        }
        
        return of(null); // is the user had not configure a preferred currency then we don't need to show the currency toolbar
      }),
      filter((currencyRate: CurrencyRate) => !!this.user)
    ).subscribe((currencyRate: CurrencyRate) => {
      if (!currencyRate && this.user.currency && this.user.currency !== 'USD') {
        this.store.dispatch(new RequestManyCurrencyRates({ dates: [this.utilService.formatToday()], base: 'USD' }));
        return;
      }

      if (!this.todayUserPrefRate) {
        this.todayUserPrefRate = currencyRate[`USD${this.user.currency}`];
        this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Currency exchange rates successfully loaded!`);
      }
    });
    this.subscription.add(newSubscription);

    newSubscription = this.store.select(currencyRateByIdSelector(this.utilService.formatToday())).pipe(
      filter((currencyRates: CurrencyRate) => currencyRates && this.user && this.user.currency !== 'USD' && !this.todayUserPrefRate)
    ).subscribe((currencyRates: CurrencyRate) => {
      this.todayUserPrefRate = currencyRates[`USD${this.user.currency}`];
      this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Currency exchange rates successfully loaded!`);
    });
    this.subscription.add(newSubscription);

    // start tracking user changes every
    // this.usersService.updateSessionState();

    // this.getCryptoRates('BTC');
    // this.getCryptoRates('XMR');
  }

  // openProgressBarDialog(loadingData: LoadingData): MatDialogRef<ProgressBarDialogComponent> {
  //   const methodTrace = `${this.constructor.name} > openProgressBarDialog() > `; // for debugging
    
  //   return this.dialog.open(ProgressBarDialogComponent, {
  //     width: DEFAULT_DIALOG_WIDTH_DESKTOP,
  //     disableClose: true,
  //     data: loadingData
  //   });
  // }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();

    this.unbindToPushNotificationEvents();
  }

  // getCryptoRates(crypto: string = 'BTC') {
  //   const methodTrace = `${this.constructor.name} > getCryptoRates() > `; // for debugging

  //   const newSubscription: Subscription = this.currencyExchangeService.getCryptoRates$(crypto).subscribe(
  //     (data: any) => {
  //       this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} ${crypto} exchange rate successfully loaded!`);
  //     },
  //     (error: any) => {
  //       this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} There was an error trying to get ${crypto} rates data > ${error}`);
  //       this.appService.showResults(`There was an error trying to get ${crypto} rates data, please try again in a few minutes.`, SnackbarNotificationTypes.WARN);
  //     }
  //   );
  //   this.subscription.add(newSubscription);
  // }

  logout(): void {
    const methodTrace = `${this.constructor.name} > logout() > `; // for debugging

    this.store.dispatch(new RequestLogout());
  }

  /**
   * Start listening to Pusher notifications comming from server
   */
  bindToPushNotificationEvents() {
    this.appService.pusherChannel.bind('investment-created', data => {
      this.showInvestmentNotification('created', data, this.teams);
    });

    this.appService.pusherChannel.bind('investment-updated', (data: any) => {
      this.showInvestmentNotification('updated', data, this.teams);
    });

    this.appService.pusherChannel.bind('investment-deleted', (data: any) => {
      this.showInvestmentNotification('deleted', data, this.teams);
    });

    this.appService.pusherChannel.bind('team-updated', (data: any) => {
      if (data && data.team.memberState[this.user.email]) {
        const currentUserState = data.team.memberState[this.user.email];
        switch(currentUserState) {
          case 'add': {
            this.appService.showResults(`${data.name} added you to the team ${data.team.name}.`, SnackbarNotificationTypes.INFO, 8000);
            break;
          }

          case 'keep': {
            this.appService.showResults(`${data.name} updated the team ${data.team.name}.`, SnackbarNotificationTypes.INFO, 8000);
            break;
          }

          case 'remove': {
            this.appService.showResults(`${data.name} removed you from the team ${data.team.name}.`, SnackbarNotificationTypes.INFO, 8000);
            break;
          }

          default: {
            break;
          }
        }
      }
    });
    
    this.appService.pusherChannel.bind('team-deleted', data => {
      if (data && data.team) {
        const isMember = data.team.members.some((member: any) => member.email == this.user.email);
        if (isMember) {
          this.appService.showResults(`${data.name} deleted the team ${data.team.name} you was member of.`, SnackbarNotificationTypes.INFO, 8000);
        }
      }
    });
  }

  showInvestmentNotification(action: string, data: any = {}, teams: Team[] = []) {
    let myTeam = null;
    if (data.oldInvestment && data.oldInvestment.team) {
      // check if I as part of the original investment before the update
      myTeam = teams.find((team: Team) => team.slug == data.oldInvestment.team.slug);
    }

    if (!myTeam && data.investment.team) {
      // check if I am part of the updated investment
      myTeam = teams.find((team: Team) => team.slug == data.investment.team.slug);
    }

    if (!myTeam) {
      // I was not and I am not part of the investment 
      return;
    }

    this.appService.showResults(`${data.name} has ${action} an investment associated with your team ${myTeam.name}.`, SnackbarNotificationTypes.INFO, 8000);
  }

  /**
   * Stop listening to Pusher notifications comming from server
   */
  unbindToPushNotificationEvents() {
    this.appService.pusherChannel.unbind('investment-created');
    this.appService.pusherChannel.unbind('investment-updated');
    this.appService.pusherChannel.unbind('investment-deleted');
    this.appService.pusherChannel.unbind('team-updated');
    this.appService.pusherChannel.unbind('team-deleted');
  }
}
