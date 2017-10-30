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

  /**
   * Server call to Get a team from the server based on its slug
   * @param {string} slug . The team slug
   */
  getTeamBySlug(email : string, slug : string) : Observable<any> {
    let methodTrace = `${this.constructor.name} > getTeamBySlug() > `; //for debugging

    if (!slug) {
      this.appService.consoleLog('error', `${methodTrace} Slug parameter must be provided, but was: `, slug);
      return null;
    }

    return this.http.get(`${this.serverHost}/getbySlug?${this.appService.getParamsAsQuerystring({slug, email})}`)
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }

  /**
   * Server call to Get all the teams for the current user from the server
   * @param {string} slug . The team slug
   */
  getTeams(email : string) : Observable<any> {
    let methodTrace = `${this.constructor.name} > getTeams() > `; //for debugging

    return this.http.get(`${this.serverHost}/getAll?${this.appService.getParamsAsQuerystring({email})}`)
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }
}
