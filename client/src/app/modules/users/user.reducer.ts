import { User } from './models/user';
import { UserActionTypes, UserActions } from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  loggedIn: boolean,
  user: User,
  forgotFormVisibility: boolean
}

export const initialState: UserState = {
  loggedIn: false,
  user: null,
  forgotFormVisibility: false
};

export function reducer(state: UserState = initialState, action: UserActions): UserState {
  const methodTrace = `User > reducer( ${action.type} ) > `; // for debugging

  switch (action.type) {

    case UserActionTypes.AuthenticatedUser: {
      return {
        ...state,
        user: action.payload.user
      }
    }

    case UserActionTypes.Login: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user
      }
    }

    case UserActionTypes.Logout: {
      return {
        ...state,
        loggedIn: false,
        user: null
      }
    }

    case UserActionTypes.Forgot: {
      return {
        ...state,
        forgotFormVisibility: false
      }
    }

    case UserActionTypes.RequestForgot: {
      return {
        ...state, 
        forgotFormVisibility: true
      }
    }

    default: {
      return state;
    }
  }
}
