import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromCryptoRate from  './crypto-rate.reducer';


export const selectCryptoRatesState = createFeatureSelector<fromCryptoRate.State>("cryptoRates");

export const cryptoRatesSelector = () => createSelector(
  selectCryptoRatesState,
  fromCryptoRate.selectAll
);

export const cryptoRateByIdSelector = (id: string) => {
  return createSelector(
      selectCryptoRatesState,
      cryptoRatesState => cryptoRatesState.entities[id]
  )
};