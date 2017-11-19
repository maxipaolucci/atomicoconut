import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from "rxjs/Rx";
import { MatSnackBar } from '@angular/material';
import { environment } from '../environments/environment';
import { SnackbarSimpleComponent } from './modules/shared/components/snackbar-simple/snackbar-simple.component';

@Injectable()
export class AppService {

  constructor(private http : Http, public snackBar: MatSnackBar) {}

  /**
   * Receives and object of paramameters and returns it in a querystring format
   * @param {*} parameters . Object of parameters
   * @return {string} result as querystring
   */
  public getParamsAsQuerystring(parameters : any = null) {
    let strParams = '';
    if (parameters && Object.keys(parameters).length) {
      for (let key of Object.keys(parameters)) {
        strParams += `&${key}=${parameters[key]}`;
      }
    }

    return strParams.substring(1);
  }

  /**
   * Extract data from a server response
   * @param res
   */
  public extractData(res: Response) : any {
    let body = res.json();

    if (body.codeno === 200 && body.status === 'success') {
      return body.data;
    } else {
      throw body;
    }
  }

  /**
   * Handle server service errors and parse the result in an object
   * @param error 
   */
  public handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errObj: any = {};
    if (error instanceof Response) {
      errObj = error.json() || {};
    } else {
      errObj = error || {};
    }
    
    return Observable.throw(errObj);
  }

  /**
   * Shows messages in snackbar component
   * @param message . The text to show
   * @param duration . The duration in milliseconds . Optional
   * @param actionName . An action name to close the message on click. Optional
   */
  showResults(message : string, type : string = 'info', duration : number = 5000) {
    let snackBarRef = this.snackBar.openFromComponent(SnackbarSimpleComponent, {
      data : {
        type,
        message
      },
      duration,
      extraClasses : ['snackbar--simple', `snackbar--${type}`]
    });
  }

  /**
   * Show logs in the console if enabled in the current environment
   * @param type . Error type
   * @param message . The message to show
   * @param params . Any extra parameters to list in the log.
   */
  consoleLog(type : 'log' | 'debug' | 'warn' | 'info' | 'error', message : string, ...params) {
    if (environment.showLogs) {
      console[type](message, params);
    }
  }
}
