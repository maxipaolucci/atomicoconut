import { HttpClient, HttpResponse } from '@angular/common/http';

import { AppService } from '../../app.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CurrencyExchangeResponse } from '../../models/currencyExchangeResponse';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CurrencyExchangeService {

  private cryptoExchangeServerUrl : string = 'https://coincap.io/page/';
  cryptoRates : any = {};

  private currencyExchangeServiceUrl : string = 'https://api.fixer.io/latest';
  currencyRates : any = null;

  constructor(private http : HttpClient, private appService : AppService) { }

  getCurrencyRates(base = 'USD') : Observable<any> {
    let methodTrace = `${this.constructor.name} > getCurrencyRates() > `; //for debugging
    
    if (this.currencyRates) {
      return Observable.of(this.currencyRates);
    }

    return this.http.get<CurrencyExchangeResponse>(`${this.currencyExchangeServiceUrl}?base=${base}`)
      .map(this.extractCurrencyExchangeData)
      .catch(this.appService.handleError(methodTrace))
      .retry(3);
  }

  private extractCurrencyExchangeData(res: CurrencyExchangeResponse) : any {
    if (Object.keys(res.rates).length > 0) {
      return res.rates;
    } else {
      throw res;
    }
  }

  getCryptoRates(crypto : string = 'BTC') : Observable<any> {
    let methodTrace = `${this.constructor.name} > getCryptoRates() > `; //for debugging

    if (this.cryptoRates[crypto.toUpperCase()]) {
      return Observable.of(this.cryptoRates[crypto.toUpperCase()]);
    }
    
    return this.http.get(`${this.cryptoExchangeServerUrl}${crypto.toUpperCase()}`)
        .map((res: Object) => {
          this.cryptoRates[crypto.toUpperCase()] = this.extractCryptoExchangeData(crypto, res);
          return this.cryptoRates[crypto.toUpperCase()];
        })
        .catch(this.appService.handleError(methodTrace));
  }

  private extractCryptoExchangeData(crypto: string, res: Object) : any {
    if (res['id'] === crypto.toUpperCase()) {
      return res;
    } else {
      throw res;
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
