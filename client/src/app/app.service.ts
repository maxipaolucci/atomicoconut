import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from "rxjs/Rx";
import { MdSnackBar } from '@angular/material';

@Injectable()
export class AppService {

  constructor(private http : Http, public snackBar: MdSnackBar) {}

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
  showResults(message : string, duration : number = 5000, actionName : string = '') {
    let snackBarRef = this.snackBar.open(message, actionName ? actionName : null, {
      duration,
      extraClasses: ['snack-bar--simple']
    });

    snackBarRef.onAction().subscribe(() => {
      if (snackBarRef.instance.action === 'Close') {
        snackBarRef.dismiss();
      }
    });
  }
}
