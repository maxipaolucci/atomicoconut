import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { User } from '../users/models/user';
import { Investment } from './models/investment';
import { CurrencyInvestment } from './models/currencyInvestment';
import { PropertyInvestment } from './models/propertyInvestment';
import { Team } from '../teams/models/team';
import { Response } from '../../models/response';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { INVESTMENTS_TYPES, PROPERTY_TYPES, ConsoleNotificationTypes, SnackbarNotificationTypes } from '../../constants';
import { House } from '../properties/models/house';
import { Address } from '../properties/models/address';


@Injectable()
export class InvestmentsService {

  private serverHost: string = environment.apiHost + '/api/investments';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private appService: AppService) {}

  /**
   * Server call to Create a new investment in the system 
   * @param postData
   * 
   * @return { Observable<Investment> } 
   */
  create$(postData: any = {}): Observable<Investment> {
    const methodTrace = `${this.constructor.name} > create$() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/create`, postData, { headers : this.headers })
        .pipe(
          map(this.appService.extractData),
          map((data: any): Investment => {
            if (data && data.id && data.type) {
              this.appService.showResults(`Investment successfully created!`, SnackbarNotificationTypes.SUCCESS);
              return this.populate(data.investment);
            } else {
              this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
            }

            return null;
          })
        );
  } 
  
  /**
   * Server call to Update an investment in the system 
   * @param postData 
   * 
   * @return { Observable<Investment> }
   */
  update$(postData: any = {}): Observable<Investment> {
    const methodTrace = `${this.constructor.name} > update$() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/update`, postData, { headers : this.headers })
        .pipe(
          map(this.appService.extractData),
          map((data: any): Investment => {
            if (data && data.id && data.type) {
              this.appService.showResults(`Investment successfully updated!`, SnackbarNotificationTypes.SUCCESS);
              return this.populate(data.investment)
            } else {
              this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
            }

            return null;
          })
        );
  } 

  /**
   * Server call to Get an investment from the server based on its ID
   * @param {string} id . The investment id
   * 
   * @return { Observable<Investment> }
   */
  getInvestmentById$(email: string, id: string): Observable<Investment> {
    const methodTrace = `${this.constructor.name} > getInvestmentById$() > `; // for debugging

    if (!id || !email) {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Required parameters missing.`);
      return of(null);
    }

    const params = new HttpParams()
        .set('id', id)
        .set('email', email);

    return this.http.get<Response>(`${this.serverHost}/getbyId`, { params })
      .pipe(
        map(this.appService.extractData),
        map((investment): Investment => {
          let result: Investment = null;
          if (investment && investment._id) {
            result = this.populate(investment);
          } else {
            this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
          }
    
          return result;
        })
      );
  }

  /**
   * Server call to Get all the Investments for the current user from the server
   * @param {string} email . The user email
   * 
   * @return { Observable<Investment[]> } 
   */
  getInvestments$(email: string): Observable<Investment[]> {
    const methodTrace = `${this.constructor.name} > getInvestments$() > `; // for debugging

    if (!email) {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Required parameters missing.`);
      return of([]);
    }

    const params = new HttpParams().set('email', email);

    return this.http.get<Response>(`${this.serverHost}/getAll`, { params })
      .pipe(
        map(this.appService.extractData),
        map((investmentsData): Investment[] => {
          const investments: Investment[] = [];
    
          if (investmentsData && investmentsData instanceof Array) {
            for (const item of investmentsData) {
              investments.push(this.populate(item));
            }
          } else {
            this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
            return null;
          }
    
          return investments;
        })
      );
  }

  /**
   * Populates an investment from an object from server
   * @param { any } data
   * 
   * @return { Investment } 
   */
  private populate(data: any): Investment {
    const methodTrace = `${this.constructor.name} > populate() > `; // for debugging

    const item = data;
    if (item && item._id) {
      const createdBy = new User(item.createdBy.name, item.createdBy.email, item.createdBy.gravatar);
      let team = item.team ? new Team(item.team.name, item.team.description, item.team.slug) : null;
      if (item.team && item.team.members && item.team.members.length) {
        // fill team members
        let admin: User = null;
        const members: User[] = [];
        for (const member of item.team.members) {
          const newMember = new User(member.name, member.email, member.gravatar);
          members.push(newMember);
          if (member.isAdmin) {
            admin = newMember;
          }
        }

        team.members = members;
        team.admin = admin;
      }

      if (item.investmentType === INVESTMENTS_TYPES.CURRENCY || item.investmentType === INVESTMENTS_TYPES.CRYPTO) {
        return new CurrencyInvestment(item._id, item.amount, item.amountUnit, createdBy, team, item.investmentDistribution, item.investmentData.amountUnit, 
            item.investmentData.amount, item.investmentData.buyingPrice, item.investmentData.buyingPriceUnit, item.investmentData.buyingDate, item.investmentType,
            item.loanAmount, item.loanAmountUnit);
      } else if (item.investmentType === INVESTMENTS_TYPES.PROPERTY) {
        let property = null;
        const propertyData = item.investmentData.property;
        let address = new Address();
        if (propertyData.location) {
          address = new Address(propertyData.location.address, propertyData.location.coordinates[1], propertyData.location.coordinates[0], propertyData.location.mapsPlaceId);
        }

        if (propertyData.propertyType === PROPERTY_TYPES.HOUSE) {
          console.log(propertyData);
          // we share the createdBy of the investment because we know is the same
          property = new House(propertyData._id, propertyData.propertyType, address, createdBy, propertyData.landArea, propertyData.floorArea, propertyData.askingPrice, propertyData.askingPriceUnit,
              propertyData.offerPrice, propertyData.offerPriceUnit, propertyData.walkAwayPrice, propertyData.walkAwayPriceUnit, propertyData.purchasePrice, propertyData.purchasePriceUnit,
              propertyData.purchasePrice2, propertyData.purchasePrice2Unit, propertyData.purchasePrice3, propertyData.purchasePrice3Unit, propertyData.purchasePrice4, propertyData.purchasePrice4Unit,
              propertyData.purchasePrice5, propertyData.purchasePrice5Unit, propertyData.dateListed, 
              propertyData.reasonForSelling, propertyData.marketValue, propertyData.marketValueUnit, propertyData.registeredValue, propertyData.registeredValueUnit, propertyData.rates, propertyData.ratesUnit,
              propertyData.insurance, propertyData.insuranceUnit, propertyData.renovationCost, propertyData.renovationCostUnit, propertyData.maintenanceCost, propertyData.maintenanceCostUnit, 
              propertyData.description, propertyData.otherCost, propertyData.otherCostUnit, propertyData.notes, propertyData.photos, propertyData.unit, propertyData.status, propertyData.statusDetail, [], propertyData.links, null, propertyData.capitalGrowth, propertyData.bedrooms, propertyData.bathrooms, propertyData.parkingSpaces,
              propertyData.fenced, propertyData.rented, propertyData.rentPrice, propertyData.rentPriceUnit, propertyData.rentPricePeriod, propertyData.rentAppraisalDone, propertyData.vacancy, propertyData.bodyCorporate,
              propertyData.bodyCorporateUnit, propertyData.utilitiesCost, propertyData.utilitiesCostUnit, propertyData.agent, propertyData.managed, propertyData.managerRate, propertyData.buildingType, propertyData.titleType);
        }  

        return new PropertyInvestment(item._id, item.amount, item.amountUnit, createdBy, team, item.investmentDistribution, 
            property, item.investmentData.buyingPrice, item.investmentData.buyingPriceUnit, item.investmentData.buyingDate, 
            item.investmentType, item.loanAmount, item.loanAmountUnit);
      }
    } else {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
    }

    return null;
  }

  /**
   * Server call to delete an investment from the server
   * @param {string} id . The investment id
   * @param {string} email . The current user email.
   * 
   * @return { Observable<any> }
   */
  delete$(id: string, email: string): Observable<any> {
    const methodTrace = `${this.constructor.name} > delete$() > `; // for debugging

    if (!id || !email) {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Required parameters missing.`);
      return Observable.throw(null);
    }

    const params = new HttpParams()
        .set('email', email)
        .set('pusherSocketID', this.appService.pusherSocketID); //to prevent receiving notification of actions performed by current user

    return this.http.delete<Response>(`${this.serverHost}/delete/${id}`, { headers : this.headers, params } )
        .pipe(
          map(this.appService.extractData)
        );
  }
}
