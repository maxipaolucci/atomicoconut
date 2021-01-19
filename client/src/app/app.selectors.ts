import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromApp from './app.reducer';


export const selectAppState = createFeatureSelector<fromApp.AppState>("application");

export const redirectUrlSelector = () => createSelector(
  selectAppState,
  (state: fromApp.AppState) => state.redirectUrl
);

export const loadingSelector = () => createSelector(
  selectAppState,
  (state: fromApp.AppState) => state.loadingData
);

export const isOnlineSelector = () => createSelector(
  selectAppState,
  (state: fromApp.AppState) => state.isOnline
);

export const apiKeysSelector = () => createSelector(
  selectAppState,
  (state: fromApp.AppState) => state.apiKeys
);
