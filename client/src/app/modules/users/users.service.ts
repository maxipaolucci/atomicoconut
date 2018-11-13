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

@Injectable()
export class UsersService {

  private serverHost: string = environment.apiHost + '/api/users';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  private userSource: BehaviorSubject<User>; // Observable user source
  user$: Observable<User>; // Observable user stream
  routerRedirectUrl: string = null; // a route to redirect the user to when login is successfull

  constructor(private http: HttpClient, private appService: AppService) {
    this.userSource = new BehaviorSubject<User>(null);
    this.user$ = this.userSource.asObservable();
  }

  /**
   * user source feeder
   */
  setUser(user: User = null) {
    this.userSource.next(user);
  }

  /**
   * get the current user from the source
   */
  getUser(): User {
    return this.userSource.getValue();
  }

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
        let user: User = null;

        if (data && data.email) {
          user = this.getUser();
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

    return this.http.post<Response>(`${this.serverHost}/accountPersonalInfo`, postData, { headers : this.headers })
        .pipe(
          map(this.appService.extractData),
          flatMap((data: any): Observable<User> => {
            let user: User = null;

            if (data === null) {
              user = this.getUser();
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
   * @return {Observable<any>}
   */
  updateFinancialInfo$(postData: any = {}): Observable<any> {
    const methodTrace = `${this.constructor.name} > updateFinancialInfo$() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/accountFinancialInfo`, postData, { headers : this.headers })
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
  }

  /**
   * Server call to retrieve the currently authenticated user, or null if nobody .
   * @param {any} parameters . The parameters for the service call. Accepted are personalInfo (boolean), financeInfo (boolean)
   * 
   * @return { Observable<any>}
   */
  getAuthenticatedUser$(parameters: any = null): Observable<any> {
    const methodTrace = `${this.constructor.name} > getAuthenticatedUser$() > `; // for debugging

    let params = new HttpParams();
    if (parameters && Object.keys(parameters).length) {
      for (const key of Object.keys(parameters)) {
        params = params.set(key, parameters[key] + '');
      }
    }
    
    return this.http.get<Response>(`${this.serverHost}/getUser`, { params })
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
  }

  /**
   * Server call to login the provided user email and pass.
   * 
   * @return { Observable<any>}
   */
  login$(postData: any = {}): Observable<any> {
    const methodTrace = `${this.constructor.name} > login$() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/login`, postData, { headers : this.headers })
        .pipe(
          map(this.appService.extractData),
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

    return this.http.post<Response>(`${this.serverHost}/account/forgot`, postData, { headers : this.headers })
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
  }

  /**
   * Server call to reset password api with the provided new password.
   * 
   * @return { Observable<any>}
   */
  reset$(token: string, postData: any = {}): Observable<any> {
    const methodTrace = `${this.constructor.name} > reset$() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/account/reset/${token}`, postData, { headers : this.headers })
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
  }

  /**
   * Server call to login the provided user email and pass.
   * 
   * @return { Observable<any>}
   */
  logout$(): Observable<any> {
    const methodTrace = `${this.constructor.name} > logout$() > `; // for debugging

    return this.http.get<Response>(`${this.serverHost}/logout`)
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
  }
}
