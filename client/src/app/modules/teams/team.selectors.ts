import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTeam from  './team.reducer';


export const selectTeamsState = createFeatureSelector<fromTeam.State>("teams");

export const teamsSelector = () => createSelector(
  selectTeamsState,
  fromTeam.selectAll
);

export const allTeamsLoadedSelector = () => createSelector(
  selectTeamsState,
  fromTeam.allTeamsLoaded
);

export const loadingSelector = () => createSelector(
  selectTeamsState,
  fromTeam.loading
);

export const teamBySlugSelector = (slug: string) => createSelector(
  selectTeamsState,
  teamsState => teamsState.entities[slug]
);
