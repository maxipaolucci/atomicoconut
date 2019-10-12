import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Property } from './models/property';

export enum PropertyActionTypes {
  AddAll = '[Property] Add all to Store',
  RequestAll = '[Property] Request all from Server',
  Delete = '[Property] Delete from Store',
  RequestDelete = '[Property] Request delete from Server',
}

export class AddAll implements Action {
  readonly type = PropertyActionTypes.AddAll;

  constructor(public payload: { properties: Property[], serverError?: boolean }) {}
}

export class RequestAll implements Action {
  readonly type = PropertyActionTypes.RequestAll;

  constructor(public payload: { userEmail: string, forceServerRequest: boolean, silently?: boolean }) {}
}

export class RequestDelete implements Action {
  readonly type = PropertyActionTypes.RequestDelete;

  constructor(public payload: { userEmail: string, id: string }) {}
}

export class Delete implements Action {
  readonly type = PropertyActionTypes.Delete;

  constructor(public payload: { id: string }) {}
}

export type PropertyActions = AddAll
    | RequestAll | RequestDelete
    | Delete;
