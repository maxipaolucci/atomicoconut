import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';


export const selectUserState = createFeatureSelector<fromUser.UserState>("user");

export const userSelector = () => createSelector(
  selectUserState,
  (userState: fromUser.UserState) => userState.user
);

export const loggedInSelector = () => createSelector(
  selectUserState,
  (userState: fromUser.UserState) => userState.loggedIn
);

export const loadingSelector = () => createSelector(
  selectUserState,
  fromUser.loading
);