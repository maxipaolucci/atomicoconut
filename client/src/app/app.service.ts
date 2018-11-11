import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { environment } from '../environments/environment';
import { SnackbarSimpleComponent } from './modules/shared/components/snackbar-simple/snackbar-simple.component';
import { Response } from './models/response';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable()
export class AppService {

  constructor(public snackBar: MatSnackBar) {}

  /**
   * Extract data from a server response
   * @param res
   */
  public extractData(res: Response): any {
    if (res.codeno === 200 && res.status === 'success') {
      return res.data;
    } else {
      throw res;
    }
  }

  /**
   * Handle server service errors and parse the result in an object
   * @param operation (string). The operation performed
   * @param result (T). Optional, a result to handle the fail. 
   */
  public handleError(result: HttpErrorResponse) {
    console.error(result);
    return throwError(result.error);
  }

  /**
   * Shows messages in snackbar component
   * @param message . The text to show
   * @param duration . The duration in milliseconds . Optional
   * @param actionName . An action name to close the message on click. Optional
   * 
   * @return {MatSnackBar} . The snackbar ref
   */
  showResults(message: string, type: string = 'info', duration: number = 5000): any {
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
   * @param type . Error type
   * @param message . The message to show
   * @param params . Any extra parameters to list in the log.
   */
  consoleLog(type: 'log' | 'debug' | 'warn' | 'info' | 'error', message: string, ...params) {
    if (environment.showLogs) {
      console[type](message, params);
    }
  }
}
