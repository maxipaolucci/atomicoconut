import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Investment } from './models/investment';

export enum InvestmentActionTypes {
  ResetAllEntitiesLoaded = '[Property] Reset allEntitiesLoaded in Store',
  AddAll = '[Investment] Add all to Store',
  RequestAll = '[Investment] Request all from Server',
  Delete = '[Investment] Delete from Store',
  RequestDelete = '[Investment] Request delete from Server',
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

  constructor(public payload: { userEmail: string }) {}
}

export class RequestDelete implements Action {
  readonly type = InvestmentActionTypes.RequestDelete;

  constructor(public payload: { userEmail: string, id: string }) {}
}

export class Delete implements Action {
  readonly type = InvestmentActionTypes.Delete;

  constructor(public payload: { id: string }) {}
}

export type InvestmentActions = AddAll
 | RequestAll | ResetAllEntitiesLoaded
 | RequestDelete | Delete;