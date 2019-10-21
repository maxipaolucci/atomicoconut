import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CryptoRateActionTypes, RequestOne, AddOne } from './crypto-rate.actions';
import { HideProgressBar, FinalizeOperation, ShowProgressBar } from 'src/app/app.actions';
import { delay, mergeMap, exhaustMap, tap, map, withLatestFrom, filter, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { State } from '../../main.reducer';
import { Store, select } from '@ngrx/store';
import { AppService } from 'src/app/app.service';
import { CurrencyExchangeService } from './currency-exchange.service';
import { CryptoRate } from './models/crypto-rate';

@Injectable()
export class CryptoRateEffects {

  @Effect()
  requestOne$ = this.actions$.pipe(
    ofType<RequestOne>(CryptoRateActionTypes.RequestOne),
    tap(({payload}) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Fetching crypto rate...' }));
    }),
    exhaustMap(({ payload }) => this.currencyExchangeService.getCryptoRates$(payload.crypto)
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((cryptoRate: CryptoRate) => {
      if (cryptoRate) {
        //dispatch the action to save the value in the store
        return new AddOne({ cryptoRate });
      }

      // if here, means http error in the response. 
      return new FinalizeOperation(); //we don't want to do anything in this case, stop the loadingData flag
    }) 
  );

  @Effect({ dispatch: false })
  addOne$ = this.actions$.pipe(
    ofType<AddOne>(CryptoRateActionTypes.AddOne),
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
