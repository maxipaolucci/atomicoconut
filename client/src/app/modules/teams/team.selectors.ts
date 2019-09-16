import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTeam from  './team.reducer';


export const selectTeamsState = createFeatureSelector<fromTeam.State>("teams");

export const teamsSelector = () => createSelector(
  selectTeamsState,
  fromTeam.selectAll
);

export const allTeamsLoadedSelector = () => createSelector(
  selectTeamsState,
  teamsState => teamsState.allTeamsLoaded
);

export const teamBySlugSelector = (slug: string) => {
  return createSelector(
      selectTeamsState,
      teamsState => {
        return teamsState.entities[slug]
      }
  )
};

export const lastUpdatedTeamSlugSelector = () => createSelector(
  selectTeamsState,
  teamsState => teamsState.lastUpdatedTeamSlug
);
