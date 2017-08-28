import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import {Observable} from "rxjs/Rx";

@Injectable()
export class UsersService {

  private serverHost : string = 'http://localhost:7777/api';
  private serverUrl : string = 'http://localhost:7777/api/users/test';
  private headers = new Headers({'Content-Type': 'application/json'});
  private user : any = null;

  constructor(private http : Http) {}

  register(postData : any = {}) : Observable<any> {
    return this.http.post(`${this.serverHost}/users/register`, postData, { headers : this.headers })
        .map(this.extractData)
        .catch(this.handleError);
  }

  getAuthenticatedUser() : Observable<any> {
    return this.http.get(`${this.serverHost}/users/getUser`)
        .map(this.extractData)
        .catch(this.handleError);
  }
  
  isAuthenticated() : boolean {
    return this.user && this.user.email ? true : false;
  }

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
