import { User } from './models/user';
import { UserActionTypes, UserActions } from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  loggedIn: boolean,
  user: User,
  forgotFormVisibility: boolean,
  apiSecurityToken: string
}

export const initialState: UserState = {
  loggedIn: false,
  user: null,
  forgotFormVisibility: false,
  apiSecurityToken: null
};

export function reducer(state: UserState = initialState, action: UserActions): UserState {
  const methodTrace = `User > reducer( ${action.type} ) > `; // for debugging

  switch (action.type) {

    case UserActionTypes.UpdateAccountInfo:
    case UserActionTypes.UpdateAccountPersonalInfo:
    case UserActionTypes.UpdateAccountFinancialInfo:
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

    case UserActionTypes.SaveApiSecurityToken: {
      return {
        ...state,
        apiSecurityToken: action.payload.token
      }
    }

    default: {
      return state;
    }
  }
}
