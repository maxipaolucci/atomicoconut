import { Action } from '@ngrx/store';
import { LoadingData } from './models/loadingData';

export enum AppActionTypes {
  ShowProgressBar = '[App] Show progress bar',
  HideProgressBar = '[App] Hide progress bar',
  FinalizeOperation = '[App] Finalize last operation'
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


export type AppActions = FinalizeOperation |  
  ShowProgressBar | HideProgressBar;
