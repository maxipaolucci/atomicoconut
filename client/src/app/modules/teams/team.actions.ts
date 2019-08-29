import { Action } from '@ngrx/store';
import { Team } from './models/team';

export enum TeamActionTypes {
  DoNone = '[Team] Do none',
  LoadTeams = '[Team] Load Teams',
  RequestTeams = '[Team] Request Teams',
  DeleteTeam = '[Team] Delete Team',
  RequestDeleteTeam = '[Team] Request Delete Team'
}

export class DoNone implements Action {
  readonly type = TeamActionTypes.DoNone;
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

export type TeamActions = DoNone | 
    LoadTeams | RequestTeams | 
    DeleteTeam | RequestDeleteTeam;
