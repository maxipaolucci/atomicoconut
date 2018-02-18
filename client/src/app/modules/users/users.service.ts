import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from "../../../environments/environment";
import { AppService } from "../../app.service";
import { User } from "./models/user";
import { Observable } from 'rxjs/Observable';
import { Response } from '../../models/response';

@Injectable()
export class UsersService {

  private serverHost : string = environment.apiHost + '/api/users';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  private userSource : BehaviorSubject<User>; //Observable user source
  user$ : Observable<User>; //Observable user stream
  routerRedirectUrl : string = null; //a route to redirect the user to when login is successfull

  constructor(private http : HttpClient, private appService : AppService) {
    this.userSource = new BehaviorSubject<User>(null);
    this.user$ = this.userSource.asObservable();
  }

  /**
   * user source feeder
   */
  setUser(user : User = null) {
    this.userSource.next(user);
  }

  /**
   * get the current user from the source
   */
  getUser() : User {
    return this.userSource.getValue();
  }

  /**
   * Server call to Register a new user in the system 
   * @param postData 
   */
  register(postData : any = {}) : Observable<any> {
    let methodTrace = `${this.constructor.name} > register() > `; //for debugging

    return this.http.post<Response>(`${this.serverHost}/register`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }

  /**
   * Server call to update account user details 
   * @param postData 
   */
  updateAccount(postData : any = {}) : Observable<any> {
    let methodTrace = `${this.constructor.name} > updateAccount() > `; //for debugging

    return this.http.post<Response>(`${this.serverHost}/account`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }

  /**
   * Server call to update account personal details 
   * @param postData 
   */
  updatePersonalInfo(postData : any = {}) : Observable<any> {
    let methodTrace = `${this.constructor.name} > updatePersonalInfo() > `; //for debugging

    return this.http.post<Response>(`${this.serverHost}/accountPersonalInfo`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }

  /**
   * Server call to update account financial details 
   * @param postData 
   */
  updateFinancialInfo(postData : any = {}) : Observable<any> {
    let methodTrace = `${this.constructor.name} > updateFinancialInfo() > `; //for debugging

    return this.http.post<Response>(`${this.serverHost}/accountFinancialInfo`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }

  /**
   * Server call to retrieve the currently authenticated user, or null if nobody .
   * @param {any} parameters . The parameters for the service call. Accepted are personalInfo (boolean), financeInfo (boolean)
   */
  getAuthenticatedUser(parameters : any = null) : Observable<any> {
    let methodTrace = `${this.constructor.name} > getAuthenticatedUser() > `; //for debugging

    let params = new HttpParams();
    if (parameters && Object.keys(parameters).length) {
      for (let key of Object.keys(parameters)) {
        params = params.set(key, parameters[key] + '');
      }
    }
    
    return this.http.get<Response>(`${this.serverHost}/getUser`, { params })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }

  /**
   * Server call to login the provided user email and pass.
   */
  login(postData : any = {}) : Observable<any> {
    let methodTrace = `${this.constructor.name} > login() > `; //for debugging

    return this.http.post<Response>(`${this.serverHost}/login`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }

  /**
   * Server call to forgot with the provided user email.
   */
  forgot(postData : any = {}) : Observable<any> {
    let methodTrace = `${this.constructor.name} > forgot() > `; //for debugging

    return this.http.post<Response>(`${this.serverHost}/account/forgot`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }

  /**
   * Server call to reset password api with the provided new password.
   */
  reset(token : string, postData : any = {}) : Observable<any> {
    let methodTrace = `${this.constructor.name} > reset() > `; //for debugging

    return this.http.post<Response>(`${this.serverHost}/account/reset/${token}`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }

  /**
   * Server call to login the provided user email and pass.
   */
  logout() : Observable<any> {
    let methodTrace = `${this.constructor.name} > logout() > `; //for debugging

    return this.http.get<Response>(`${this.serverHost}/logout`)
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }
}
