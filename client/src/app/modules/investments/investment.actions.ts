import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Investment } from './models/investment';

export enum InvestmentActionTypes {
  ResetAllEntitiesLoaded = '[Investment] Reset allEntitiesLoaded in Store',
  AddAll = '[Investment] Add all to Store',
  RequestAll = '[Investment] Request all from Server',
  Delete = '[Investment] Delete from Store',
  RequestDelete = '[Investment] Request delete from Server',
  RequestOne = '[Investment] Request one from Server',
  AddOne = '[Investment] Add one to Store',
  RequestUpdate = '[Investment] Request update on Server',
  Update_ = '[Investment] Update in Store',
  RequestCreate = '[Investment] Request create on Server'
}

export class ResetAllEntitiesLoaded implements Action {
  readonly type = InvestmentActionTypes.ResetAllEntitiesLoaded;
}

export class AddAll implements Action {
  readonly type = InvestmentActionTypes.AddAll;

  constructor(public payload: { investments: Investment[], serverError?: boolean }) {}
}

export class RequestAll implements Action {
  readonly type = InvestmentActionTypes.RequestAll;
}

export class RequestDelete implements Action {
  readonly type = InvestmentActionTypes.RequestDelete;

  constructor(public payload: { id: string }) {}
}

export class Delete implements Action {
  readonly type = InvestmentActionTypes.Delete;

  constructor(public payload: { id: string }) {}
}

export class RequestOne implements Action {
  readonly type = InvestmentActionTypes.RequestOne;

  constructor(public payload: { id: string }) {}
}

export class AddOne implements Action {
  readonly type = InvestmentActionTypes.AddOne;

  constructor(public payload: { investment: Investment }) {}
}

export class Update_ implements Action {
  readonly type = InvestmentActionTypes.Update_;

  constructor(public payload: { entityChanges: Update<Investment> }) {}
}

export class RequestUpdate implements Action {
  readonly type = InvestmentActionTypes.RequestUpdate;

  constructor(public payload: { model: any }) {}
}

export class RequestCreate implements Action {
  readonly type = InvestmentActionTypes.RequestCreate;

  constructor(public payload: { model: any }) {}
}

export type InvestmentActions = AddAll
  | RequestAll | ResetAllEntitiesLoaded
  | RequestDelete | Delete
  | AddOne | RequestUpdate
  | Update_| RequestCreate
  | RequestOne;