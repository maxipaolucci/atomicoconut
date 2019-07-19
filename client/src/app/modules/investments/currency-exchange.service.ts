import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError, retry, switchMap } from 'rxjs/operators';
import { AppService } from '../../app.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Response } from '../../models/response';
import { environment } from '../../../environments/environment';
import { UtilService } from '../../util.service';
import { COINCAP_CRYPTO_TYPES } from '../../constants';

@Injectable()
export class CurrencyExchangeService {

  private cryptoExchangeServerUrl = 'https://api.coincap.io/v2/assets/';
  cryptoRates: any = {};
  currencyRates: any = {};
  private serverHost: string = environment.apiHost + '/api/currencyRates';

  constructor(private http: HttpClient, private appService: AppService, private utilService: UtilService) { }

  getCurrencyRates$(dates: string[] = [], base: string = 'USD'): Observable<any> {
    const methodTrace = `${this.constructor.name} > getCurrencyRates$() > `; // for debugging

    dates.push(this.utilService.formatToday('YYYY-MM-DD')); // adds today to the array
    
    // check if all the required dates are already cached in this service
    let found = true;
    for (const date of dates) {
      if (!this.currencyRates[date]) {
        found = false;
        break;
      }
    }

    if (found) {
      // all dates cached then return this object
      return of(this.currencyRates);
    }

    // if here then we need to retrieve some dates from the server
    const params = new HttpParams().set('dates', `${dates}`);

    return this.http.get<Response>(`${this.serverHost}/getByDates/${base}`, { params }).pipe(
      map((res: Response) => {
        const data = this.appService.extractData(res);

        if (data) {
          // merge results
          Object.assign(this.currencyRates, data);
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
        }

        return this.currencyRates;
      }),
      catchError(this.appService.handleError),
      retry(3)
    );
  }


  getCryptoRates$(crypto: string = 'BTC'): Observable<any> {
    const methodTrace = `${this.constructor.name} > getCryptoRates$() > `; // for debugging

    if (this.cryptoRates[crypto.toUpperCase()]) {
      return of(this.cryptoRates[crypto.toUpperCase()]);
    }
    
    return this.http.get<Response>(`${this.cryptoExchangeServerUrl}${COINCAP_CRYPTO_TYPES[crypto.toUpperCase()]}`).pipe(
      map((res: Response) => this.extractCryptoExchangeData(crypto, res)),
      switchMap((rates: Object) => {
        if (rates) {
          this.cryptoRates[crypto.toUpperCase()] = rates;
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
        }
        
        return of(this.cryptoRates[crypto.toUpperCase()]);
      }),
      catchError(this.appService.handleError) 
    );
  }

  private extractCryptoExchangeData(crypto: string, res: Object): any {
    if (res['data']['id'] === COINCAP_CRYPTO_TYPES[crypto.toUpperCase()]) {
      return res['data'];
    } else {
      throw res;
    }
  }

  /**
   * Get the value on USD at today's rate of the amount provided in a foreign unit
   * @param amount 
   * @param unit 
   */
  getUsdValueOf(amount: number, unit: string): number {
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
