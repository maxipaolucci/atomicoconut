import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromCryptoRate from  './crypto-rate.reducer';


export const selectCryptoRatesState = createFeatureSelector<fromCryptoRate.State>("cryptoRates");

export const propertiesSelector = () => createSelector(
  selectCryptoRatesState,
  fromCryptoRate.selectAll
);

export const cryptoRateByIdSelector = (id: string) => {
  return createSelector(
      selectCryptoRatesState,
      cryptoRatesState => {
        return cryptoRatesState.entities[id]
      }
  )
};