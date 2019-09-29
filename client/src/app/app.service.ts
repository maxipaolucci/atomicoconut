import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { environment } from '../environments/environment';
import { SnackbarSimpleComponent } from './modules/shared/components/snackbar-simple/snackbar-simple.component';
import { Response } from './models/response';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  pusher: any;
  pusherChannel: any;
  pusherSocketID: any;

  constructor(public snackBar: MatSnackBar) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    
    this.pusher.connection.bind('connected', () => {
      // we'll use this id to prevent the executor of the action to receive a notification
      this.pusherSocketID = this.pusher.connection.socket_id;
    });
    
    //start listening to the same channel where the server is emiting msgs
    this.pusherChannel = this.pusher.subscribe(environment.pusher.channel);
  }

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
