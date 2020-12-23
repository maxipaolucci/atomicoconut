import { Action } from '@ngrx/store';
import { LoadingData } from './models/loadingData';

export enum AppActionTypes {
  ShowProgressBar = '[App] Show progress bar',
  HideProgressBar = '[App] Hide progress bar',
  FinalizeOperation = '[App] Finalize last operation',
  SetRedirectUrl = '[App] Set router redirect url to Store',
  StartOnlineOfflineCheck = "[App] StartOnlineOfflineCheck",
  SetIsOnline = "[App] SetIsOnline"
}

export class SetRedirectUrl implements Action {
  readonly type = AppActionTypes.SetRedirectUrl;

  constructor(public payload: { url: String }) {}
}

export class ShowProgressBar implements Action {
    readonly type = AppActionTypes.ShowProgressBar;
  
    constructor(public payload: LoadingData = { color: 'primary' }) {}
}

export class HideProgressBar implements Action {
    readonly type = AppActionTypes.HideProgressBar;
}

export class FinalizeOperation implements Action {
  readonly type = AppActionTypes.FinalizeOperation;

  constructor(public payload: { redirectData: any[] } = null) {}
}

export class StartOnlineOfflineCheck implements Action {
  readonly type = AppActionTypes.StartOnlineOfflineCheck;
}

export class SetIsOnline implements Action {
  readonly type = AppActionTypes.SetIsOnline;

  constructor(public payload: boolean) {}
}


export type AppActions = FinalizeOperation |  
  ShowProgressBar | HideProgressBar |
  SetRedirectUrl | StartOnlineOfflineCheck | 
  SetIsOnline;
