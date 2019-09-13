import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';
import { reducer } from './app.reducer'

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  application: reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [ storeFreeze ] : [];
