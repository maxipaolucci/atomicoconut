import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { InvestmentActions, InvestmentActionTypes } from './investment.actions';
import { Investment } from './models/investment';

export const investmentsFeatureKey = 'investments';

export interface State extends EntityState<Investment> {
  // additional entities state properties
  allEntitiesLoaded: boolean
}

export const adapter: EntityAdapter<Investment> = createEntityAdapter<Investment>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  allEntitiesLoaded: false
});

export function reducer(state = initialState, action: InvestmentActions): State {
  const methodTrace = `investment > reducer( ${action.type} ) > `; // for debugging

  switch (action.type) {
    
    case InvestmentActionTypes.ResetAllEntitiesLoaded: {
      return {
        ...state,
        allEntitiesLoaded: false
      };
    }

    case InvestmentActionTypes.AddAll: {
      return adapter.addAll(action.payload.investments, { 
        ...state, 
        allEntitiesLoaded: action.payload.serverError ? false : true
      });
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
