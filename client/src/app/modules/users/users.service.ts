import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import {Observable} from "rxjs/Rx";
import {environment} from "../../../environments/environment";
import {AppService} from "../../app.service";

@Injectable()
export class UsersService {

  private serverHost : string = environment.apiHost + '/api/users';
  private headers = new Headers({'Content-Type': 'application/json'});
  private user : any = null;

  constructor(private http : Http, private appService : AppService) {}

  /**
   * Server call to Register a new user in the system 
   * @param postData 
   */
  register(postData : any = {}) : Observable<any> {
    return this.http.post(`${this.serverHost}/register`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }

  /**
   * Server call to retrieve the currently authenticated user, or null if nobody .
   */
  getAuthenticatedUser() : Observable<any> {
    return this.http.get(`${this.serverHost}/getUser`)
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }

  /**
   * Server call to login the provided user email and pass.
   */
  login(postData : any = {}) : Observable<any> {
    return this.http.post(`${this.serverHost}/login`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }

  /**
   * Server call to forgot with the provided user email.
   */
  forgot(postData : any = {}) : Observable<any> {
    return this.http.post(`${this.serverHost}/account/forgot`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }

  /**
   * Server call to reset password api with the provided new password.
   */
  reset(token : string, postData : any = {}) : Observable<any> {
    return this.http.post(`${this.serverHost}/account/reset/${token}`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }

  /**
   * Server call to login the provided user email and pass.
   */
  logout() : Observable<any> {
    return this.http.get(`${this.serverHost}/logout`)
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }
  
  /**
   * Tells whether the user is logged in in the system. Checks the local user variable
   */
  isLoggedIn() : boolean {
    return this.user && this.user.email ? true : false;
  }

  /**
   * Sets the local user variable with the user provided as param
   * @param user (any). The user to set
   */
  setUser(user : any = null) {
    this.user = user;
  }

  getUser() : any {
    return this.user;
  }
}
