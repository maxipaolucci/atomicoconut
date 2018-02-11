import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs/Observable';
import { Property } from './models/property';
import { Response } from '../../models/response';

@Injectable()
export class PropertiesService {

  private serverHost : string = environment.apiHost + '/api/properties';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http : HttpClient, private appService : AppService) {}

  /**
   * Server call to Get all the properties for the current user from the server.
   * This proeprties will be the properties the user created plus the investment properties where she/he has a piece of the cake.
   * @param {string} email . The user email
   */
  getProperties(email : string) : Observable<Property[]> {
    let methodTrace = `${this.constructor.name} > getProperties() > `; //for debugging

    if (!email) {
      this.appService.consoleLog('error', `${methodTrace} Required parameters missing.`);
      return Observable.from([]);
    }

    let params = new HttpParams().set('email', email);

    const responseData$ = this.http.get<Response>(`${this.serverHost}/getAll`, { params })
        .map(this.appService.extractData)
        .catch(this.appService.handleError(methodTrace));
    
    return responseData$.switchMap((responseData) => {
      let properties : Property[] = [];

      if (responseData && responseData instanceof Array) {
        for (let item of responseData) {
          properties.push(item); //TODO create clases of property
          // const createdBy = new User(item.createdBy.name, item.createdBy.email, item.createdBy.gravatar);
          // const team = item.team ? new Team(item.team.name, item.team.description, item.team.slug) : null;

          // if (item.investmentType === 'currency' || item.investmentType === 'crypto') {
          //   properties.push(new CurrencyInvestment(item._id, item.amount, item.amountUnit, createdBy, team, item.investmentDistribution, item.currencyInvestmentData.amountUnit, 
          //       item.currencyInvestmentData.amount, item.currencyInvestmentData.buyingPrice, item.currencyInvestmentData.buyingPriceUnit, item.currencyInvestmentData.buyingDate, item.investmentType));
          // }
        }
      } else {
        this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
      }

      return Observable.of(properties);
    });
  }
}
