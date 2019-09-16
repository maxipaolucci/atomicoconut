import { Injectable } from '@angular/core';
import { AppActionTypes, FinalizeOperation } from './app.actions';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { State } from 'src/app/main.reducer';
import { Store } from '@ngrx/store';
import { HideProgressBar } from 'src/app/app.actions';



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

  constructor(
    private actions$: Actions, 
    private router: Router,
    private store: Store<State>,
  ) {}

}
