import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromMainNavigator from './main-navigator.reducer';


export const selectMainNavigatorState = createFeatureSelector<fromMainNavigator.MainNavigatorState>("mainNavigator");

export const linksSelector = () => createSelector(
  selectMainNavigatorState,
  (state: fromMainNavigator.MainNavigatorState) => state.links
);