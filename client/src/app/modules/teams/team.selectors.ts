import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTeam from  './team.reducer';
import { Team } from './models/team';


export const selectTeamsState = createFeatureSelector<fromTeam.State>("teams");

export const teamsSelector = () => createSelector(
  selectTeamsState,
  fromTeam.selectAll
);

export const selectIsInitialState = () => createSelector(
  selectTeamsState,
  fromTeam.isInitialState
);
