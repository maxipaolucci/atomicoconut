import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CryptoRateActions, CryptoRateActionTypes } from './crypto-rate.actions';
import { CryptoRate } from './models/crypto-rate';

export const cryptoRatesFeatureKey = 'cryptoRates';

export interface State extends EntityState<CryptoRate> {
  // additional entities state properties
}

export const adapter: EntityAdapter<CryptoRate> = createEntityAdapter<CryptoRate>(
  // {
  //   selectId: cryptoRate => cryptoRate.id
  // }
);

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(state = initialState, action: CryptoRateActions): State {
  switch (action.type) {
    
    case CryptoRateActionTypes.AddOne: {
      return adapter.addOne(action.payload.cryptoRate, state);
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
