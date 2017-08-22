import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import {Observable} from "rxjs/Rx";

@Injectable()
export class UsersService {

  private serverHost : string = 'http://localhost:7777/api';
  private serverUrl : string = 'http://localhost:7777/api/users/test';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http : Http) {

  }

  getTest() : Observable<any> {
    
    return this.http.get(`${this.serverUrl}`)
        .map(this.extractData)
        .catch(this.handleError);
  }

  register(postData : any = {}) : Observable<any> {
    return this.http.post(`${this.serverHost}/users/register`, postData, { headers : this.headers })
        .map(this.extractData)
        .catch(this.handleError);
  }

  private extractData(res: Response) : any {
    let body = res.json();
    return body;
    // if (body.success === true) {
    //   return body.ticker;
    // } else {
    //   throw body;
    // }
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
