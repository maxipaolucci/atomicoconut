import { Action } from '@ngrx/store';
import { CryptoRate } from './models/crypto-rate';

export enum CryptoRateActionTypes {
  RequestMany = '[Crypto Rate] Request many from Server',
  AddMany = '[Crypto Rate] Add many to Store'
}

export class RequestMany implements Action {
  readonly type = CryptoRateActionTypes.RequestMany;

  constructor(public payload: { cryptos: string[] }) {}
}

export class AddMany implements Action {
  readonly type = CryptoRateActionTypes.AddMany;

  constructor(public payload: { cryptoRates: CryptoRate[] }) {}
}

export type CryptoRateActions = RequestMany
  | AddMany;
