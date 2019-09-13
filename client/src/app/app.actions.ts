import { Action } from '@ngrx/store';
import { LoadingData } from './models/loadingData';

export enum AppActionTypes {
  ShowProgressBar = '[App] Show progress bar',
  HideProgressBar = '[App] Hide progress bar'
}

export class ShowProgressBar implements Action {
    readonly type = AppActionTypes.ShowProgressBar;
  
    constructor(public payload: LoadingData = { color: 'primary' }) {}
}

export class HideProgressBar implements Action {
    readonly type = AppActionTypes.HideProgressBar;
}


export type AppActions = ShowProgressBar | HideProgressBar;
