import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from "rxjs/Rx";

@Injectable()
export class CurrencyExchangeService {

  // private cryptoExchangeServerUrl : string = 'https://api.cryptonator.com/api/ticker/';
  // cryptoRates : any = {};

  private cryptoExchangeServerUrl : string = 'http://coincap.io/page/';
  cryptoRates : any = {};

  private currencyExchangeServiceUrl : string = 'https://api.fixer.io/latest';
  currencyRates : any = null;

  constructor(private http : Http) { }

  getCurrencyRates(base = 'USD') : Observable<any> {
    if (this.currencyRates) {
      return Observable.of(this.currencyRates);
    }

    return this.http.get(`${this.currencyExchangeServiceUrl}?base=${base}`)
        .map(this.extractCurrencyExchangeData)
        .catch(this.handleError);
  }

  private extractCurrencyExchangeData(res: Response) : any {
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

  // getCryptoRates(crypto : string = 'btc') : Observable<any> {
  //   if (this.cryptoRates[crypto.toUpperCase()]) {
  //     return Observable.of(this.cryptoRates[crypto.toUpperCase()]);
  //   }
    
  //   return this.http.get(`${this.cryptoExchangeServerUrl}${crypto}-usd`)
  //       .map((res: Response) => {
  //         this.cryptoRates[crypto.toUpperCase()] = this.extractCryptoExchangeData(res);
  //         return this.cryptoRates[crypto.toUpperCase()];
  //       }).catch(this.handleError);
  // }

  // private extractCryptoExchangeData(res: Response) : any {
  //   let body = res.json();
  //   if (body.success === true) {
  //     return body.ticker;
  //   } else {
  //     throw body;
  //   }
  // }

  getCryptoRates(crypto : string = 'BTC') : Observable<any> {
    if (this.cryptoRates[crypto.toUpperCase()]) {
      return Observable.of(this.cryptoRates[crypto.toUpperCase()]);
    }
    
    return this.http.get(`${this.cryptoExchangeServerUrl}${crypto.toUpperCase()}`)
        .map((res: Response) => {
          this.cryptoRates[crypto.toUpperCase()] = this.extractCryptoExchangeData(crypto, res);
          return this.cryptoRates[crypto.toUpperCase()];
        }).catch(this.handleError);
  }

  private extractCryptoExchangeData(crypto: string, res: Response) : any {
    let body = res.json();
    if (body.id === crypto.toUpperCase()) {
      return body;
    } else {
      throw body;
    }
  }

  

}
