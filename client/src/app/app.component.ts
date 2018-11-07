import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { UsersService } from './modules/users/users.service';
import { User } from './modules/users/models/user';
import { Router } from '@angular/router';
import { MainNavigatorService } from './modules/shared/components/main-navigator/main-navigator.service';
import { CurrencyExchangeService } from './modules/investments/currency-exchange.service';
import { UtilService } from './util.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ MainNavigatorService ]
})
export class AppComponent implements OnInit {

  title = 'AtomiCoconut';
  user: User = null;
  todayUserPrefRate: number = null;

  constructor(private router: Router, private appService: AppService, public usersService: UsersService, public currencyExchangeService: CurrencyExchangeService,
      private utilService: UtilService) { }

  ngOnInit(): void {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    // On any user change let loads its preferred currency rate and show it in the currency secondary toolbar
    this.usersService.user$.pipe(switchMap((user: User) => {
      this.user = user;

      if (this.user && this.user.currency && this.user.currency !== 'USD') {
        return this.currencyExchangeService.getCurrencyRates$();
      }

      return of(null); // is the user had not configure a preferred currency then we don't need to show the currency toolbar
    })).subscribe(
      (currencyRates: any) => {
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
      }
    ); // start listening the source of user

    this.setUser();

    this.getCryptoRates('BTC');
    this.getCryptoRates('XMR');
  }

  getCryptoRates(crypto: string = 'BTC') {
    const methodTrace = `${this.constructor.name} > getCryptoRates() > `; // for debugging

    this.currencyExchangeService.getCryptoRates$(crypto).subscribe(
      (data: any) => {
        this.appService.consoleLog('info', `${methodTrace} ${crypto} exchange rate successfully loaded!`);
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error trying to get ${crypto} rates data > ${error}`);
        this.appService.showResults(`There was an error trying to get ${crypto} rates data, please try again in a few minutes.`, 'warn');
      }
    );
  }

  setUser() {
    const methodTrace = `${this.constructor.name} > setUser() > `; // for debugging

    this.usersService.getAuthenticatedUser$().subscribe(
      (data: any) => {
        if (data && data.email) {
          this.user = new User(data.name, data.email, data.avatar, null, null, data.currency);
          this.usersService.setUser(this.user);
        } else {
          this.appService.consoleLog('info', `${methodTrace} User not logged in.`, data);
          this.usersService.setUser(null);
          this.user = null;
        }
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the getAuthenticatedUser service.`, error);
        this.usersService.setUser(null);
        this.user = null;
      }
    );
  }

  logout(): void {
    const methodTrace = `${this.constructor.name} > logout() > `; // for debugging

    this.usersService.logout$().subscribe(
      (data: any) => {
        this.usersService.setUser(null);
        this.user = null;
        this.router.navigate(['/']);
      },
      (error: any) =>  {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the logout service.`, error);
      }
    );
  }
}
