import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from './models/user';
import { UsersService } from './users.service';
import { AppService } from '../../app.service';
import { ConsoleNotificationTypes } from '../../constants';
import { userSelector } from './user.selectors';
import { Store, select } from '@ngrx/store';
import { AuthenticatedUser } from './user.actions';
import { UserAdditionalInfo } from './models/user-additional-info';
import { State } from '../../main.reducer';

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(
    private appService: AppService, 
    private usersService: UsersService,
    private router: Router,
    private store: Store<State>
  ) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const methodTrace = `${this.constructor.name} > resolve() > `; // for debugging  
    
    const urlsForCompleteUserData: Array<string> = ['/investments', '/users/account'];
        
    this.store.select(userSelector())
      .subscribe((user: User) => {
        if (user.personalInfo && user.financialInfo) {
          console.log(123, user);
          return of(user);
        }
        
        let params: UserAdditionalInfo = null;
        if (urlsForCompleteUserData.includes(state.url)) {
          params = { personalInfo : true, financialInfo : true };

          // this.store.dispatch(new RequestAuthenticatedUser(params));
          return this.usersService.getAuthenticatedUser$(params)
            .pipe(
              map((updatedUser: User) => {
                this.store.dispatch(new AuthenticatedUser({ user: updatedUser }));
                return updatedUser
              }),
              catchError((error: any) => {
                this.appService.consoleLog(ConsoleNotificationTypes.WARN, `${methodTrace} There was something wrong with the getAuthenticatedUser service and the expected data did not come back`, error)
                return of(user); //return the current user with no additional info
              }), //http errors are properly handle in http-error.interceptor, just send null to the next method
          );
        }

        return of(user);
      });
      // switchMap((user: User): Observable<User> => {
        
      // }),
      // map((user: User) => {console.log(1234, user); return user})
    // );
  }
}
