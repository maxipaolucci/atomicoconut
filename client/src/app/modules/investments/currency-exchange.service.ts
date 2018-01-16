import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import {Observable} from "rxjs/Rx";
import { AppService } from '../../app.service';
import { tap } from 'rxjs/operators/tap';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class CurrencyExchangeService {

  private cryptoExchangeServerUrl : string = 'https://coincap.io/page/';
  cryptoRates : any = {};

  private currencyExchangeServiceUrl : string = 'https://api.fixer.io/latest';
  currencyRates : any = null;

  constructor(private http : HttpClient, private appService : AppService) { }

  getCurrencyRates(base = 'USD') : Observable<any> {
    if (this.currencyRates) {
      return Observable.of(this.currencyRates);
    }

    return this.http.get(`${this.currencyExchangeServiceUrl}?base=${base}`).pipe(
      tap(currencyExchangeData => this.extractCurrencyExchangeData(currencyExchangeData)),
      catchError(this.handleError)
    );
  }

  private extractCurrencyExchangeData(res: any) : any {
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

  getUsdValueOf(amount : number, unit : string) {
    if (unit !== 'USD') {
      if (this.currencyRates) {
        return amount / this.currencyRates[unit];
      } else {
        this.appService.showResults('Currency rates data was not loaded yet. Figures are shown as USD', 'error');
      }
    } 

    return amount;
  }
}
