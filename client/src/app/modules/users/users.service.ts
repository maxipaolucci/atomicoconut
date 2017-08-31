import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import {Observable} from "rxjs/Rx";
import {environment} from "../../../environments/environment";

@Injectable()
export class UsersService {

  private serverHost : string = environment.serverHost + '/api/users';
  private headers = new Headers({'Content-Type': 'application/json'});
  private user : any = null;

  constructor(private http : Http) {}

  /**
   * Server call to Register a new user in the system 
   * @param postData 
   */
  register(postData : any = {}) : Observable<any> {
    return this.http.post(`${this.serverHost}/register`, postData, { headers : this.headers })
        .map(this.extractData)
        .catch(this.handleError);
  }

  /**
   * Server call to retrieve the currently authenticated user, or null if nobody .
   */
  getAuthenticatedUser() : Observable<any> {
    console.log(this.serverHost);
    return this.http.get(`${this.serverHost}/getUser`)
        .map(this.extractData)
        .catch(this.handleError);
  }

  /**
   * Server call to login the provided user email and pass.
   */
  login(postData : any = {}) : Observable<any> {
    return this.http.post(`${this.serverHost}/login`, postData, { headers : this.headers })
        .map(this.extractData)
        .catch(this.handleError);
  }

  /**
   * Server call to login the provided user email and pass.
   */
  logout() : Observable<any> {
    return this.http.get(`${this.serverHost}/logout`)
        .map(this.extractData)
        .catch(this.handleError);
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
  setUser(user : any) {
    this.user = user;
  }

  private extractData(res: Response) : any {
    let body = res.json();

    if (body.codeno === 200 && body.status === 'success') {
      return body.data;
    } else {
      throw body;
    }
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      errMsg = body.message || JSON.stringify(body);
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
