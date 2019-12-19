import { Action } from '@ngrx/store';
import { NavigatorLinkModel } from './models/navigator-link-model';

export enum MainNavigatorActionTypes {
  SetLinks = '[MainNavigator] Set links to store',
  AppendLink = '[MainNavigator] Append link to store'
}

export class SetLinks implements Action {
  readonly type = MainNavigatorActionTypes.SetLinks;

  constructor(public payload: { links: NavigatorLinkModel[] }) {}
}

export class AppendLink implements Action {
  readonly type = MainNavigatorActionTypes.AppendLink;

  constructor(public payload: { link: NavigatorLinkModel }) {}
}


export type MainNavigatorActions = SetLinks | AppendLink;
