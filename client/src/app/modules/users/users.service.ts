import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { User } from './models/user';
import { Observable } from 'rxjs';
import { Response } from '../../models/response';
import { AccountPersonal } from './models/account-personal';
import { AccountFinance } from './models/account-finance';

@Injectable()
export class UsersService {

  private serverHost: string = environment.apiHost + '/api/users';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  
  user$: BehaviorSubject<User>; // Observable user stream
  routerRedirectUrl: string = null; // a route to redirect the user to when login is successfull

  constructor(private http: HttpClient, private appService: AppService) {
    this.user$ = new BehaviorSubject<User>(null);
  }

  /**
   * user source feeder
   */
  setUser(user: User = null) {
    this.user$.next(user);
  }

  /**
   * get the current user from the source
   */
  getUser(): User {
    return this.user$.getValue();
  }

  /**
   * Server call to Register a new user in the system 
   * @param postData
   * 
   * @return { Observable<User> } 
   */
  register$(postData: any = {}): Observable<User> {
    const methodTrace = `${this.constructor.name} > register$() > `; // for debugging

    this.setUser(null);
    return this.http.post<Response>(`${this.serverHost}/register`, postData, { headers : this.headers }).pipe(
      map(this.appService.extractData),
      flatMap((data: any): Observable<User> => {
        let user: User = null;
        if (data && data.email) {
          user = new User(data.name, data.email, data.avatar, null, null, data.currency);
          this.setUser(user);
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`, data);
        }

        return of(user);
      }),
      catchError(this.appService.handleError)
    );
  }

  /**
   * Server call to update account user details 
   * @param postData 
   * 
   * @return { Observable<User> }
   */
  updateAccount$(postData: any = {}): Observable<User> {
    const methodTrace = `${this.constructor.name} > updateAccount() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/account`, postData, { headers : this.headers }).pipe(
      map(this.appService.extractData),
      flatMap((data: any): Observable<User> => {
        const user: User = this.getUser();

        if (data && data.email) {
          user.name = data.name;
          user.email = data.email;
          user.currency = data.currency;

          this.setUser(user);
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
        }

        return of(user);
      }),
      catchError(this.appService.handleError)
    );
  }

  /**
   * Server call to update account personal details 
   * @param postData 
   * 
   * @return {Observable<User>}
   */
  updatePersonalInfo$(postData: any = {}): Observable<User> {
    const methodTrace = `${this.constructor.name} > updatePersonalInfo$() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/accountPersonalInfo`, postData, { headers : this.headers }).pipe(
      map(this.appService.extractData),
      flatMap((data: any): Observable<User> => {
        const user = this.getUser();

        if (data.personalInfo.birthday) {
          user.personalInfo = new AccountPersonal(data.personalInfo.birthday);
          this.setUser(user);
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
        }

        return of(user);
      }),
      catchError(this.appService.handleError)
    );
  }

  /**
   * Server call to update account financial details 
   * @param postData 
   * 
   * @return {Observable<User>}
   */
  updateFinancialInfo$(postData: any = {}): Observable<User> {
    const methodTrace = `${this.constructor.name} > updateFinancialInfo$() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/accountFinancialInfo`, postData, { headers : this.headers }).pipe(
      map(this.appService.extractData),
      flatMap((data: any): Observable<User> => {
        const user = this.getUser();

        if (data.financialInfo.savingsUnit) {  
          user.financialInfo = new AccountFinance(data.financialInfo.annualIncome, data.financialInfo.annualIncomeUnit, 
              data.financialInfo.savings, data.financialInfo.savingsUnit, data.financialInfo.incomeTaxRate);
          
          this.setUser(user);
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
        }

        return of(user);
      }),
      catchError(this.appService.handleError)
    );
  }

  /**
   * Server call to retrieve the currently authenticated user, or null if nobody .
   * @param { any } parameters . The parameters for the service call. Accepted are personalInfo (boolean), financialInfo (boolean)
   * 
   * @return { Observable<User> }
   */
  getAuthenticatedUser$(parameters: any = null) {
    const methodTrace = `${this.constructor.name} > getAuthenticatedUser() > `; // for debugging

    let params = new HttpParams();
    if (parameters && Object.keys(parameters).length) {
      for (const key of Object.keys(parameters)) {
        params = params.set(key, parameters[key] + '');
      }
    }
    
    return this.http.get<Response>(`${this.serverHost}/getUser`, { params }).pipe(
      map(this.appService.extractData),
      flatMap((data: any): Observable<User> => {
        let user: User = null;

        if (data && data.email) {
          let personalInfo = null;
          if (data.personalInfo && data.personalInfo.birthday) {
            personalInfo = new AccountPersonal(data.personalInfo.birthday);
          }
  
          let financialInfo = null;
          if (data.financialInfo && data.financialInfo.savingsUnit) {
            financialInfo = new AccountFinance(data.financialInfo.annualIncome, data.financialInfo.annualIncomeUnit, 
                data.financialInfo.savings, data.financialInfo.savingsUnit, data.financialInfo.incomeTaxRate);
          }
          
          user = new User(data.name, data.email, data.avatar, financialInfo, personalInfo, data.currency);
          this.setUser(user);
        } else {
          this.appService.consoleLog('info', `${methodTrace} User not logged in.`, data);
          this.setUser(null);
        }

        return of(user);
      }),
      catchError(this.appService.handleError)
    );
  }

  /**
   * Server call to login the provided user email and pass.
   * 
   * @return { Observable<User>}
   */
  login$(postData: any = {}): Observable<User> {
    const methodTrace = `${this.constructor.name} > login$() > `; // for debugging
    this.setUser(null);

    return this.http.post<Response>(`${this.serverHost}/login`, postData, { headers : this.headers }).pipe(
      map(this.appService.extractData),
      flatMap((data: any): Observable<User> => {
        let user: User = null;

        if (data && data.email) {
          user = new User(data.name, data.email, data.avatar, null, null, data.currency);
          this.setUser(user);
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
          this.setUser(null);
        }

        return of(user);
      }),
      catchError(this.appService.handleError)
    );
  }

  /**
   * Server call to forgot with the provided user email.
   * 
   * @return { Observable<any>}
   */
  forgot$(postData: any = {}): Observable<any> {
    const methodTrace = `${this.constructor.name} > forgot$() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/account/forgot`, postData, { headers : this.headers }).pipe(
      map(this.appService.extractData),
      catchError(this.appService.handleError)
    );
  }

  /**
   * Server call to reset password api with the provided new password.
   * 
   * @return { Observable<User> }
   */
  reset$(token: string, postData: any = {}): Observable<User> {
    const methodTrace = `${this.constructor.name} > reset$() > `; // for debugging

    this.setUser(null);
    return this.http.post<Response>(`${this.serverHost}/account/reset/${token}`, postData, { headers : this.headers })
        .pipe(
          map(this.appService.extractData),
          flatMap((data: any): Observable<User> => {
            let user: User = null;

            if (data && data.email) {
              user = new User(data.name, data.email, data.avatar, null, null, data.currency);
              this.setUser(user);
            } else {
              this.setUser(null);
              this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
            }
    
            return of(user);
          }),
          catchError(this.appService.handleError)
        );
  }

  /**
   * Server call to login the provided user email and pass.
   * 
   * @return { Observable<null>}
   */
  logout$(): Observable<any> {
    const methodTrace = `${this.constructor.name} > logout$() > `; // for debugging

    return this.http.get<Response>(`${this.serverHost}/logout`).pipe(
      map(this.appService.extractData),
      flatMap((data: any): Observable<null> => {
        this.setUser(null);
        return of(null);
      }),
      catchError(this.appService.handleError)
    );
  }
}
