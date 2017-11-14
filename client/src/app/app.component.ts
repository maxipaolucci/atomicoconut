import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { AppService } from './app.service';
import { UsersService } from './modules/users/users.service';
import { configuration } from "../../configuration";
import { User } from './modules/users/models/user';
import { Router } from '@angular/router';
import { MainNavigatorService } from './modules/shared/components/main-navigator/main-navigator.service';
import { CurrencyExchangeService } from './currency-exchange.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ MainNavigatorService ]
})
export class AppComponent implements OnInit {
  
  title : string = 'AtomiCoconut';
  user : User = null;
  defaultGravatarUrl = configuration.defaultGravatarUrl;

  constructor(private router : Router, private appService: AppService, public usersService : UsersService, public currencyExchangeService : CurrencyExchangeService,
    private mainNavigatorService : MainNavigatorService) { }

  ngOnInit(): void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    //set the navigation links valid for this components
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: null, selected: true },
      { displayName: 'Investments', url: '/investments', selected: false },
      { displayName: 'Calculators', url: '/calculators', selected: false }]);

    this.usersService.user$.subscribe((user : User) => this.user = user); //start listening the source of user
      
    this.setUser();

    if (!this.currencyExchangeService.rates) {
      this.currencyExchangeService.getRates().subscribe(
        (data : any) => {
          this.currencyExchangeService.rates = data;
          this.appService.consoleLog('info', `${methodTrace} Currency exchange rates successfully loaded!`);
        },
        (error : any) => this.appService.consoleLog('error', `${methodTrace} Currency exchange rates API failed.`)
      );
    }
  }

  setUser() {
    let methodTrace = `${this.constructor.name} > setUser() > `; //for debugging

    this.usersService.getAuthenticatedUser().subscribe(
      (data : any) => {
        if (data && data.email) {
          const user : User = new User(data.name, data.email, data.avatar, data.accessToInvestments, null, null, data.currency);
          this.usersService.setUser(user);
        } else {
          this.appService.consoleLog('info', `${methodTrace} User not logged in.`, data);
          this.usersService.setUser(null);
        }
      }, 
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the getAuthenticatedUser service.`, error);
        this.usersService.setUser(null);
      }
    );
  }

  logout() : void {
    let methodTrace = `${this.constructor.name} > logout() > `; //for debugging  
    
    this.usersService.logout().subscribe(
      (data : any) => {
        this.usersService.setUser(null);
        this.router.navigate(['/']);
      },
      (error : any) =>  {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the logout service.`, error);
      }
    );
  }
}
