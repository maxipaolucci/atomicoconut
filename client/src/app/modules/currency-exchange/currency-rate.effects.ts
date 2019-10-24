import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { delay, mergeMap, tap, map, catchError } from 'rxjs/operators';
import { RequestMany, CurrencyRateActionTypes, AddMany } from './currency-rate.actions';
import { ShowProgressBar, FinalizeOperation, HideProgressBar } from 'src/app/app.actions';
import { CurrencyExchangeService } from './currency-exchange.service';
import { of } from 'rxjs';
import { State } from '../../main.reducer';
import { Store, select } from '@ngrx/store';
import { CurrencyRate } from './models/currency-rate';



@Injectable()
export class CurrencyRateEffects {

  @Effect()
  requestMany$ = this.actions$.pipe(
    ofType<RequestMany>(CurrencyRateActionTypes.RequestMany),
    tap(({payload}) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Fetching currency rates...' }));
    }),
    mergeMap(({ payload }) => this.currencyExchangeService.getCurrencyRates$(payload.dates, payload.base)
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((currencyRates: CurrencyRate[]) => {
      if (currencyRates.length) {
        //dispatch the action to save the value in the store
        return new AddMany({ currencyRates });
      }

      // if here, means http error in the response. 
      return new FinalizeOperation(); //we don't want to do anything in this case, stop the loadingData flag
    }) 
  );

  @Effect({ dispatch: false })
  addMany$ = this.actions$.pipe(
    ofType<AddMany>(CurrencyRateActionTypes.AddMany),
    tap(() => {
      this.store.dispatch(new HideProgressBar());
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private currencyExchangeService: CurrencyExchangeService
  ) {}

}
