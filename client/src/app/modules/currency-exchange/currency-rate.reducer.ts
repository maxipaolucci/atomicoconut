import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CurrencyRate } from './models/currency-rate';
import { CurrencyRateActions, CurrencyRateActionTypes } from './currency-rate.actions';

export const currencyRatesFeatureKey = 'currencyRates';

export interface State extends EntityState<CurrencyRate> {
  // additional entities state properties
}

export const adapter: EntityAdapter<CurrencyRate> = createEntityAdapter<CurrencyRate>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(state = initialState, action: CurrencyRateActions): State {
  switch (action.type) {
    
    case CurrencyRateActionTypes.AddMany: {
      return adapter.addMany(action.payload.currencyRates, state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
