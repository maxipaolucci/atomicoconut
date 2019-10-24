import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromCurrencyRate from  './currency-rate.reducer';
import { CurrencyRate } from './models/currency-rate';


export const selectCurrencyRatesState = createFeatureSelector<fromCurrencyRate.State>("currencyRates");

export const currencyRatesSelector = () => createSelector(
  selectCurrencyRatesState,
  fromCurrencyRate.selectAll
);

export const currencyRateByIdSelector = (date: string) => {
  return createSelector(
      selectCurrencyRatesState,
      currencyRatesState => {
        return currencyRatesState.entities[date]
      }
  )
};

export const currencyRateByIdsSelector = (dates: string[]) => {
  return createSelector(
      selectCurrencyRatesState,
      currencyRatesState => {
        let currencyRates = {};
        dates.map((date: string) => {
          if (currencyRatesState.entities[date]) {
            currencyRates[date] = currencyRatesState.entities[date];
          }
        });

        return currencyRates;
      }
  )
};

export const allCurrencyRateByIdsLoadedSelector = (dates: string[]) => {
  const baseSelector = currencyRateByIdsSelector(dates);
  return createSelector(
    baseSelector,
    currencyRatesState => {
      return Object.keys(currencyRatesState).length === dates.length
    }
  )
};