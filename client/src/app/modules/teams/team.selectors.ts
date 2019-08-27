import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTeam from  './team.reducer';


export const selectTeamsState = createFeatureSelector<fromTeam.State>("teams");

export const teamsSelector = () => createSelector(
  selectTeamsState,
  fromTeam.selectAll
);

export const allTeamsLoaded = () => createSelector(
  selectTeamsState,
  fromTeam.allTeamsLoaded
);
