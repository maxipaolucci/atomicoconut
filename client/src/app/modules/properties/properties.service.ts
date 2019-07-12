import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Observable, of } from 'rxjs';
import { Property } from './models/property';
import { Response } from '../../models/response';
import { User } from '../users/models/user';
import { PROPERTY_TYPES } from '../../constants';
import { House } from './models/house';
import { Address } from './models/address';
import { map, catchError, switchMap, flatMap } from 'rxjs/operators';

@Injectable()
export class PropertiesService {

  private serverHost: string = environment.apiHost + '/api/properties';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private appService: AppService) {}

  /**
   * Server call to Create a new property in the system 
   * @param postData 
   * 
   * @return { Observable<any> }
   */
  create$(postData: any = {}): Observable<any> {
    const methodTrace = `${this.constructor.name} > create() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/create`, postData, { headers : this.headers }).pipe(
      map(this.appService.extractData),
      catchError(this.appService.handleError)
    );
  } 
  
  /**
   * Server call to Update an investment in the system 
   * @param postData 
   * 
   * @return { Observable<Property> }
   */
  update$(postData: any | FormData = {}): Observable<any> {
    const methodTrace = `${this.constructor.name} > update() > `; // for debugging
    
    return this.http.post<Response>(`${this.serverHost}/update`, postData).pipe(
      map(this.appService.extractData),
      catchError(this.appService.handleError)
    );
  }

  /**
   * Server call to Get a property from the server based on its ID
   * @param {string} id . The property id
   * 
   * @return { Observable<Property> }
   */
  getPropertyById$(email: string, id: string): Observable<Property> {
    const methodTrace = `${this.constructor.name} > getPropertyById() > `; // for debugging

    if (!id || !email) {
      this.appService.consoleLog('error', `${methodTrace} Required parameters missing.`);
      return of(null);
    }

    const params = new HttpParams().set('email', email);

    return this.http.get<Response>(`${this.serverHost}/${id}`, { params }).pipe(
      map(this.appService.extractData),
      flatMap((data) => {
        return of(this.populate(data));
      }),
      catchError(this.appService.handleError)
    );
  }

  /**
   * Populates a property from an object from server
   * @param { any } data
   * 
   * @return { Property } 
   */
  private populate(data: any): Property {
    const methodTrace = `${this.constructor.name} > populateTeam() > `; // for debugging

    if (data && data._id) {
      const createdBy = new User(data.createdBy.name, data.createdBy.email, data.createdBy.gravatar);
      
      let address = new Address();
      if (data.location) {
        address = new Address(data.location.address, data.location.coordinates[1], data.location.coordinates[0], data.location.mapsPlaceId);
      }

      // populate sharedwith
      const sharedWith : User[] = [];
      for (const member of data.sharedWith) {
        const newMember = new User(member.name, member.email, member.gravatar);
        sharedWith.push(newMember);
      }
      
      if (data.propertyType === PROPERTY_TYPES.HOUSE) {
        return new House(data._id, data.propertyType, address, createdBy, data.propertyTypeData.landArea, data.propertyTypeData.floorArea, data.askingPrice, data.askingPriceUnit,
            data.offerPrice, data.offerPriceUnit, data.walkAwayPrice, data.walkAwayPriceUnit, data.purchasePrice, data.purchasePriceUnit, data.purchasePrice2, data.purchasePrice2Unit, 
            data.purchasePrice3, data.purchasePrice3Unit, data.purchasePrice4, data.purchasePrice4Unit, data.purchasePrice5, data.purchasePrice5Unit, data.dateListed, 
            data.reasonForSelling, data.marketValue, data.marketValueUnit, data.propertyTypeData.registeredValue, data.propertyTypeData.registeredValueUnit, data.propertyTypeData.rates, data.propertyTypeData.ratesUnit,
            data.propertyTypeData.insurance, data.propertyTypeData.insuranceUnit, data.renovationCost, data.renovationCostUnit, data.maintenanceCost, data.maintenanceCostUnit, 
            data.description, data.otherCost, data.otherCostUnit, data.notes, data.photos, data.unit, data.status, data.statusDetail, sharedWith, data.propertyTypeData.capitalGrowth, data.propertyTypeData.bedrooms, data.propertyTypeData.bathrooms, data.propertyTypeData.parkingSpaces,
            data.propertyTypeData.fenced, data.propertyTypeData.rented, data.propertyTypeData.rentPrice, data.propertyTypeData.rentPriceUnit, data.propertyTypeData.rentPricePeriod, data.propertyTypeData.rentAppraisalDone, data.propertyTypeData.vacancy, data.propertyTypeData.bodyCorporate,
            data.propertyTypeData.bodyCorporateUnit, data.propertyTypeData.utilitiesCost, data.propertyTypeData.utilitiesCostUnit, data.propertyTypeData.agent, data.propertyTypeData.managed, data.propertyTypeData.managerRate, data.propertyTypeData.buildingType, data.propertyTypeData.titleType);
      }
    } else {
      this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
    }

    return null;
  }

  /**
   * Server call to Get all the properties for the current user from the server.
   * This proeprties will be the properties the user created plus the investment properties where she/he has a piece of the cake.
   * @param {string} email . The user email
   * @param {boolean} justUserProperties . If false it get properties created by the user with the email provided plus properties from investments where the user has a portion of it.
   *                                       If true it just bring back the properties created by the user with the email provided.
   * 
   * @return { Observable<Property[]> } 
   */
  getProperties$(email: string, justUserProperties: boolean = false): Observable<Property[]> {
    const methodTrace = `${this.constructor.name} > getProperties() > `; // for debugging

    if (!email) {
      this.appService.consoleLog('error', `${methodTrace} Required parameters missing.`);
      return of([]);
    }

    const params = new HttpParams().set('email', email).set('justUserProperties', justUserProperties + '');

    return this.http.get<Response>(`${this.serverHost}/getAll`, { params }).pipe(
      map(this.appService.extractData),
      flatMap((responseData) => {
        const properties: Property[] = [];
  
        if (responseData && responseData instanceof Array) {
          for (const data of responseData) {
            properties.push(this.populate(data));
          }
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
        }
  
        return of(properties);
      }),
      catchError(this.appService.handleError)
    );
  }

  /**
   * Server call to delete a property from the system
   * @param {string} id . The record id
   * @param {string} email . The current user email.
   * 
   * @return { any }
   * 
   */
  delete$(id: string, email: string): Observable<any> {
    const methodTrace = `${this.constructor.name} > delete() > `; // for debugging

    if (!id || !email) {
      this.appService.consoleLog('error', `${methodTrace} Required parameters missing.`);
      return Observable.throw(null);
    }

    const params = new HttpParams().set('email', email);

    return this.http.delete<Response>(`${this.serverHost}/delete/${id}`, { headers : this.headers, params } ).pipe(
      map(this.appService.extractData),
      catchError(this.appService.handleError)
    );
  }

  getStatusTitle(statusId: string): string {
    let title :string = '';

    switch(statusId) {
      case 'agent_contacted': {
        title = 'Agent contacted';
        break;
      }
      
      case 'viewing_arranged': {
        title = 'Viewing arranged';
        break;
      }
      case 'viewed': {
        title = 'Viewed';
        break;
      }
      case 'negotiating': {
        title = 'Negotiating';
        break;
      }
      case 'backup_offer': {
        title = 'Backup offer accepted';
        break;
      }
      case 'conditional': {
        title = 'Conditional';
        break;
      }
      case 'unconditional': {
        title = 'Unconditional';
        break;
      }
      case 'owned': {
        title = 'Owned';
        break;
      }
      case 'discarded': {
        title = 'Discarded';
        break;
      }

      default: {
        title = null;
        break;
      }
    }

    return title;
  }
}
