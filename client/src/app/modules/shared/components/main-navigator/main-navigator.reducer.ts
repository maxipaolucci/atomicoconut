import { NavigatorLinkModel } from './models/navigator-link-model';
import { MainNavigatorActions, MainNavigatorActionTypes } from './main-navigator.actions';


export const mainNavigatorFeatureKey = 'mainNavigator';

export interface MainNavigatorState {
  links: NavigatorLinkModel[]
}

export const initialState: MainNavigatorState = {
  links: []
};

export function reducer(state = initialState, action: MainNavigatorActions): MainNavigatorState {
  switch (action.type) {

    case MainNavigatorActionTypes.SetLinks: {
      return {
        ...state,
        links: action.payload.links
      }
    }

    case MainNavigatorActionTypes.AppendLink: {
      return {
        ...state,
        links: state.links.concat([action.payload.link])
      }
    }

    default:
      return state;
  }
}
