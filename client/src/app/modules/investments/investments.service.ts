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
import { of, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { INVESTMENTS_TYPES, PROPERTY_TYPES } from '../../constants';
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
   * @return { Observable<any> } 
   */
  create$(postData: any = {}): Observable<any> {
    const methodTrace = `${this.constructor.name} > create$() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/create`, postData, { headers : this.headers })
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
  } 
  
  /**
   * Server call to Update an investment in the system 
   * @param postData 
   * 
   * @return { Observable<any> }
   */
  update$(postData: any = {}): Observable<any> {
    const methodTrace = `${this.constructor.name} > update$() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/update`, postData, { headers : this.headers })
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
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
      this.appService.consoleLog('error', `${methodTrace} Required parameters missing.`);
      return of(null);
    }

    const params = new HttpParams()
        .set('id', id)
        .set('email', email);

    const investment$ = this.http.get<Response>(`${this.serverHost}/getbyId`, { params })
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );

    return investment$.pipe(switchMap((investment) => {
      let result: Investment = null;
      if (investment && investment._id) {
        const createdBy = new User(investment.createdBy.name, investment.createdBy.email, investment.createdBy.gravatar);
        
        let team: Team = null;
        if (investment.team) {
          // fill team members
          let admin: User = null;
          const members: User[] = [];
          for (const member of investment.team.members) {
            const newMember = new User(member.name, member.email, member.gravatar);
            members.push(newMember);
            if (member.isAdmin) {
              admin = newMember;
            }
          }
          team = new Team(investment.team.name, investment.team.description, investment.team.slug, admin, members);
        }
        

        if (investment.investmentType === INVESTMENTS_TYPES.CURRENCY || investment.investmentType === INVESTMENTS_TYPES.CRYPTO) {
          result = new CurrencyInvestment(investment._id, investment.amount, investment.amountUnit, createdBy, team, 
              investment.investmentDistribution, investment.investmentData.amountUnit, investment.investmentData.amount, 
              investment.investmentData.buyingPrice, investment.investmentData.buyingPriceUnit, 
              investment.investmentData.buyingDate, investment.investmentType, investment.loanAmount, investment.loanAmountUnit);
        } else if (investment.investmentType === INVESTMENTS_TYPES.PROPERTY) {
          let property = null;
          const propertyData = investment.investmentData.property;
          let address = new Address();
          if (propertyData.location) {
            address = new Address(propertyData.location.address, propertyData.location.coordinates[1], propertyData.location.coordinates[0], propertyData.location.mapsPlaceId);
          }

          if (propertyData.propertyType === PROPERTY_TYPES.HOUSE) {
            // we share the createdBy of the investment because we know is the same
            property = new House(propertyData._id, propertyData.propertyType, address, createdBy, propertyData.landArea, propertyData.floorArea, propertyData.askingPrice, propertyData.askingPriceUnit,
                propertyData.offerPrice, propertyData.offerPriceUnit, propertyData.walkAwayPrice, propertyData.walkAwayPriceUnit, propertyData.purchasePrice, propertyData.purchasePriceUnit,
                propertyData.purchasePrice2, propertyData.purchasePrice2Unit, propertyData.purchasePrice3, propertyData.purchasePrice3Unit, propertyData.purchasePrice4, propertyData.purchasePrice4Unit,
                propertyData.purchasePrice5, propertyData.purchasePrice5Unit, propertyData.dateListed, 
                propertyData.reasonForSelling, propertyData.marketValue, propertyData.marketValueUnit, propertyData.registeredValue, propertyData.registeredValueUnit, propertyData.rates, propertyData.ratesUnit,
                propertyData.insurance, propertyData.insuranceUnit, propertyData.renovationCost, propertyData.renovationCostUnit, propertyData.maintenanceCost, propertyData.maintenanceCostUnit, 
                propertyData.description, propertyData.otherCost, propertyData.otherCostUnit, propertyData.notes, propertyData.capitalGrowth, propertyData.bedrooms, propertyData.bathrooms, propertyData.parkingSpaces,
                propertyData.fenced, propertyData.rented, propertyData.rentPrice, propertyData.rentPriceUnit, propertyData.rentPricePeriod, propertyData.rentAppraisalDone, propertyData.vacancy, propertyData.bodyCorporate,
                propertyData.bodyCorporateUnit, propertyData.utilitiesCost, propertyData.utilitiesCostUnit, propertyData.agent, propertyData.managed, propertyData.managerRate, propertyData.buildingType, propertyData.titleType);
          }  

          result = new PropertyInvestment(investment._id, investment.amount, investment.amountUnit, createdBy, team, investment.investmentDistribution, 
            property, investment.investmentData.buyingPrice, investment.investmentData.buyingPriceUnit, investment.investmentData.buyingDate, 
            investment.investmentType, investment.loanAmount, investment.loanAmountUnit);
        }
      } else {
        this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
      }

      return of(result);
    }));
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
      this.appService.consoleLog('error', `${methodTrace} Required parameters missing.`);
      return of([]);
    }

    const params = new HttpParams().set('email', email);

    const investmentsData$ = this.http.get<Response>(`${this.serverHost}/getAll`, { params })
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
    
    return investmentsData$.pipe(switchMap((investmentsData) => {
      const investments: Investment[] = [];

      if (investmentsData && investmentsData instanceof Array) {
        for (const item of investmentsData) {
          const createdBy = new User(item.createdBy.name, item.createdBy.email, item.createdBy.gravatar);
          const team = item.team ? new Team(item.team.name, item.team.description, item.team.slug) : null;

          if (item.investmentType === INVESTMENTS_TYPES.CURRENCY || item.investmentType === INVESTMENTS_TYPES.CRYPTO) {
            investments.push(new CurrencyInvestment(item._id, item.amount, item.amountUnit, createdBy, team, item.investmentDistribution, item.investmentData.amountUnit, 
                item.investmentData.amount, item.investmentData.buyingPrice, item.investmentData.buyingPriceUnit, item.investmentData.buyingDate, item.investmentType,
                item.loanAmount, item.loanAmountUnit));
          } else if (item.investmentType === INVESTMENTS_TYPES.PROPERTY) {
            let property = null;
            const propertyData = item.investmentData.property;
            let address = new Address();
            if (propertyData.location) {
              address = new Address(propertyData.location.address, propertyData.location.coordinates[1], propertyData.location.coordinates[0], propertyData.location.mapsPlaceId);
            }
            
            if (propertyData.propertyType === PROPERTY_TYPES.HOUSE) {
              // we share the createdBy of the investment because we know is the same
              property = new House(propertyData._id, propertyData.propertyType, address, createdBy, propertyData.landArea, propertyData.floorArea, propertyData.askingPrice, propertyData.askingPriceUnit,
                  propertyData.offerPrice, propertyData.offerPriceUnit, propertyData.walkAwayPrice, propertyData.walkAwayPriceUnit, propertyData.purchasePrice, propertyData.purchasePriceUnit,
                  propertyData.purchasePrice2, propertyData.purchasePrice2Unit, propertyData.purchasePrice3, propertyData.purchasePrice3Unit, propertyData.purchasePrice4, propertyData.purchasePrice4Unit,
                  propertyData.purchasePrice5, propertyData.purchasePrice5Unit, propertyData.dateListed, 
                  propertyData.reasonForSelling, propertyData.marketValue, propertyData.marketValueUnit, propertyData.registeredValue, propertyData.registeredValueUnit, propertyData.rates, propertyData.ratesUnit,
                  propertyData.insurance, propertyData.insuranceUnit, propertyData.renovationCost, propertyData.renovationCostUnit, propertyData.maintenanceCost, propertyData.maintenanceCostUnit, 
                  propertyData.description, propertyData.otherCost, propertyData.otherCostUnit, propertyData.notes, propertyData.capitalGrowth, propertyData.bedrooms, propertyData.bathrooms, propertyData.parkingSpaces,
                  propertyData.fenced, propertyData.rented, propertyData.rentPrice, propertyData.rentPriceUnit, propertyData.rentPricePeriod, propertyData.rentAppraisalDone, propertyData.vacancy, propertyData.bodyCorporate,
                  propertyData.bodyCorporateUnit, propertyData.utilitiesCost, propertyData.utilitiesCostUnit, propertyData.agent, propertyData.managed, propertyData.managerRate, propertyData.buildingType, propertyData.titleType);
            }  

            investments.push(new PropertyInvestment(item._id, item.amount, item.amountUnit, createdBy, team, item.investmentDistribution, 
                property, item.investmentData.buyingPrice, item.investmentData.buyingPriceUnit, item.investmentData.buyingDate, 
                item.investmentType, item.loanAmount, item.loanAmountUnit));
          }
        }
      } else {
        this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
      }

      return of(investments);
    }));
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
      this.appService.consoleLog('error', `${methodTrace} Required parameters missing.`);
      return Observable.throw(null);
    }

    const params = new HttpParams().set('email', email);

    return this.http.delete<Response>(`${this.serverHost}/delete/${id}`, { headers : this.headers, params } )
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
  }
}
