import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AppService } from './app.service';
import { Observable, of } from 'rxjs';
import { retry, catchError, mergeMap } from 'rxjs/operators';
import { SnackbarNotificationTypes, ConsoleNotificationTypes, RoutingPaths } from './constants';
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { RequestLogout } from './modules/users/user.actions';
import { apiSecurityTokenSelector } from './modules/users/user.selectors';
 
 @Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private apiToken: string = null;

  constructor(
      private appService: AppService, 
      private store: Store<State>) {
    
    this.store.select(apiSecurityTokenSelector()).subscribe((token: string) => this.apiToken = token);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const methodTrace = `${this.constructor.name} > intercept() > `; // for debugging

    return of(this.apiToken).pipe(
      mergeMap((token: string) => {

        //add security token to request 
        let secureRequest = request.clone();
        if (token) {
          secureRequest = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
        }

        //send request
        return next.handle(secureRequest).pipe(
          retry(1),
          catchError((result: HttpErrorResponse, caught: Observable<any>) => {
            this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} There was an error in the server while performing a request to ${secureRequest.url}${result.message ? `: ${result.message}.` : '.'}`, result);
            switch(result.error.codeno) { 
              case 401: { 
                // JWT token invalid or expired
                if (result.error.code === 'invalid_token') {
                  this.appService.showResults('User session expired, please login again.', SnackbarNotificationTypes.ERROR);
                  this.store.dispatch(new RequestLogout({ redirectUrl: `${RoutingPaths.USERS}/login` }));
                } else {
                  this.appService.showResults(result.error.msg, SnackbarNotificationTypes.ERROR);
                }
                break; 
              } 
              
              case 453: {
                // User session expired (this is the expressJS session)
                this.appService.showResults(result.error.msg, SnackbarNotificationTypes.ERROR);
                this.store.dispatch(new RequestLogout({ redirectUrl: `${RoutingPaths.USERS}/login` }));
                break;
              }

              case 471: { 
                this.appService.showResults(result.error.msg, SnackbarNotificationTypes.ERROR, 7000);
                break; 
              }

              default: { 
                // default message
                let message = `There was an error in the server while performing a request to ${secureRequest.url}. Check your internet connection and try again...`;
                
                if (result.error.msg) {
                  // custom message if exists
                  message = result.error.msg;
                }
                
                this.appService.showResults(message || '', SnackbarNotificationTypes.ERROR, 10000);
                break; 
              } 
            }
            
            throw null; //to the next catchError
          })
        );
      })
    );
  }
 }