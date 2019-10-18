import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppService } from 'src/app/app.service';
import { InvestmentsService } from './investments.service';
import { Router } from '@angular/router';
import { State } from '../../main.reducer';
import { Store, select } from '@ngrx/store';
import { delay, mergeMap, tap, map, withLatestFrom, filter, catchError } from 'rxjs/operators';
import { ShowProgressBar, FinalizeOperation, HideProgressBar } from 'src/app/app.actions';
import { RequestAll, InvestmentActionTypes, AddAll } from './investment.actions';
import { allInvestmentsLoadedSelector } from './investment.selectors';
import { of } from 'rxjs';
import { Investment } from './models/investment';


@Injectable()
export class InvestmentEffects {

  @Effect()
  requestAll$ = this.actions$.pipe(
    ofType<RequestAll>(InvestmentActionTypes.RequestAll),
    tap(({ payload }) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Fetching investments...' }));
    }),
    withLatestFrom(this.store.pipe(select(allInvestmentsLoadedSelector()))),
    filter(([{ payload }, allEntitiesLoaded]) => {
      if (!allEntitiesLoaded) {
        // properties are not in the store or we want to push a fetch from the server
        return true;
      } else {
        // properties are in the store 
        this.store.dispatch(new FinalizeOperation());
        return false;
      }
    }),
    // delay(4000),
    mergeMap(([{ payload }, allEntitiesLoaded]) => this.investmentsService.getInvestments$(payload.userEmail)
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((investments: Investment[]) => {
      //dispatch the action to save the value in the store
      if (investments) {
        return new AddAll({ investments });
      }

      return new AddAll({ investments: [], serverError: true }); //avoid set allEntitiesLoaded flag to true
    }) 
  );

  @Effect({ dispatch: false })
  addAll$ = this.actions$.pipe(
    ofType<AddAll>(InvestmentActionTypes.AddAll),
    tap(() => {
      this.store.dispatch(new HideProgressBar());
    })
  );

  constructor(
    private actions$: Actions,
    private appService: AppService, 
    private store: Store<State>,
    private investmentsService: InvestmentsService,
    private router: Router  
  ) {}

}
