import { Injectable } from '@angular/core';
import { AppActionTypes, FinalizeOperation } from './app.actions';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { State } from 'src/app/main.reducer';
import { Store } from '@ngrx/store';
import { HideProgressBar } from 'src/app/app.actions';
import { Logout, UserActionTypes } from './modules/users/user.actions';
import { SetLinks } from './modules/shared/components/main-navigator/main-navigator.actions';



@Injectable()
export class AppEffects {

  @Effect({ dispatch: false })
  finalizeOperation$ = this.actions$.pipe(
    ofType<FinalizeOperation>(AppActionTypes.FinalizeOperation),
    tap(({ payload }) => {
      this.store.dispatch(new HideProgressBar());
      if (payload && payload.redirectData && payload.redirectData.length) {
        return this.router.navigate(payload.redirectData);
      }

      return; // do nothing here
    })
  )

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(UserActionTypes.Logout),
    tap(() => {
      // we do this because the logout action previously reseted the global app state making it 
      // re-initilize and leaving the navigator empty. So this side effect repopulates the navigator with 
      // the welcome componennt options where we are going to be redirected
      this.store.dispatch(new SetLinks({ links: [
        { displayName: 'Welcome', url: null, selected: true },
        { displayName: 'Investments', url: '/investments', selected: false },
        { displayName: 'Properties', url: '/properties', selected: false },
        { displayName: 'Calculators', url: '/calculators', selected: false }
      ]}));
    })
  );

  constructor(
    private actions$: Actions, 
    private router: Router,
    private store: Store<State>,
  ) {}

}
