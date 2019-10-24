import { Action } from '@ngrx/store';
import { CurrencyRate } from './models/currency-rate';

export enum CurrencyRateActionTypes {
  RequestMany = '[Currency Rate] Request many from Server',
  AddMany = '[Currency Rate] Add many to Store'
}

export class RequestMany implements Action {
  readonly type = CurrencyRateActionTypes.RequestMany;

  constructor(public payload: { dates: string[], base: string }) {}
}

export class AddMany implements Action {
  readonly type = CurrencyRateActionTypes.AddMany;

  constructor(public payload: { currencyRates: CurrencyRate[] }) {}
}

export type CurrencyRateActions = AddMany
  | RequestMany;
