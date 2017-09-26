import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from "rxjs/Rx";

@Injectable()
export class AppService {

  constructor(private http : Http) {}

  /**
   * Extract data from a server response
   * @param res 
   */
  public extractData(res: Response) : any {
    let body = res.json();

    if (body.codeno === 200 && body.status === 'success') {
      return body.data;
    } else {
      throw body;
    }
  }

  /**
   * Handle server service errors and parse the result in an object
   * @param error 
   */
  public handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errObj: any = {};
    if (error instanceof Response) {
      errObj = error.json() || {};
    } else {
      errObj = error || {};
    }
    
    return Observable.throw(errObj);
  }

}
