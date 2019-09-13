import { User } from './models/user';
import { LoadingData } from 'src/app/models/loadingData';
import { UserActionTypes, UserActions } from './user.actions';
import * as fromRoot from '../../main.reducer'

export const userFeatureKey = 'user';

export interface UserState {
  loggedIn: boolean,
  user: User,
  loadingData: LoadingData,
  forgotFormVisibility: boolean
}

export const initialState: UserState = {
  loggedIn: false,
  user: null,
  loadingData: null,
  forgotFormVisibility: false
};

export function reducer(state: UserState = initialState, action: UserActions): UserState {
  const methodTrace = `User > reducer( ${action.type} ) > `; // for debugging

  switch (action.type) {

    case UserActionTypes.CancelRequest: {
      return {
        ...state,
        loadingData: null
      };
    }

    case UserActionTypes.RequestLogin: {
      return {
        ...state
        // loadingData: {
        //   message: 'Authenticating...'
        // }
      };
    }

    case UserActionTypes.Login: {
      return {
        ...state,
        loggedIn: true,
        // loadingData: null,
        user: action.payload.user
      }
    }

    case UserActionTypes.RequestLogout: {
      return {
        ...state,
        loadingData: {
          message: 'Logout user...'
        }
      };
    }

    case UserActionTypes.Logout: {
      return {
        ...state,
        loggedIn: false,
        loadingData: null,
        user: null
      }
    }

    case UserActionTypes.Forgot: {
      return {
        ...state,
        loadingData: null,
        forgotFormVisibility: false
      }
    }

    case UserActionTypes.RequestForgot: {
      return {
        ...state,
        loadingData: {
          message: 'Requesting password change...'
        },
        forgotFormVisibility: true
      }
    }

    case UserActionTypes.RequestReset: {
      return {
        ...state,
        loadingData: {
          message: 'Requesting password reset...',
          color: 'accent'
        }
      }
    }

    default:
      return state;
  }
}
