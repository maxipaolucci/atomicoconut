import { Action } from '@ngrx/store';
import { User } from './models/user';
import { LoginModel } from './models/login-model';
import { ResetPasswordModel } from './models/reset-password-model';
import { UserAdditionalInfo } from './models/user-additional-info';

export enum UserActionTypes {
  CancelRequest = '[User] Cancel request from Server',
  Login = '[User] Login user',
  RequestLogin = '[User] Request login',
  RequestLogout = '[User] Request logout',
  Logout = '[User] Logout user',
  RequestForgot = '[User] Request Forgot password to Server',
  Forgot = '[User] Set Forgot password state in Store',
  RequestReset = '[User] Request reset password in Server',
  RequestAuthenticatedUser = '[User] Request authenticated user from Server',
  AuthenticatedUser = '[User] Set authenticated user in Store'
}

export class CancelRequest implements Action {
  readonly type = UserActionTypes.CancelRequest;

  constructor(public payload: { redirectData: any[] } = null) {}
}

export class Login implements Action {
  readonly type = UserActionTypes.Login;

  constructor(public payload: { user: User }) {}
}

export class RequestLogin implements Action {
  readonly type = UserActionTypes.RequestLogin;

  constructor(public payload: LoginModel) {}
}

export class RequestReset implements Action {
  readonly type = UserActionTypes.RequestReset;

  constructor(public payload: { token: string, model: ResetPasswordModel }) {}
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

export class RequestAuthenticatedUser implements Action {
  readonly type = UserActionTypes.RequestAuthenticatedUser;

  constructor(public payload: UserAdditionalInfo) {}
}

export class AuthenticatedUser implements Action {
  readonly type = UserActionTypes.AuthenticatedUser;

  constructor(public payload: { user: User }) {}
}


export type UserActions = CancelRequest   
    | Login | RequestLogin
    | Logout | RequestLogout
    | Forgot | RequestForgot
    | RequestReset | RequestAuthenticatedUser
    | AuthenticatedUser;
