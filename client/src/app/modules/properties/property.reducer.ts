import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Property } from './property.model';
import { PropertyActions, PropertyActionTypes } from './property.actions';

export const propertiesFeatureKey = 'properties';

export interface State extends EntityState<Property> {
  // additional entities state properties
  allEntitiesLoaded: boolean
}

export const adapter: EntityAdapter<Property> = createEntityAdapter<Property>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  allEntitiesLoaded: false
});

export function reducer(state = initialState, action: PropertyActions): State {
  const methodTrace = `property > reducer( ${action.type} ) > `; // for debugging

  switch (action.type) {
    case PropertyActionTypes.AddAll: {
      return adapter.addAll(action.payload.properties, { 
        ...state, 
        allEntitiesLoaded: action.payload.serverError ? false : true
      });
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
