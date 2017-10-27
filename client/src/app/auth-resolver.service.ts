import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from './modules/users/models/user';
import { AccountPersonal } from './modules/users/models/account-personal';
import { AccountFinance } from './modules/users/models/account-finance';
import { UsersService } from './modules/users/users.service';
import { AppService } from './app.service';

@Injectable()
export class AuthResolver implements Resolve<User> {
  constructor(private appService : AppService, private usersService : UsersService, private router : Router) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    let methodTrace = `${this.constructor.name} > resolve() > `; //for debugging  

    const urlsForCompleteUserData : Array<string> = ['/investments', '/users/account'];
    let params : any = null;
    if (urlsForCompleteUserData.includes(state.url)) {
      params = { personalInfo : true, financialInfo : true };
    }

    return this.usersService.getAuthenticatedUser(params).map(
      (data : any) => {
        if (data && data.email) {
          let personalInfo = null;
          if (data.personalInfo) {
            personalInfo = new AccountPersonal(data.personalInfo.birthday);
          }

          let financialInfo = null;
          if (data.financialInfo) {
            financialInfo = new AccountFinance(data.financialInfo.annualIncome, data.financialInfo.netWorth, data.financialInfo.incomeTaxRate);
          }
          const user : User = new User(data.name, data.email, data.avatar, data.accessToInvestments, financialInfo, personalInfo);          
          this.usersService.user = user;
          return user;
        } else {
          this.appService.consoleLog('info', `${methodTrace} User not logged in.`, data);
          this.usersService.user = null;
          this.router.navigate(['/users/login']);
          return null;
        }
      }, 
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the getAuthenticatedUser service.`, error);
        this.usersService.user = null;
        this.router.navigate(['/users/login']);
        return null;
      }
    );
  }
  
}
