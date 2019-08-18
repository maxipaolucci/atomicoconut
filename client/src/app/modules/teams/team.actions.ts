import { Action } from '@ngrx/store';
import { Team } from './models/team';

export enum TeamActionTypes {
  LoadTeams = '[Team] Load Teams',
  RequestTeams = '[Team] Request Teams'
}

export class LoadTeams implements Action {
  readonly type = TeamActionTypes.LoadTeams;

  constructor(public payload: { teams: Team[] }) {}
}

export class RequestTeams implements Action {
  readonly type = TeamActionTypes.RequestTeams;

  constructor(public payload: { userEmail: string }) {}
}

export type TeamActions = LoadTeams | RequestTeams
