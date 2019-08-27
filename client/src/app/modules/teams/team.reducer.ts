import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Team } from './models/team';
import { TeamActions, TeamActionTypes } from './team.actions';

export const teamsFeatureKey = 'teams';

export interface State extends EntityState<Team> {
  // additional entities state properties
  allTeamsLoaded: boolean;
}

export const adapter: EntityAdapter<Team> = createEntityAdapter<Team>(
  {
    selectId: team => team.slug
  }
);

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  allTeamsLoaded: false
});

export function reducer(state = initialState, action: TeamActions): State {
  switch (action.type) { 

    case TeamActionTypes.LoadTeams: {
      return adapter.addAll(action.payload.teams, { ...state, allTeamsLoaded: true });
    }
    
    default: {
      return state;
    }
  }
}

export const allTeamsLoaded = (state: State) => state.allTeamsLoaded;

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();