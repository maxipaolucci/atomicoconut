import { Action } from '@ngrx/store';
import { Team } from './models/team';

export enum TeamActionTypes {
  CancelRequest = '[Team] Cancel request from Server',
  AddAll = '[Team] Add all to Store',
  RequestAll = '[Team] Request all from Server',
  Delete = '[Team] Delete from Store',
  RequestDelete = '[Team] Request delete from Server',
  RequestOne = '[Team] Request one from Server',
  AddOne = '[Team] Add one to Store'
}

export class CancelRequest implements Action {
  readonly type = TeamActionTypes.CancelRequest;
}

export class AddAll implements Action {
  readonly type = TeamActionTypes.AddAll;

  constructor(public payload: { teams: Team[], serverError?: boolean }) {}
}

export class RequestAll implements Action {
  readonly type = TeamActionTypes.RequestAll;

  constructor(public payload: { userEmail: string, forceServerRequest: boolean }) {}
}

export class RequestDelete implements Action {
  readonly type = TeamActionTypes.RequestDelete;

  constructor(public payload: { userEmail: string, slug: string }) {}
}

export class Delete implements Action {
  readonly type = TeamActionTypes.Delete;

  constructor(public payload: { slug: string }) {}
}

export class RequestOne implements Action {
  readonly type = TeamActionTypes.RequestOne;

  constructor(public payload: { userEmail: string, slug: string }) {}
}

export class AddOne implements Action {
  readonly type = TeamActionTypes.AddOne;

  constructor(public payload: { team: Team }) {}
}

export type TeamActions = CancelRequest | 
    AddAll | RequestAll | 
    Delete | RequestDelete | 
    RequestOne | AddOne;
