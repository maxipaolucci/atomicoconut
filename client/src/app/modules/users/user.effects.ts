import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { RequestLogin, UserActionTypes, Login, RequestLogout, Logout, RequestForgot, Forgot, RequestReset } from './user.actions';
import { mergeMap, switchMap, exhaustMap, map, catchError, tap, delay } from 'rxjs/operators';
import { of, defer } from 'rxjs';
import { User } from './models/user';
import { State } from 'src/app/main.reducer';
import { Store } from '@ngrx/store';
import { ShowProgressBar, HideProgressBar, FinalizeOperation } from 'src/app/app.actions';

@Injectable()
export class UserEffects {
  
  @Effect()
  init$ = defer(() => {
    let userData: string = localStorage.getItem("user");
    if (userData) {
      // userData = JSON.parse(userData);
      // let params = {
      //   financialInfo: userData.financialInfo ? true : false,
      //   personalInfo: userData.personalInfo ? true : false
      // };
      return this.usersService.getAuthenticatedUser$().pipe(
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
    tap((action) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Authenticating...' }));  
    }),
    switchMap(({ payload }) => this.usersService.login$(payload)
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((user: User) => {
      if (user) {
        // localStorage.setItem("user", user);
        localStorage.setItem("user", user.email);
        //dispatch the action to save the value in the store
        return new Login({ user });
      }

      // if here, means http error in the request. 
      return new FinalizeOperation(); //we don't want to do anything in this case, stop the loadingData flag
    }) 
  );

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(UserActionTypes.Login),
    tap(() => {
      const redirectUrl = this.usersService.routerRedirectUrl ? this.usersService.routerRedirectUrl : '/';
      this.usersService.routerRedirectUrl = null;
      this.store.dispatch(new HideProgressBar());
      this.router.navigate([redirectUrl]);
    })
  );

  @Effect()
  requestLogout$ = this.actions$.pipe(
    ofType<RequestLogout>(UserActionTypes.RequestLogout),
    tap((action) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Logging out user...' }));  
    }),
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
      this.store.dispatch(new HideProgressBar());
      this.router.navigate(['/']);
    })
  );

  @Effect()
  requestForgot$ = this.actions$.pipe(
    ofType<RequestForgot>(UserActionTypes.RequestForgot),
    tap((action) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Requesting password change...' }));  
    }),
    mergeMap(({ payload }) => this.usersService.forgot$(payload)
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((result: boolean) => {
      if (result) {
        return new Forgot();
      }

      // if here, means http error in the response. 
      return new FinalizeOperation(); //we don't want to do anything in this case, stop the loadingData flag
    }) 
  );

  
  @Effect({ dispatch: false })
  forgot$ = this.actions$.pipe(
    ofType<Forgot>(UserActionTypes.Forgot),
    tap((action) => {
      this.store.dispatch(new HideProgressBar());
    })
  );

  @Effect()
  requestReset$ = this.actions$.pipe(
    ofType<RequestReset>(UserActionTypes.RequestReset),
    tap((action) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Requesting password reset...', color: 'accent' }));  
    }),
    exhaustMap(({ payload }) => this.usersService.reset$(payload.token, payload.model)  //exhaustMap because we want to ignore multiple request till the first is complete. 
                                                                                        // Weird to happen because of the loading screen disables the button
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((user: User) => {
      if (user) {
        localStorage.setItem("user", user.email);
        //dispatch the action to save the value in the store
        return new Login({ user });
      }
      return new FinalizeOperation({ redirectData: ['/'] }); //we don't want to do anything in this case, stop the loadingData flag
    }) 
  );

  constructor(
    private actions$: Actions, 
    private usersService: UsersService, 
    private router: Router,
    private store: Store<State>,
  ) {}
}
