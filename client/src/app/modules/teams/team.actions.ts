import { Action } from '@ngrx/store';
import { Team } from './models/team';

export enum TeamActionTypes {
  CancelRequest = '[Team] Cancel Request',
  LoadTeams = '[Team] Load Teams',
  RequestTeams = '[Team] Request Teams',
  DeleteTeam = '[Team] Delete Team',
  RequestDeleteTeam = '[Team] Request Delete Team'
}

export class CancelRequest implements Action {
  readonly type = TeamActionTypes.CancelRequest;
}

export class LoadTeams implements Action {
  readonly type = TeamActionTypes.LoadTeams;

  constructor(public payload: { teams: Team[] }) {}
}

export class RequestTeams implements Action {
  readonly type = TeamActionTypes.RequestTeams;

  constructor(public payload: { userEmail: string, forceServerRequest: boolean }) {}
}

export class RequestDeleteTeam implements Action {
  readonly type = TeamActionTypes.RequestDeleteTeam;

  constructor(public payload: { userEmail: string, slug: string }) {}
}

export class DeleteTeam implements Action {
  readonly type = TeamActionTypes.DeleteTeam;

  constructor(public payload: { slug: string }) {}
}

export type TeamActions = CancelRequest | 
    LoadTeams | RequestTeams | 
    DeleteTeam | RequestDeleteTeam;
