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

export const cryptoRateByIdsSelector = (cryptos: string[]) => {
  return createSelector(
      selectCryptoRatesState,
      cryptoRatesState => {
        let cryptoRates = {};
        cryptos.map((crypto: string) => {
          if (cryptoRatesState.entities[crypto]) {
            cryptoRates[crypto] = cryptoRatesState.entities[crypto];
          }
        });
        
        return cryptoRates;
      }
  )
};

export const allCryptoRateByIdsLoadedSelector = (cryptos: string[]) => {
  const baseSelector = cryptoRateByIdsSelector(cryptos);
  console.log('crypto rate selector called');
  return createSelector(
    baseSelector,
    cryptoRatesState => {
      return Object.keys(cryptoRatesState).length === cryptos.length;
    }
  )
};