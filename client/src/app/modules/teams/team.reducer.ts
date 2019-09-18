import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Team } from './models/team';
import { TeamActions, TeamActionTypes } from './team.actions';

export const teamsFeatureKey = 'teams';

export interface State extends EntityState<Team> {
  // additional entities state properties
  allTeamsLoaded: boolean;
  lastUpdatedTeamSlug: string;
}

export const adapter: EntityAdapter<Team> = createEntityAdapter<Team>(
  {
    selectId: team => team.slug
  }
);

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  allTeamsLoaded: false,
  lastUpdatedTeamSlug: null
});

export function reducer(state = initialState, action: TeamActions): State {
  const methodTrace = `team > reducer( ${action.type} ) > `; // for debugging

  switch (action.type) { 

    case TeamActionTypes.AddAll: {
      return adapter.addAll(action.payload.teams, { 
        ...state, 
        allTeamsLoaded: action.payload.serverError ? false : true
      });
    }

    case TeamActionTypes.AddOne: {
      return adapter.addOne(action.payload.team, state);
    }

    case TeamActionTypes.Delete: {
      return adapter.removeOne(action.payload.slug, state);
    }

    case TeamActionTypes.RequestUpdate: {
      return {
        ...state,
        lastUpdatedTeamSlug: null
      }
    }

    case TeamActionTypes.Update_: {
      const changes = action.payload.teamChanges;
      
      return adapter.updateOne(changes, { 
        ...state, 
        lastUpdatedTeamSlug: changes.changes.slug != changes.id ? changes.changes.slug : null
      });
    }

    case TeamActionTypes.UseAndResetLastUpdatedTeamSlug: {
      return {
        ...state,
        lastUpdatedTeamSlug: null
      }
    }
    
    default: {
      return state;
    }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();