import { LoadingData } from './models/loadingData';
import { AppActions, AppActionTypes } from './app.actions';
import { ApiKeys } from './models/api-keys';

export const appFeatureKey = 'application';

export interface AppState {
  loadingData: LoadingData,
  redirectUrl: String,
  isOnline: boolean,
  apiKeys: ApiKeys
}

export const initialState: AppState = {
  loadingData: null,
  redirectUrl: null,
  isOnline: true,
  apiKeys: null
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

    case AppActionTypes.SetRedirectUrl: {
      return {
        ...state,
        redirectUrl: action.payload.url
      }
    }
    
    case AppActionTypes.HideProgressBar: {
      return {
        ...state,
        loadingData: null
      }
    }

    case AppActionTypes.SetIsOnline: {
      return {
        ...state,
        isOnline: action.payload
      };
    }

    case AppActionTypes.AddApiKeys: {
      return {
        ...state,
        apiKeys: action.payload.apiKeys
      }
    }

    default: {
      return state;
    }
  }
}
