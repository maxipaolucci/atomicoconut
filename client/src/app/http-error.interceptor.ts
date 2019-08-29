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
 import { retry, catchError, map } from 'rxjs/operators';
 
 export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private appService: AppService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const methodTrace = `${this.constructor.name} > intercept() > `; // for debugging

    return next.handle(request)
      .pipe(
        retry(1),
        catchError((result: HttpErrorResponse, caught: Observable<any>) => { 
          this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing a request to: ${request.url}`, result.error);
          if (result.error.codeno === 471) {
            this.appService.showResults(result.error.msg, 'error', 7000);
          } else {
            this.appService.showResults(`There was an error in the server while performing a request to [${request.url}], please try again in a few minutes.`, 'error');  
          }
          
          throw null; //to the next catchError
        })
      );
  }
 }