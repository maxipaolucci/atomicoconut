import { Action } from '@ngrx/store';
import { CryptoRate } from './models/crypto-rate';

export enum CryptoRateActionTypes {
  RequestOne = '[Crypto Rate] Request one from Server',
  AddOne = '[Crypto Rate] Add one to Store'
}

export class RequestOne implements Action {
  readonly type = CryptoRateActionTypes.RequestOne;

  constructor(public payload: { crypto: string }) {}
}

export class AddOne implements Action {
  readonly type = CryptoRateActionTypes.AddOne;

  constructor(public payload: { cryptoRate: CryptoRate }) {}
}

export type CryptoRateActions = RequestOne
  | AddOne;
