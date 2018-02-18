import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { environment } from "../../../environments/environment";
import { AppService } from "../../app.service";
import { User } from '../users/models/user';
import { Investment } from './models/investment';
import { CurrencyInvestment } from './models/currencyInvestment';
import { Team } from '../teams/models/team';
import { Response } from '../../models/response';
import { of } from 'rxjs/observable/of';


@Injectable()
export class InvestmentsService {

  private serverHost : string = environment.apiHost + '/api/investments';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http : HttpClient, private appService : AppService) {}

  /**
   * Server call to Create a new investment in the system 
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
   * Server call to Get an investment from the server based on its ID
   * @param {string} id . The investment id
   */
  getInvestmentById(email : string, id : string) : Observable<any> {
    let methodTrace = `${this.constructor.name} > getInvestmentById() > `; //for debugging

    if (!id || !email) {
      this.appService.consoleLog('error', `${methodTrace} Required parameters missing.`);
      return of(null);
    }

    let params = new HttpParams()
        .set('id', id)
        .set('email', email);

    const investmentData$ = this.http.get<Response>(`${this.serverHost}/getbyId`, { params })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);

    return investmentData$.switchMap((investmentData) => {
      let investment : Investment = null;
      if (investmentData && investmentData._id) {
        const createdBy = new User(investmentData.createdBy.name, investmentData.createdBy.email, investmentData.createdBy.gravatar);
        
        let team : Team = null;
        if (investmentData.team) {
          //fill team members
          let admin : User = null;
          let members : User[] = [];
          for (let member of investmentData.team.members) {
            const newMember = new User(member.name, member.email, member.gravatar);
            members.push(newMember);
            if (member.isAdmin) {
              admin = newMember;
            }
          }
          team = new Team(investmentData.team.name, investmentData.team.description, investmentData.team.slug, admin, members);
        }
        

        if (investmentData.investmentType === 'currency' || investmentData.investmentType === 'crypto') {
          investment = new CurrencyInvestment(investmentData._id, investmentData.amount, investmentData.amountUnit, createdBy, team, investmentData.investmentDistribution, 
              investmentData.currencyInvestmentData.amountUnit, investmentData.currencyInvestmentData.amount, investmentData.currencyInvestmentData.buyingPrice, 
              investmentData.currencyInvestmentData.buyingPriceUnit, investmentData.currencyInvestmentData.buyingDate, investmentData.investmentType);
        }
      } else {
        this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
      }

      return Observable.of(investment);
    });
  }

  /**
   * Server call to Get all the Investments for the current user from the server
   * @param {string} email . The user email
   */
  getInvestments(email : string) : Observable<Investment[]> {
    let methodTrace = `${this.constructor.name} > getInvestments() > `; //for debugging

    if (!email) {
      this.appService.consoleLog('error', `${methodTrace} Required parameters missing.`);
      return Observable.from([]);
    }

    let params = new HttpParams().set('email', email);

    const investmentsData$ = this.http.get<Response>(`${this.serverHost}/getAll`, { params })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
    
    return investmentsData$.switchMap((investmentsData) => {
      let investments : Investment[] = [];

      if (investmentsData && investmentsData instanceof Array) {
        for (let item of investmentsData) {
          const createdBy = new User(item.createdBy.name, item.createdBy.email, item.createdBy.gravatar);
          const team = item.team ? new Team(item.team.name, item.team.description, item.team.slug) : null;

          if (item.investmentType === 'currency' || item.investmentType === 'crypto') {
            investments.push(new CurrencyInvestment(item._id, item.amount, item.amountUnit, createdBy, team, item.investmentDistribution, item.currencyInvestmentData.amountUnit, 
                item.currencyInvestmentData.amount, item.currencyInvestmentData.buyingPrice, item.currencyInvestmentData.buyingPriceUnit, item.currencyInvestmentData.buyingDate, item.investmentType));
          }
        }
      } else {
        this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
      }

      return Observable.of(investments);
    });
  }

  /**
   * Server call to delete an investment from the server
   * @param {string} id . The investment id
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
