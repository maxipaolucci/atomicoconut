import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromProperty from  './property.reducer';


export const selectPropertiesState = createFeatureSelector<fromProperty.State>("properties");

export const propertiesSelector = () => createSelector(
  selectPropertiesState,
  fromProperty.selectAll
);

export const allPropertiesLoadedSelector = () => createSelector(
  selectPropertiesState,
  propertiesState => propertiesState.allEntitiesLoaded
);

export const propertyByIdSelector = (id: string) => {
  return createSelector(
      selectPropertiesState,
      propertiesState => {
        return propertiesState.entities[id]
      }
  )
};