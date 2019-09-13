import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';


export const selectUserState = createFeatureSelector<fromUser.UserState>("user");

export const userSelector = () => createSelector(
  selectUserState,
  (state: fromUser.UserState) => state.user
);

export const loggedInSelector = () => createSelector(
  selectUserState,
  (state: fromUser.UserState) => state.loggedIn
);

export const forgotFormVisibilitySelector = () => createSelector(
  selectUserState,
  (state: fromUser.UserState) => state.forgotFormVisibility
);