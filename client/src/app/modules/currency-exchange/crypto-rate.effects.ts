import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CryptoRateActionTypes, RequestMany, AddMany } from './crypto-rate.actions';
import { HideProgressBar, FinalizeOperation, ShowProgressBar } from 'src/app/app.actions';
import { delay, mergeMap, tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { State } from '../../main.reducer';
import { Store } from '@ngrx/store';
import { CurrencyExchangeService } from './currency-exchange.service';
import { CryptoRate } from './models/crypto-rate';

@Injectable()
export class CryptoRateEffects {

  @Effect()
  requestMany$ = this.actions$.pipe(
    ofType<RequestMany>(CryptoRateActionTypes.RequestMany),
    tap(({payload}) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Fetching crypto rates...' }));
    }),
    mergeMap(({ payload }) => this.currencyExchangeService.getCryptoRates$(payload.cryptos)
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((cryptoRates: CryptoRate[]) => {
      if (cryptoRates.length) {
        //dispatch the action to save the value in the store
        return new AddMany({ cryptoRates });
      }

      // if here, means http error in the response. 
      return new FinalizeOperation(); //we don't want to do anything in this case, stop the loadingData flag
    }) 
  );

  @Effect({ dispatch: false })
  addMany$ = this.actions$.pipe(
    ofType<AddMany>(CryptoRateActionTypes.AddMany),
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
