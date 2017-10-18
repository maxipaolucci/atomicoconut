import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { UsersService } from './modules/users/users.service';

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { configuration } from "../../configuration";
import { User } from './modules/users/user';
import { Router } from '@angular/router';
import { MainNavigatorService } from './modules/shared/components/main-navigator/main-navigator.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ MainNavigatorService ]
})
export class AppComponent implements OnInit {
  
  title = 'app';
  defaultGravatarUrl = configuration.defaultGravatarUrl;

  constructor(private router : Router, private appService: AppService, private usersService : UsersService,
    private mainNavigatorService : MainNavigatorService) { }

  ngOnInit(): void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    //set the navigation links valid for this components
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: null, selected: true },
      { displayName: 'Investments', url: '/investments', selected: false },
      { displayName: 'Calculators', url: '/calculators', selected: false }]);

    this.usersService.getAuthenticatedUser().subscribe(
      (data : any) => {
        if (data && data.email) {
          const user : User = new User(data.name, data.email, data.avatar, data.accessToInvestments);
          this.usersService.user = user;
        } else {
          this.appService.consoleLog('info', `${methodTrace} User not logged in.`, data);
          this.usersService.user = null;
        }
      }, 
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the getAuthenticatedUser service.`, error);
        this.usersService.user = null;
      }
    );
  }

  logout() : void {
    let methodTrace = `${this.constructor.name} > logout() > `; //for debugging  
    
    this.usersService.logout().subscribe(
      (data : any) => {
        this.usersService.user = null;
        this.router.navigate(['/']);
      },
      (error : any) =>  {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the logout service.`, error);
      }
    );
  }
}
