import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Team } from './models/team';
import { TeamEditModel } from './models/team-edit-model';

export enum TeamActionTypes {
  AddAll = '[Team] Add all to Store',
  RequestAll = '[Team] Request all from Server',
  Delete = '[Team] Delete from Store',
  RequestDelete = '[Team] Request delete from Server',
  RequestOne = '[Team] Request one from Server',
  AddOne = '[Team] Add one to Store',
  RequestUpdate = '[Team] Request update on Server',
  Update_ = '[Team] Update in Store',
  UseAndResetLastUpdatedTeamSlug = '[Team] Use and reset lastUpdatedTeamSlug flag',
  RequestCreate = '[Team] Request create on Server',
  ResetAllEntitiesLoaded = '[Team] Reset allEntitiesLoaded in Store'
}

export class ResetAllEntitiesLoaded implements Action {
  readonly type = TeamActionTypes.ResetAllEntitiesLoaded;
}

export class AddAll implements Action {
  readonly type = TeamActionTypes.AddAll;

  constructor(public payload: { teams: Team[], serverError?: boolean }) {}
}

export class RequestAll implements Action {
  readonly type = TeamActionTypes.RequestAll;

  constructor(public payload: { forceServerRequest: boolean, silently?: boolean }) {}
}

export class RequestDelete implements Action {
  readonly type = TeamActionTypes.RequestDelete;

  constructor(public payload: { slug: string }) {}
}

export class Delete implements Action {
  readonly type = TeamActionTypes.Delete;

  constructor(public payload: { slug: string }) {}
}

export class RequestOne implements Action {
  readonly type = TeamActionTypes.RequestOne;

  constructor(public payload: { slug: string }) {}
}

export class AddOne implements Action {
  readonly type = TeamActionTypes.AddOne;

  constructor(public payload: { team: Team }) {}
}

export class Update_ implements Action {
  readonly type = TeamActionTypes.Update_;

  constructor(public payload: { teamChanges: Update<Team> }) {}
}

export class RequestUpdate implements Action {
  readonly type = TeamActionTypes.RequestUpdate;

  constructor(public payload: { originalSlug: string, model: TeamEditModel }) {}
}

export class RequestCreate implements Action {
  readonly type = TeamActionTypes.RequestCreate;

  constructor(public payload: { model: TeamEditModel }) {}
}

export class UseAndResetLastUpdatedTeamSlug implements Action {
  readonly type = TeamActionTypes.UseAndResetLastUpdatedTeamSlug;

  constructor(public payload: { lastUpdatedTeamSlug: string }) {}
}

export type TeamActions = UseAndResetLastUpdatedTeamSlug |  
    AddAll | RequestAll | 
    Delete | RequestDelete | 
    RequestOne | AddOne | 
    RequestUpdate | Update_ | 
    RequestCreate | ResetAllEntitiesLoaded;
