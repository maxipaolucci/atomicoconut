import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from "rxjs/Rx";

@Injectable()
export class CryptoCurrencyService {

  private serverUrl : string = 'https://api.cryptonator.com/api/ticker/';
  rates : any = {};
  

  constructor(private http : Http) {}

  getPrices(currency : string = 'btc') : Observable<any> {
    if (this.rates[currency.toUpperCase()]) {
      return Observable.of(this.rates[currency.toUpperCase()]);
    }
    
    return this.http.get(`${this.serverUrl}${currency}-usd`)
        .map((res: Response) => {
          this.rates[currency.toUpperCase()] = this.extractData(res);
          return this.rates[currency.toUpperCase()];
        }).catch(this.handleError);
  }

  private extractData(res: Response) : any {
    let body = res.json();
    if (body.success === true) {
      return body.ticker;
    } else {
      throw body;
    }
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
    
    return Observable.throw(errMsg);
  }

}
