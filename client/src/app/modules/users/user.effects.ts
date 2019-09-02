import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { UsersService } from './users.service';
import { RequestLogin, UserActionTypes, CancelRequest, Login, UserActions } from './user.actions';
import { mergeMap, map, withLatestFrom, filter, catchError, tap } from 'rxjs/operators';
import { LoginModel } from './models/login-model';
import { of } from 'rxjs';
import { User } from './models/user';

@Injectable()
export class UserEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType<RequestLogin>(UserActionTypes.RequestLogin),
    mergeMap(({ payload }) => this.usersService.login$(payload)
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((user: User) => {
      if (user) {
        //dispatch the action to save the value in the store
        return new Login({ user });
      }

      // if here, means http error in the request. 
      return new CancelRequest(); //we don't want to do anything in this case, stop the loadingData flag
    }) 
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
