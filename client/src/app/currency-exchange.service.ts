import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from "rxjs/Rx";

@Injectable()
export class CurrencyExchangeService {

  private serviceUrl : string = 'https://api.fixer.io/latest';
  rates : any = null;

  constructor(private http : Http) { }

  getRates(base = 'USD') : Observable<any> {
    this.rates = null;

    return this.http.get(`${this.serviceUrl}?base=${base}`)
        .map(this.extractData)
        .catch(this.handleError);
  }

  private extractData(res: Response) : any {
    let body = res.json();
    if (Object.keys(body.rates).length > 0) {
      return body.rates;
    } else {
      throw body;
    }
  }

  private handleError (error: Response | any) {
    
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    
    return Observable.throw(errMsg);
  }
}
