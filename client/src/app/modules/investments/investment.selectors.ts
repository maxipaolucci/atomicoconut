import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromInvestment from  './investment.reducer';


export const selectInvestmentsState = createFeatureSelector<fromInvestment.State>("investments");

export const investmentsSelector = () => createSelector(
  selectInvestmentsState,
  fromInvestment.selectAll
);

export const allInvestmentsLoadedSelector = () => createSelector(
  selectInvestmentsState,
  investmentsState => investmentsState.allEntitiesLoaded
);

export const investmentByIdSelector = (id: string) => {
  return createSelector(
      selectInvestmentsState,
      investmentsState => {
        return investmentsState.entities[id]
      }
  )
};