import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Team } from './models/team';
import { TeamActions, TeamActionTypes } from './team.actions';
import { LoadingData } from '../../models/loadingData'

export const teamsFeatureKey = 'teams';

export interface State extends EntityState<Team> {
  // additional entities state properties
  allTeamsLoaded: boolean;
  loadingData: LoadingData;
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
  loadingData: null,
  lastUpdatedTeamSlug: null
});

export function reducer(state = initialState, action: TeamActions): State {
  const methodTrace = `team > reducer( ${action.type} ) > `; // for debugging

  switch (action.type) { 

    case TeamActionTypes.CancelRequest: {
      return {
        ...state,
        loadingData: null
      };
    }

    case TeamActionTypes.RequestAll: {
      let loadingData = null;
      if (!action.payload.silently) {
        loadingData = {
          message: 'Fetching teams...'
        }; 
      }
      
      return {
        ...state,
        loadingData 
      }
    }

    case TeamActionTypes.RequestOne: {
      return {
        ...state,
        loadingData: {
          message: 'Fetching team...'
        }
      }
    }

    case TeamActionTypes.AddAll: {
      return adapter.addAll(action.payload.teams, { 
        ...state, 
        allTeamsLoaded: action.payload.serverError ? false : true, 
        loadingData: null 
      });
    }

    case TeamActionTypes.AddOne: {
      return adapter.addOne(action.payload.team, { 
        ...state,  
        loadingData: null 
      });
    }

    case TeamActionTypes.RequestDelete: {
      return {
        ...state,
        loadingData: {
          message: 'Removing team...',
          color: 'warn'
        }
      }
    }

    case TeamActionTypes.Delete: {
      return adapter.removeOne(action.payload.slug, { 
        ...state, 
        loadingData: null 
      });
    }

    case TeamActionTypes.RequestUpdate: {
      return {
        ...state,
        loadingData: {
          message: 'Updating team...',
          color: 'accent'
        },
        lastUpdatedTeamSlug: null
      }
    }

    case TeamActionTypes.Update_: {
      const changes = action.payload.teamChanges;
      
      return adapter.updateOne(changes, { 
        ...state, 
        loadingData: null,
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
      return { 
        ...state,
        loadingData: null
      };
    }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();