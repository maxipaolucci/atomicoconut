import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from './modules/users/models/user';
import { UsersService } from './modules/users/users.service';
import { AppService } from './app.service';


@Injectable()
export class AuthResolver implements Resolve<User> {

  constructor(
      private appService: AppService, 
      private usersService: UsersService,
      private router: Router) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    const methodTrace = `${this.constructor.name} > resolve() > `; // for debugging  
    
    const urlsForCompleteUserData: Array<string> = ['/investments', '/users/account'];
    let params: any = null;
    if (urlsForCompleteUserData.includes(state.url)) {
      params = { personalInfo : true, financialInfo : true };
    }

    const user: User = this.usersService.getUser(); //thanks to auth guard I know there is a user logged in
    if (params && (!user.personalInfo || !user.financialInfo)) {
      // I need to get the user info from the server
      return this.usersService.getAuthenticatedUser$(params).pipe(
        map((updatedUser: User): User => {
          if (updatedUser) {
            return updatedUser;
          } else {
            this.appService.consoleLog('warn', `${methodTrace} There was something wrong with the getAuthenticatedUser service and the expected data did not come back`)
            return user;
          }
        }),
        catchError((error: any): Observable<User> => {
          this.appService.consoleLog('error', `${methodTrace} There was an error with the getAuthenticatedUser service.`, error);
          return of(user);
        })
      );
    }

    return user;
  }
}
