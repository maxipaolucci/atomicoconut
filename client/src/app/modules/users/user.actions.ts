import { Action } from '@ngrx/store';
import { User } from './models/user';
import { LoginModel } from './models/login-model';

export enum UserActionTypes {
  CancelRequest = '[User] Cancel request from Server',
  Login = '[User] Login user',
  RequestLogin = '[User] Request login'
}

export class CancelRequest implements Action {
  readonly type = UserActionTypes.CancelRequest;
}

export class Login implements Action {
  readonly type = UserActionTypes.Login;

  constructor(public payload: { user: User }) {}
}

export class RequestLogin implements Action {
  readonly type = UserActionTypes.RequestLogin;

  constructor(public payload: LoginModel) {}
}


export type UserActions = CancelRequest |  
    Login | RequestLogin;
