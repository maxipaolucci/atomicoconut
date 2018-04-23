import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { AppService } from '../../app.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '../../models/Response';
import { of } from 'rxjs/observable/of';
import { environment } from '../../../environments/environment';
import { UtilService } from '../../util.service';

@Injectable()
export class CurrencyExchangeService {

  private cryptoExchangeServerUrl : string = 'https://coincap.io/page/';
  cryptoRates : any = {};

  private currencyExchangeServiceUrl : string = 'https://api.fixer.io/latest';
  currencyRates : any = {};

  private serverHost : string = environment.apiHost + '/api/currencyRates';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http : HttpClient, private appService : AppService, private utilService : UtilService) { }

  getCurrencyRates(dates : string[] = [], base : string = 'USD') : Observable<any> {
    let methodTrace = `${this.constructor.name} > getCurrencyRates() > `; //for debugging
    
    dates.push(this.utilService.formatToday('YYYY-MM-DD')); //adds today to the array
    
    //check if all the required dates are already cached in this service
    let found = true;
    for (let date of dates) {
      if (!this.currencyRates[date]) {
        console.log('date not found: ', date);
        found = false;
        break;
      }
    }

    if (found) {
      //all dates cached then return this object
      return Observable.of(this.currencyRates);
    }
    

    //if here then we need to retrieve some dates from the server
    let params = new HttpParams().set('dates', `${dates}`);

    return this.http.get<Response>(`${this.serverHost}/getByDates/${base}`, { params })
      .map((res: Response) => {
        let data = this.appService.extractData(res);

        if (data) {
          //merge results
          Object.assign(this.currencyRates, data);
        }

        return this.currencyRates;
      })
      .catch(this.appService.handleError)
      .retry(3);
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
        .catch(this.appService.handleError);
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
      const today = this.utilService.formatToday();
  
      if (this.currencyRates[today]) {
        return amount / this.currencyRates[today][`USD${unit}`];
      } else {
        this.appService.showResults('Currency rates data was not loaded yet. Figures are shown as USD', 'error');
      }
    } 

    return amount;
  }
}
