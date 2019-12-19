import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, withLatestFrom } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { User } from './models/user';
import { Observable } from 'rxjs';
import { Response } from '../../models/response';
import { AccountPersonal } from './models/account-personal';
import { AccountFinance } from './models/account-finance';
import _ from 'lodash';
import { Store } from '@ngrx/store';
import { ResetPasswordModel } from './models/reset-password-model';
import { ConsoleNotificationTypes, SnackbarNotificationTypes } from 'src/app/constants';
import { UserAdditionalInfo } from './models/user-additional-info';
import { State } from 'src/app/main.reducer';
import { userSelector } from './user.selectors';

@Injectable()
export class UsersService {

  private serverHost: string = environment.apiHost + '/api/users';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  //routerRedirectUrl: string = null; // a route to redirect the user to when login is successfull

  constructor(
    private http: HttpClient, 
    private appService: AppService,
    private store: Store<State>
  ) { }

  /**
   * Server call to Register a new user in the system 
   * @param postData
   * 
   * @return { Observable<User> } 
   */
  register$(postData: any = {}): Observable<User> {
    const methodTrace = `${this.constructor.name} > register$() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/register`, postData, { headers : this.headers }).pipe(
      map(this.appService.extractData),
      map((data: any): User => {
        let user: User = null;
        if (data && data.email) {
          user = new User(data.name, data.email, data.avatar, null, null, data.currency);
        } else {
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`, data);
        }

        return user;
      })
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
      withLatestFrom(this.store.select(userSelector())), //check this in web
      map(([data, user]: [any, User]): User => {
        if (data && data.email) {
          user = _.cloneDeep(user);
          user.name = data.name;
          user.email = data.email;
          user.currency = data.currency;

          this.appService.showResults(`Your profile was successfully updated.`, SnackbarNotificationTypes.SUCCESS);
        } else {
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
        }
        
        return user;
      })
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
      withLatestFrom(this.store.select(userSelector())), //check this in web
      map(([data, user]: [any, User]): User => {
        if (data.personalInfo.birthday) {
          user = _.cloneDeep(user);
          user.personalInfo = new AccountPersonal(data.personalInfo.birthday);
          this.appService.showResults(`Your personal information was successfully updated.`, SnackbarNotificationTypes.SUCCESS);
        } else {
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
        }

        return user;
      })
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
      withLatestFrom(this.store.select(userSelector())), //check this in web
      map(([data, user]: [any, User]): User => {
        if (data.financialInfo.savingsUnit) {
          user = _.cloneDeep(user);
          user.financialInfo = new AccountFinance(data.financialInfo.annualIncome, data.financialInfo.annualIncomeUnit, 
              data.financialInfo.savings, data.financialInfo.savingsUnit, data.financialInfo.incomeTaxRate);
          this.appService.showResults(`Your financial information was successfully updated.`, SnackbarNotificationTypes.SUCCESS);
        } else {
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
        }

        return user;
      })
    );
  }

  /**
   * Server call to retrieve the currently authenticated user, or null if nobody .
   * @param { any } parameters . The parameters for the service call. Accepted are personalInfo (boolean), financialInfo (boolean)
   * 
   * @return { Observable<User> }
   */
  getAuthenticatedUser$(parameters: UserAdditionalInfo = null): Observable<User> {
    const methodTrace = `${this.constructor.name} > getAuthenticatedUser() > `; // for debugging

    let params = new HttpParams();
    if (parameters && Object.keys(parameters).length) {
      Object.keys(parameters).map(key => params = params.set(key, parameters[key] + ''))
    }
    
    return this.http.get<Response>(`${this.serverHost}/getUser`, { params }).pipe(
      map(this.appService.extractData),
      map((data: any): User => {
        if (!(data && data.email)) {
          this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} User not logged in.`, data);
          return null;
        } 

        let personalInfo = null;
        if (data.personalInfo && data.personalInfo.birthday) {
          personalInfo = new AccountPersonal(data.personalInfo.birthday);
        }

        let financialInfo = null;
        if (data.financialInfo && data.financialInfo.savingsUnit) {
          financialInfo = new AccountFinance(data.financialInfo.annualIncome, data.financialInfo.annualIncomeUnit, 
              data.financialInfo.savings, data.financialInfo.savingsUnit, data.financialInfo.incomeTaxRate);
        }
        
        return new User(data.name, data.email, data.avatar, financialInfo, personalInfo, data.currency);
      })
    );
  }

  /**
   * Server call to login the provided user email and pass.
   * 
   * @return { Observable<User>}
   */
  login$(postData: any = {}): Observable<User> {
    const methodTrace = `${this.constructor.name} > login$() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/login`, postData, { headers : this.headers }).pipe(
      map(this.appService.extractData),
      map((data: any): User => {
        if (!(data && data.email)) {
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
          return null;
        }

        return new User(data.name, data.email, data.avatar, null, null, data.currency);
      })
    );
  }

  /**
   * Server call to forgot with the provided user email.
   * 
   * @return { Observable<boolean>}
   */
  forgot$(postData: any = {}): Observable<boolean> {
    const methodTrace = `${this.constructor.name} > forgot$() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/account/forgot`, postData, { headers : this.headers })
      .pipe(
        map(this.appService.extractData),
        map((data: any): boolean => {
          if (data && data.email && data.expires) {
            this.appService.showResults(`We sent an email to ${data.email} with a password reset link that will expire in ${data.expires}.`, SnackbarNotificationTypes.INFO);
            return true;
          }
          
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
          return false;
        })
      );
  }

  /**
   * Server call to reset password api with the provided new password.
   * 
   * @return { Observable<User> }
   */
  reset$(token: string, postData: ResetPasswordModel): Observable<User> {
    const methodTrace = `${this.constructor.name} > reset$() > `; // for debugging

    // this.setUser(null);
    return this.http.post<Response>(`${this.serverHost}/account/reset/${token}`, postData, { headers : this.headers })
      .pipe(
        map(this.appService.extractData),
        map((data: any): User => {
          let user: User = null;

          if (data && data.email) {
            this.appService.showResults('Your password was successfully updated!', SnackbarNotificationTypes.SUCCESS);
            user = new User(data.name, data.email, data.avatar, null, null, data.currency);
            
            return user;
          }

          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
          return user;
        })
      );
  }

  /**
   * Server call to login the provided user email and pass.
   * 
   * @return { Observable<null>}
   */
  logout$(): Observable<null> {
    const methodTrace = `${this.constructor.name} > logout$() > `; // for debugging

    return this.http.get<Response>(`${this.serverHost}/logout`).pipe(
      map(this.appService.extractData),
      map((data: any): null => null)
    );
  }
}
