import { Action } from '@ngrx/store';
import { User } from './models/user';
import { LoginModel } from './models/login-model';

export enum UserActionTypes {
  CancelRequest = '[User] Cancel request from Server',
  Login = '[User] Login user',
  RequestLogin = '[User] Request login',
  RequestLogout = '[User] Request logout',
  Logout = '[User] Logout user',
  RequestForgot = '[User] Request Forgot password to Server',
  Forgot = '[User] Set Forgot password state in Store'
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

export class RequestForgot implements Action {
  readonly type = UserActionTypes.RequestForgot;

  constructor(public payload: { email: string }) {}
}

export class Forgot implements Action {
  readonly type = UserActionTypes.Forgot;
}

export class Logout implements Action {
  readonly type = UserActionTypes.Logout;
}

export class RequestLogout implements Action {
  readonly type = UserActionTypes.RequestLogout;
}


export type UserActions = CancelRequest   
    | Login | RequestLogin
    | Logout | RequestLogout
    | Forgot | RequestForgot;
