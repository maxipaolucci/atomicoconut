import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpParams } from '@angular/common/http';

import {Observable} from "rxjs/Rx";
import {environment} from "../../../environments/environment";
import {AppService} from "../../app.service";


@Injectable()
export class TeamsService {

  private serverHost : string = environment.apiHost + '/api/teams';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http : Http, private appService : AppService) {}

  /**
   * Server call to Create a new team in the system 
   * @param postData 
   */
  create(postData : any = {}) : Observable<any> {
    return this.http.post(`${this.serverHost}/create`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }  

}
