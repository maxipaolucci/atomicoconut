import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from './modules/users/models/user';
import { UsersService } from './modules/users/users.service';
import { AppService } from './app.service';

@Injectable()
export class AuthResolver implements Resolve<User> {
  constructor(private appService: AppService, private usersService: UsersService, private router: Router) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    const methodTrace = `${this.constructor.name} > resolve() > `; // for debugging  

    this.usersService.routerRedirectUrl = state.url;
    const urlsForCompleteUserData: Array<string> = ['/investments', '/users/account'];
    let params: any = null;
    if (urlsForCompleteUserData.includes(state.url)) {
      params = { personalInfo : true, financialInfo : true };
    }

    return this.usersService.getAuthenticatedUser$(params).pipe(
      map((user: User): User => {
        if (user) {
          this.usersService.routerRedirectUrl = null;
          return user;
        } else {
          this.router.navigate(['/users/login']);
          return null;
        }
      }),
      catchError((error: any): Observable<User> => {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the getAuthenticatedUser service.`, error);
        this.router.navigate(['/users/login']);
        return null;
      })
    );
  }
  
}
