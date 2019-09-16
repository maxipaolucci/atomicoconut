import { LoadingData } from './models/loadingData';
import { AppActions, AppActionTypes } from './app.actions';

export const appFeatureKey = 'application';

export interface AppState {
  loadingData: LoadingData
}

export const initialState: AppState = {
  loadingData: null
};

export function reducer(state: AppState = initialState, action: AppActions): AppState {
  const methodTrace = `App > reducer( ${action.type} ) > `; // for debugging

  switch (action.type) {
    case AppActionTypes.ShowProgressBar: {
      return {
        ...state,
        loadingData: {
          message: action.payload.message ? action.payload.message : '',
          color: action.payload.color ? action.payload.color : 'primary',
          extraClasses: action.payload.extraClasses ? action.payload.extraClasses : ''
        }
      }
    }
    
    case AppActionTypes.HideProgressBar: {
      return {
        ...state,
        loadingData: null
      }
    }

    case AppActionTypes.FinalizeOperation: {
      console.log(methodTrace, state);
      return state;
    }

    default: {
      return state;
    }
  }
}
