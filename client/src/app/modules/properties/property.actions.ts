import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Property } from './models/property';

export enum PropertyActionTypes {
  AddAll = '[Property] Add all to Store',
  RequestAll = '[Property] Request all from Server'
}

export class AddAll implements Action {
  readonly type = PropertyActionTypes.AddAll;

  constructor(public payload: { properties: Property[], serverError?: boolean }) {}
}

export class RequestAll implements Action {
  readonly type = PropertyActionTypes.RequestAll;

  constructor(public payload: { userEmail: string, forceServerRequest: boolean, silently?: boolean }) {}
}

export type PropertyActions = AddAll
    | RequestAll;
