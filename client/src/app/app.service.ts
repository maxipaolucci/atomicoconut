import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';
import { SnackbarSimpleComponent } from './modules/shared/components/snackbar-simple/snackbar-simple.component';
import { Response } from './models/response';

import { ConsoleNotificationTypes, SnackbarNotificationTypes, ServerResponseStatus } from './constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ApiKeys } from './models/api-keys';


@Injectable({
  providedIn: 'root',
})
export class AppService {

  apiKeys: ApiKeys;
  pusher: any;
  pusherChannel: any;
  pusherSocketID: any;
  pusherReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); //notifies when pusher setup is ready
  private serverHost: string = environment.apiHost + '/api/system';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
      private http: HttpClient, 
      public snackBar: MatSnackBar
  ) {
    
    
  }

  /**
   * Extract data from a server response
   * @param res
   */
  public extractData(res: Response): any {
    if (res.codeno === 200 && res.status === ServerResponseStatus.SUCCESS) {
      return res.data;
    } else {
      throw res;
    }
  }

  /**
   * Shows messages in snackbar component
   * @param {string} message . The text to show
   * @param {SnackbarNotificationTypes} type
   * @param {number} duration . The duration in milliseconds . Optional
   * 
   * @return {MatSnackBar} . The snackbar ref
   */
  showResults(message: string, type: SnackbarNotificationTypes = SnackbarNotificationTypes.INFO, duration: number = 5000): any {
    const snackBarRef = this.snackBar.openFromComponent(SnackbarSimpleComponent, {
      data : {
        type,
        message
      },
      duration,
      panelClass : ['snackbar--simple', `snackbar--${type}`]
    });

    return snackBarRef;
  }

  /**
   * Shows multiple messages in snackbar component one after another
   * @param {any[]} messages . The array of messages to show
   * @param {number} index . The index where to start iterating the messages array
   * 
   * @return {MatSnackBar} . The snackbar Ref
   */
  showManyResults(messages: any[], index: number = 0) {
    let snackBarRef = null;
    if (index < messages.length) {
      snackBarRef = this.showResults(messages[index].message, messages[index].type, messages[index].duration);

      snackBarRef.afterDismissed().subscribe(() => {
        this.showManyResults(messages, index += 1);
      });
    } else {
      return snackBarRef;
    }
  }

  /**
   * Show logs in the console if enabled in the current environment
   * @param {ConsoleNotificationTypes} type . Notification type
   * @param {string} message . The message to show
   * @param {any} params . Any extra parameters to list in the log.
   */
  consoleLog(type: ConsoleNotificationTypes, message: string, ...params) {
    if (environment.showLogs) {
      console[type](message, params);
    }
  }

  /**
   * Server call to Get several API keys from the server
   * 
   * @return { Observable<ApiKeys> }
   */
  getApiKeys$(): Observable<ApiKeys> {
    const methodTrace = `${this.constructor.name} > getApiKeys() > `; // for debugging

    return this.http.get<Response>(`${this.serverHost}/getClientApiKeys`).pipe(
      map(this.extractData),
      map((data): ApiKeys => {
        return new ApiKeys(data.mapsApiKey, data.pusher);
      })
    );
  }
}
