import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppService } from '../../app.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../../models/response';
import { environment } from '../../../environments/environment';
import { UtilService } from '../../util.service';
import { COINCAP_CRYPTO_TYPES, ConsoleNotificationTypes, SnackbarNotificationTypes } from '../../constants';
import { CryptoRate } from './models/crypto-rate';
import { CurrencyRate } from './models/currency-rate';
import _ from 'lodash';


@Injectable()
export class CurrencyExchangeService {

  cryptoRates: any = {};
  currencyRates: any = {};
  private currencyRatesHost: string = environment.apiHost + '/api/currencyRates';
  private cryptoRatesHost: string = environment.apiHost + '/api/cryptoRates';

  constructor(
    private http: HttpClient, 
    private appService: AppService, 
    private utilService: UtilService
  ) { }

  getCurrencyRates$(dates: string[] = [], base: string = 'USD'): Observable<CurrencyRate[]> {
    const methodTrace = `${this.constructor.name} > getCurrencyRates$() > `; // for debugging
    
    const params = new HttpParams().set('dates', `${dates}`);

    return this.http.get<Response>(`${this.currencyRatesHost}/getByDates/${base}`, { params }).pipe(
      map(this.appService.extractData),
      map((rates: any): CurrencyRate[] => {
        let result: CurrencyRate[] = [];
        if (rates) {
          for (let [key, value] of Object.entries(rates)) {
            let currencyRate: CurrencyRate = {
              id: key,
              USDAUD: value['USDAUD'],
              USDUSD: value['USDUSD'],
              USDNZD: value['USDNZD'],
              USDEUR: value['USDEUR']
            };

            result.push(currencyRate);
          }
        } else {
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
        }

        return result;
      })
    );
  }

  getCryptoRates$(cryptos: string[] = []): Observable<CryptoRate[]> {
    const methodTrace = `${this.constructor.name} > getCryptoRates$() > `; // for debugging
    
    const params = new HttpParams().set('cryptos', `${cryptos}`);

    return this.http.get<Response>(`${this.cryptoRatesHost}/getTodayRates`, { params }).pipe(
      map(this.appService.extractData),
      map((rates: any): CryptoRate[] => {
        let result: CryptoRate[] = [];
        if (rates) {
          for (let [key, value] of Object.entries(rates)) {
            let cryptoRate: CryptoRate = {
              id: key,
              priceUsd: Number(value['priceUsd']),
              symbol: value['symbol'],
              name: value['name']
            };

            result.push(cryptoRate);
          }
        } else {
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
        }
        
        return result;
      }) 
    );
  }

  /**
   * Get the value on USD at today's rate of the amount provided in a foreign unit
   * @param {number} amount . The amount to convert
   * @param {string} unit . The destination unit
   * @param {{string: CurrencyRate}} currencyRates . The currencyRates
   * 
   * @return {number} . The converted value
   */
  getUsdValueOf(amount: number, unit: string, currencyRates: { string: CurrencyRate }): number {
    if (unit !== 'USD') {
      const today = this.utilService.formatToday();
  
      if (currencyRates[today]) {
        return amount / currencyRates[today][`USD${unit}`];
      } else {
        this.appService.showResults('Currency rates data was not loaded yet. Figures are shown as USD', SnackbarNotificationTypes.ERROR);
      }
    } 

    return amount;
  }
}
