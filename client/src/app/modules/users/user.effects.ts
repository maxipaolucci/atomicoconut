import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { RequestLogin, UserActionTypes, CancelRequest, Login, RequestLogout, Logout } from './user.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of, defer } from 'rxjs';
import { User } from './models/user';

@Injectable()
export class UserEffects {
  
  @Effect()
  init$ = defer(() => {
    let userData: any = localStorage.getItem("user");
    if (userData) {
      userData = JSON.parse(userData);
      let params = {
        financialInfo: userData.financialInfo ? true : false,
        personalInfo: userData.personalInfo ? true : false
      };
      return this.usersService.getAuthenticatedUser$(params).pipe(
        mergeMap((user: User) => {
          if (user) {
            return of(new Login({ user }));  
          }
          
          // if not authenticated then remove store data of the user
          return of(new Logout());
        })
      );
    } else {
      // if no userData then call Logout action as the effect is expecting to return and obesrvable action
      return of(new Logout());
    }
  });

  @Effect()
  requestlogin$ = this.actions$.pipe(
    ofType<RequestLogin>(UserActionTypes.RequestLogin),
    mergeMap(({ payload }) => this.usersService.login$(payload)
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((user: User) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        //dispatch the action to save the value in the store
        return new Login({ user });
      }

      // if here, means http error in the request. 
      return new CancelRequest(); //we don't want to do anything in this case, stop the loadingData flag
    }) 
  );

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(UserActionTypes.Login),
    tap(() => {
      const redirectUrl = this.usersService.routerRedirectUrl ? this.usersService.routerRedirectUrl : '/';
      this.usersService.routerRedirectUrl = null;
      this.router.navigate([redirectUrl]);
    })
  );

  @Effect()
  requestLogout$ = this.actions$.pipe(
    ofType<RequestLogout>(UserActionTypes.RequestLogout),
    mergeMap(() => this.usersService.logout$()
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map(() => new Logout()) //do not care of the resutl, just run logout. The backend does not care anyway 
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(UserActionTypes.Logout),
    tap(() => {
      localStorage.removeItem("user");
      this.router.navigate(['/']);
    })
  );

  constructor(private actions$: Actions, private usersService: UsersService, private router: Router) {}
}
