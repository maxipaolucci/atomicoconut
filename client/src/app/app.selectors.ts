import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromApp from './app.reducer';


export const selectAppState = createFeatureSelector<fromApp.AppState>("application");

export const loadingSelector = () => createSelector(
  selectAppState,
  (state: fromApp.AppState) => state.loadingData
);
