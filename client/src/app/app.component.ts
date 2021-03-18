import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { User } from './modules/users/models/user';
import { UtilService } from './util.service';
import { Subscription, Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Team } from './modules/teams/models/team';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { RequestLogout } from './modules/users/user.actions';
import { userSelector } from './modules/users/user.selectors';
import { LoadingData } from './models/loadingData';
import { SnackbarNotificationTypes, RoutingPaths } from './constants';
import { apiKeysSelector, isOnlineSelector, loadingSelector } from './app.selectors';
import { currencyRateByIdSelector } from './modules/currency-exchange/currency-rate.selectors';
import { CurrencyRate } from './modules/currency-exchange/models/currency-rate';
import { RequestMany as RequestManyCurrencyRates } from 'src/app/modules/currency-exchange/currency-rate.actions';
import { RequestAll as RequestAllTeams } from './modules/teams/team.actions';
import { teamsSelector } from './modules/teams/team.selectors';
import _ from 'lodash';
import { NavigatorLinkModel } from './modules/shared/components/main-navigator/models/navigator-link-model';
import { PwaService } from './pwa.service';
import { RequestApiKeys, StartOnlineOfflineCheck } from './app.actions';
import { ApiKeys } from './models/api-keys';
import { MapsConfigService } from './modules/shared/maps-config.service';
import Pusher from 'pusher-js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'AtomiCoconut';
  user: User = null;
  todayUserPrefRate: number = null;
  subscription: Subscription = new Subscription();
  loading$: Observable<LoadingData> = null;
  teams: Team[] = [];
  sideNavItems: NavigatorLinkModel[] = [];
  isOnline: boolean = true;

  constructor(
      private appService: AppService,
      private mapsConfigService: MapsConfigService, // injected here just to make the constructor run
      private utilService: UtilService,
      public pwaService: PwaService, // injected here just to make the constructor run
      private store: Store<State>
  ) {
    //Populates the side navigator
    this.sideNavItems.push(
      { displayName: 'Home', url: RoutingPaths.WELCOME, icon: 'home' }, 
      { displayName: 'Calculators', url: RoutingPaths.CALCULATORS, icon: 'calculate'},
      { displayName: 'Investments', url: RoutingPaths.INVESTMENTS, icon: 'trending_up'},
      { displayName: 'Properties', url: RoutingPaths.PROPERTIES, icon: 'home_work'},
      { displayName: 'Teams', url: RoutingPaths.TEAMS, icon: 'group'},
      
    );
  }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    // check online selector
    this.subscription.add(this.store.select(isOnlineSelector()).pipe(
      filter((isOnline: boolean) => typeof isOnline !== 'undefined')
    ).subscribe((isOnline: boolean) => {
      if (!isOnline) {
        this.appService.showResults(`Seems that you are OFFLINE. Try to not save any changes until you are back online.`, SnackbarNotificationTypes.ERROR, 0); // never dismiss with duration 0
      } else if (!this.isOnline) {
        // just when we move from offline to online we show this alert
        this.appService.showResults(`Seems that you are ONLINE again!`, SnackbarNotificationTypes.SUCCESS, 5000);
      }

      this.isOnline = isOnline;
    }));

    // start monitoring connectivity status
    this.store.dispatch(new StartOnlineOfflineCheck());

    //Show or hide progress bar for loading...
    this.loading$ = this.store.select(loadingSelector());

    //Get api keys from server
    this.store.dispatch(new RequestApiKeys());
    
    // subscribe to teams
    this.subscription.add(this.store.select(teamsSelector()).subscribe((teams: Team[]) => this.teams = teams));

    // First get apikeys and then on any user change let loads its preferred currency rate and show it in the currency secondary toolbar
    // subscribe to the user
    let newSubscription: Subscription = this.store.select(apiKeysSelector()).pipe(
      switchMap((apiKeys: ApiKeys) => {
        if (apiKeys && apiKeys.pusher) {
          this.appService.pusher = new Pusher(apiKeys.pusher.key, {
            cluster: apiKeys.pusher.cluster,
            forceTLS: true
          });
          
          this.appService.pusher.connection.bind('connected', () => {
            // we'll use this id to prevent the executor of the action to receive a notification
            this.appService.pusherSocketID = this.appService.pusher.connection.socket_id;
          });
          
          //start listening to the same channel where the server is emiting msgs
          this.appService.pusherChannel = this.appService.pusher.subscribe(apiKeys.pusher.channel);
          this.appService.pusherReady$.next(true);
        } else {
          this.appService.pusherReady$.next(false);
        }

        return this.store.select(userSelector());
      }),
      filter((user: User) => {
        if (!user) {
          this.user = null;
          this.todayUserPrefRate = null;
          this.unbindToPushNotificationEvents();
          
          return false;
        }

        return true;
      }),
      switchMap((user: User) => {
        if (!_.isEqual(user, this.user)) {
          this.user = user;
          //get the teams, will need them for the pusher notifications
          this.store.dispatch(new RequestAllTeams({ forceServerRequest: false }));
          this.bindToPushNotificationEvents();
        }
        
        return this.store.select(currencyRateByIdSelector(this.utilService.formatToday()));
      }),
      filter((currencyRate: CurrencyRate) => {
        if (!currencyRate) {
          this.store.dispatch(new RequestManyCurrencyRates({ dates: [this.utilService.formatToday()], base: 'USD' }));
          return false;
        }

        return true;
      })
    ).subscribe((currencyRate: CurrencyRate) => {
      if (!(this.user && this.user.currency && this.user.currency !== 'USD')) {
        return;
      }

      this.todayUserPrefRate = 1 / currencyRate[`USD${this.user.currency}`];
    });
    this.subscription.add(newSubscription);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();

    this.unbindToPushNotificationEvents();
  }

  logout(): void {
    const methodTrace = `${this.constructor.name} > logout() > `; // for debugging

    this.store.dispatch(new RequestLogout());
  }

  /**
   * Start listening to Pusher notifications comming from server
   */
  bindToPushNotificationEvents() {
    if (this.appService.pusherChannel) {
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
  }

  showInvestmentNotification(action: string, data: any = {}, teams: Team[] = []) {
    let myTeam = null;
    if (data.oldInvestment && data.oldInvestment.team) {
      // check if I was part of the original investment before the update
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
    if (this.appService.pusherChannel) {
      this.appService.pusherChannel.unbind('investment-created');
      this.appService.pusherChannel.unbind('investment-updated');
      this.appService.pusherChannel.unbind('investment-deleted');
      this.appService.pusherChannel.unbind('team-updated');
      this.appService.pusherChannel.unbind('team-deleted');
    }
  }
}
