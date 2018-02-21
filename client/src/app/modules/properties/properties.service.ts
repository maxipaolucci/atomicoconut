import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs/Observable';
import { Property } from './models/property';
import { Response } from '../../models/response';
import { User } from '../users/models/user';
import { propertyTypes } from '../../constants';
import { House } from './models/house';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PropertiesService {

  private serverHost : string = environment.apiHost + '/api/properties';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http : HttpClient, private appService : AppService) {}

  /**
   * Server call to Create a new property in the system 
   * @param postData 
   */
  create(postData : any = {}) : Observable<any> {
    let methodTrace = `${this.constructor.name} > create() > `; //for debugging

    return this.http.post<Response>(`${this.serverHost}/create`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  } 
  
  /**
   * Server call to Update an investment in the system 
   * @param postData 
   */
  update(postData : any = {}) : Observable<any> {
    let methodTrace = `${this.constructor.name} > update() > `; //for debugging

    return this.http.post<Response>(`${this.serverHost}/update`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }

  /**
   * Server call to Get a property from the server based on its ID
   * @param {string} id . The property id
   */
  getPropertyById(email : string, id : string) : Observable<Property> {
    let methodTrace = `${this.constructor.name} > getPropertyById() > `; //for debugging

    if (!id || !email) {
      this.appService.consoleLog('error', `${methodTrace} Required parameters missing.`);
      return of(null);
    }

    let params = new HttpParams().set('email', email);

    const data$ = this.http.get<Response>(`${this.serverHost}/${id}`, { params })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);

    return data$.switchMap((data) => {
      let result : Property = null;
      if (data && data._id) {
        const createdBy = new User(data.createdBy.name, data.createdBy.email, data.createdBy.gravatar);
        
        if (data.propertyType === propertyTypes.HOUSE) {
          result = new House(data._id, data.propertyType, data.address, createdBy, data.propertyTypeData.landArea, data.propertyTypeData.floorArea, data.askingPrice, data.askingPriceUnit,
              data.offerPrice, data.offerPriceUnit, data.walkAwayPrice, data.walkAwayPriceUnit, data.salePrice, data.salePriceUnit, data.dateListed, 
              data.reasonForSelling, data.marketValue, data.marketValueUnit, data.propertyTypeData.registeredValue, data.propertyTypeData.registeredValueUnit, data.propertyTypeData.rates, data.propertyTypeData.ratesUnit,
              data.propertyTypeData.insurance, data.propertyTypeData.insuranceUnit, data.renovationCost, data.renovationCostUnit, data.maintenanceCost, data.maintenanceCostUnit, 
              data.description, data.otherCost, data.otherCostUnit, data.notes, data.propertyTypeData.capitalGrowth, data.propertyTypeData.bedrooms, data.propertyTypeData.bathrooms, data.propertyTypeData.parkingSpaces,
              data.propertyTypeData.fenced, data.propertyTypeData.rented, data.propertyTypeData.rentPrice, data.propertyTypeData.rentPriceUnit, data.propertyTypeData.rentPricePeriod, data.propertyTypeData.rentAppraisalDone, data.propertyTypeData.vacancy, data.propertyTypeData.bodyCorporate,
              data.propertyTypeData.bodyCorporateUnit, data.propertyTypeData.utilitiesCost, data.propertyTypeData.utilitiesCostUnit, data.propertyTypeData.agent, data.propertyTypeData.managed, data.propertyTypeData.managerRate, data.propertyTypeData.buildingType, data.propertyTypeData.titleType);
        }
      } else {
        this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
      }

      return Observable.of(result);
    });
  }

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
        .catch(this.appService.handleError);
    
    return responseData$.switchMap((responseData) => {
      let properties : Property[] = [];

      if (responseData && responseData instanceof Array) {
        for (let item of responseData) {
          const createdBy = new User(item.createdBy.name, item.createdBy.email, item.createdBy.gravatar);

          if (item.propertyType === propertyTypes.HOUSE) {
            properties.push(new House(item._id, item.propertyType, item.address, createdBy, item.landArea, item.floorArea, item.askingPrice, item.askingPriceUnit,
                item.offerPrice, item.offerPriceUnit, item.walkAwayPrice, item.walkAwayPriceUnit, item.salePrice, item.salePriceUnit, item.dateListed, 
                item.reasonForSelling, item.marketValue, item.marketValueUnit, item.registeredValue, item.registeredValueUnit, item.rates, item.ratesUnit,
                item.insurance, item.insuranceUnit, item.renovationCost, item.renovationCostUnit, item.maintenanceCost, item.maintenanceCostUnit, 
                item.description, item.otherCost, item.otherCostUnit, item.notes, item.capitalGrowth, item.bedrooms, item.bathrooms, item.parkingSpaces,
                item.fenced, item.rented, item.rentPrice, item.rentPriceUnit, item.rentPricePeriod, item.rentAppraisalDone, item.vacancy, item.bodyCorporate,
                item.bodyCorporateUnit, item.utilitiesCost, item.utilitiesCostUnit, item.agent, item.managed, item.managerRate, item.buildingType, item.titleType))
          }
        }
      } else {
        this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
      }

      return Observable.of(properties);
    });
  }

  /**
   * Server call to delete a property from the system
   * @param {string} id . The record id
   * @param {string} email . The current user email.
   */
  delete(id : string, email : string) : Observable<any> {
    let methodTrace = `${this.constructor.name} > delete() > `; //for debugging

    if (!id || !email) {
      this.appService.consoleLog('error', `${methodTrace} Required parameters missing.`);
      return Observable.throw(null);
    }

    let params = new HttpParams().set('email', email);

    return this.http.delete<Response>(`${this.serverHost}/delete/${id}`, { headers : this.headers, params } )
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }
}