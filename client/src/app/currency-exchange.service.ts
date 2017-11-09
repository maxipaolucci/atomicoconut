import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from "rxjs/Rx";

import { AppService } from './app.service';

@Injectable()
export class CurrencyExchangeService {

  private serviceUrl : string = 'https://api.fixer.io/latest';

  constructor(private http : Http, private appService : AppService) { }

  getRates(base = 'USD') : Observable<any> {
    
    return this.http.get(`${this.serviceUrl}?base=${base}`)
        .map(this.extractData)
        .catch(this.appService.handleError);
  }

  private extractData(res: Response) : any {
    let body = res.json();
    if (Object.keys(body.rates).length > 0) {
      return body.rates;
    } else {
      throw body;
    }
  }
}
