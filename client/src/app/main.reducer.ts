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
import { reducer } from './app.reducer';
import { UserActionTypes, UserActions } from 'src/app/modules/users/user.actions';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  application: reducer
};

/**
 * This is a meta-reducer method.
 * We use it to clear the whole app state when the user logout. When we make the state undefined then
 * ngrx reset all the reducers to its initial state.
 * See https://medium.com/@moneychaudhary/how-to-reset-the-state-or-clear-the-store-on-logout-in-ngrx-store-d2bd6304f8f3
 * 
 * @param { reducer } reducer
 * @return { reducer } 
 */
export function clearState(reducer) {
  return function (state, action) {

    if (action.type === UserActionTypes.Logout) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

// storeFreeze is just needed in dev mode. We won't the penalty of execution in prod. With storefreeze we know that our logic it is not mutating the store
export const metaReducers: MetaReducer<State>[] = !environment.production ? [ storeFreeze, clearState ] : [ clearState ];
