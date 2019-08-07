import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { UsersService } from './modules/users/users.service';
import { User } from './modules/users/models/user';
import { Router } from '@angular/router';
import { MainNavigatorService } from './modules/shared/components/main-navigator/main-navigator.service';
import { CurrencyExchangeService } from './modules/investments/currency-exchange.service';
import { UtilService } from './util.service';
import { of, Subscription, interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Team } from './modules/teams/models/team';
import { TeamsService } from './modules/teams/teams.service';
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

  constructor(private router: Router, private appService: AppService, private teamsService: TeamsService, public usersService: UsersService, public currencyExchangeService: CurrencyExchangeService,
      private utilService: UtilService) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    // On any user change let loads its preferred currency rate and show it in the currency secondary toolbar
    const newSubcription: Subscription = this.usersService.user$.pipe(
      flatMap((user: User) => {
        if (!user) {
          this.todayUserPrefRate = null;
        }
  
        this.user = user;

        if (this.user) {
          this.bindToPushNotificationEvents();
        }

        if (this.user && this.user.currency && this.user.currency !== 'USD') {
          return this.currencyExchangeService.getCurrencyRates$();
        }

        return of(null); // is the user had not configure a preferred currency then we don't need to show the currency toolbar
      })
    ).subscribe((currencyRates: any) => {
      if (currencyRates === null) {
        this.todayUserPrefRate = null;
        return;
      }

      this.todayUserPrefRate = currencyRates[this.utilService.formatToday()][`USD${this.user.currency}`];
      this.appService.consoleLog('info', `${methodTrace} Currency exchange rates successfully loaded!`);
    },
    (error: any) => {
      this.appService.consoleLog('error', `${methodTrace} There was an error trying to get currency rates data > ${error}`);
      this.appService.showResults(`There was an error trying to get currency rates data.`, 'error');
    }); // start listening the source of user
    this.subscription.add(newSubcription);

    // start tracking user changes every 10min (600000ms)
    this.usersService.updateSessionState(600000);

    this.getCryptoRates('BTC');
    this.getCryptoRates('XMR');
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();

    this.unbindToPushNotificationEvents();
  }

  getCryptoRates(crypto: string = 'BTC') {
    const methodTrace = `${this.constructor.name} > getCryptoRates() > `; // for debugging

    const newSubscription: Subscription = this.currencyExchangeService.getCryptoRates$(crypto).subscribe(
      (data: any) => {
        this.appService.consoleLog('info', `${methodTrace} ${crypto} exchange rate successfully loaded!`);
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error trying to get ${crypto} rates data > ${error}`);
        this.appService.showResults(`There was an error trying to get ${crypto} rates data, please try again in a few minutes.`, 'warn');
      }
    );
    this.subscription.add(newSubscription);
  }

  logout(): void {
    const methodTrace = `${this.constructor.name} > logout() > `; // for debugging

    const newSubscription: Subscription = this.usersService.logout$().subscribe(
      (result: any) => {
        this.user = result;
        this.unbindToPushNotificationEvents();
        this.router.navigate(['/']);
      },
      (error: any) =>  {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the logout service.`, error);
      }
    );
    this.subscription.add(newSubscription);
  }

  /**
   * Start listening to Pusher notifications comming from server
   */
  bindToPushNotificationEvents() {
    this.appService.pusherChannel.bind('investment-created', data => {
      const newSubscription = this.teamsService.getTeams$(this.user.email).subscribe((teams: Team[]) => this.showInvestmentNotification('created', data, teams));
      this.subscription.add(newSubscription);
    });

    this.appService.pusherChannel.bind('investment-updated', data => {
      const newSubscription = this.teamsService.getTeams$(this.user.email).subscribe((teams: Team[]) => this.showInvestmentNotification('updated', data, teams));
      this.subscription.add(newSubscription);
    });

    this.appService.pusherChannel.bind('investment-deleted', data => {
      const newSubscription = this.teamsService.getTeams$(this.user.email).subscribe((teams: Team[]) => this.showInvestmentNotification('deleted', data, teams));
      this.subscription.add(newSubscription);
    });
  }

  showInvestmentNotification(action: string, data: any = {}, teams: Team[] = []) {
    for (const team of teams) {
      if (team.slug === data.teamSlug) {
        this.appService.showResults(`${data.name} has ${action} an investment associated with your team ${data.teamName}.`, 'info', 8000);
        return;
      }
    }
  }

  /**
   * Stop listening to Pusher notifications comming from server
   */
  unbindToPushNotificationEvents() {
    this.appService.pusherChannel.unbind('investment-created');
    this.appService.pusherChannel.unbind('investment-updated');
    this.appService.pusherChannel.unbind('investment-deleted');
  }
}
