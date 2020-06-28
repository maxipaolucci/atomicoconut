import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromMain from './main.reducer';


export const selectAppState = createFeatureSelector<fromMain.State>("router");

export const routerSelector = () => createSelector(
  selectAppState,
  (routerState: fromMain.State) => routerState && routerState["state"] ? routerState["state"] : null
);
