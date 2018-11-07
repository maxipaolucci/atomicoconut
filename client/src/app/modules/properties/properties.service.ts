import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs';
import { Property } from './models/property';
import { Response } from '../../models/response';
import { User } from '../users/models/user';
import { PROPERTY_TYPES } from '../../constants';
import { House } from './models/house';
import { of, from } from 'rxjs';
import { Address } from './models/address';
import { map, catchError, switchMap } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3/pipe';

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
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
  } 
  
  /**
   * Server call to Update an investment in the system 
   * @param postData 
   */
  update(postData : any = {}) : Observable<any> {
    let methodTrace = `${this.constructor.name} > update() > `; //for debugging

    return this.http.post<Response>(`${this.serverHost}/update`, postData, { headers : this.headers })
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
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
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );

    return data$.pipe(switchMap((data) => {
      let result : Property = null;
      if (data && data._id) {
        const createdBy = new User(data.createdBy.name, data.createdBy.email, data.createdBy.gravatar);
        let address = new Address();
        if (data.location) {
          address = new Address(data.location.address, data.location.coordinates[1], data.location.coordinates[0], data.location.mapsPlaceId);
        }
        
        if (data.propertyType === PROPERTY_TYPES.HOUSE) {
          result = new House(data._id, data.propertyType, address, createdBy, data.propertyTypeData.landArea, data.propertyTypeData.floorArea, data.askingPrice, data.askingPriceUnit,
              data.offerPrice, data.offerPriceUnit, data.walkAwayPrice, data.walkAwayPriceUnit, data.purchasePrice, data.purchasePriceUnit, data.dateListed, 
              data.reasonForSelling, data.marketValue, data.marketValueUnit, data.propertyTypeData.registeredValue, data.propertyTypeData.registeredValueUnit, data.propertyTypeData.rates, data.propertyTypeData.ratesUnit,
              data.propertyTypeData.insurance, data.propertyTypeData.insuranceUnit, data.renovationCost, data.renovationCostUnit, data.maintenanceCost, data.maintenanceCostUnit, 
              data.description, data.otherCost, data.otherCostUnit, data.notes, data.propertyTypeData.capitalGrowth, data.propertyTypeData.bedrooms, data.propertyTypeData.bathrooms, data.propertyTypeData.parkingSpaces,
              data.propertyTypeData.fenced, data.propertyTypeData.rented, data.propertyTypeData.rentPrice, data.propertyTypeData.rentPriceUnit, data.propertyTypeData.rentPricePeriod, data.propertyTypeData.rentAppraisalDone, data.propertyTypeData.vacancy, data.propertyTypeData.bodyCorporate,
              data.propertyTypeData.bodyCorporateUnit, data.propertyTypeData.utilitiesCost, data.propertyTypeData.utilitiesCostUnit, data.propertyTypeData.agent, data.propertyTypeData.managed, data.propertyTypeData.managerRate, data.propertyTypeData.buildingType, data.propertyTypeData.titleType);
        }
      } else {
        this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
      }

      return of(result);
    }));
  }

  /**
   * Server call to Get all the properties for the current user from the server.
   * This proeprties will be the properties the user created plus the investment properties where she/he has a piece of the cake.
   * @param {string} email . The user email
   * @param {boolean} justUserProperties . If false it get properties created by the user with the email provided plus properties from investments where the user has a portion of it.
   *                                       If true it just bring back the properties created by the user with the email provided.
   */
  getProperties(email : string, justUserProperties : boolean = false) : Observable<Property[]> {
    let methodTrace = `${this.constructor.name} > getProperties() > `; //for debugging

    if (!email) {
      this.appService.consoleLog('error', `${methodTrace} Required parameters missing.`);
      return of([]);
    }

    let params = new HttpParams().set('email', email).set('justUserProperties', justUserProperties + '');

    const responseData$ = this.http.get<Response>(`${this.serverHost}/getAll`, { params })
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
    
    return responseData$.pipe(switchMap((responseData) => {
      let properties : Property[] = [];

      if (responseData && responseData instanceof Array) {
        for (let data of responseData) {
          const createdBy = new User(data.createdBy.name, data.createdBy.email, data.createdBy.gravatar);
          let address = new Address();
          if (data.location) {
            address = new Address(data.location.address, data.location.coordinates[1], data.location.coordinates[0], data.location.mapsPlaceId);
          }

          if (data.propertyType === PROPERTY_TYPES.HOUSE) {
            properties.push(new House(data._id, data.propertyType, address, createdBy, data.landArea, data.floorArea, data.askingPrice, data.askingPriceUnit,
                data.offerPrice, data.offerPriceUnit, data.walkAwayPrice, data.walkAwayPriceUnit, data.purchasePrice, data.purchasePriceUnit, data.dateListed, 
                data.reasonForSelling, data.marketValue, data.marketValueUnit, data.registeredValue, data.registeredValueUnit, data.rates, data.ratesUnit,
                data.insurance, data.insuranceUnit, data.renovationCost, data.renovationCostUnit, data.maintenanceCost, data.maintenanceCostUnit, 
                data.description, data.otherCost, data.otherCostUnit, data.notes, data.capitalGrowth, data.bedrooms, data.bathrooms, data.parkingSpaces,
                data.fenced, data.rented, data.rentPrice, data.rentPriceUnit, data.rentPricePeriod, data.rentAppraisalDone, data.vacancy, data.bodyCorporate,
                data.bodyCorporateUnit, data.utilitiesCost, data.utilitiesCostUnit, data.agent, data.managed, data.managerRate, data.buildingType, data.titleType))
          }
        }
      } else {
        this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
      }

      return of(properties);
    }));
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
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
  }
}
