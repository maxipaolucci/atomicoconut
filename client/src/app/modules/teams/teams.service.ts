import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { AppService } from "../../app.service";
import { Team } from './models/team';
import { User } from '../users/models/user';
import { Observable } from 'rxjs';
import { Response } from '../../models/response';
import { of } from 'rxjs';
import { from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';


@Injectable()
export class TeamsService {

  private serverHost : string = environment.apiHost + '/api/teams';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http : HttpClient, private appService : AppService) {}

  /**
   * Server call to Create a new team in the system 
   * @param postData 
   */
  create(postData : any = {}) : Observable<any> {
    let methodTrace = `${this.constructor.name} > register() > `; //for debugging

    return this.http.post<Response>(`${this.serverHost}/create`, postData, { headers : this.headers })
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
  } 
  
  /**
   * Server call to Update a team in the system 
   * @param postData 
   */
  update(postData : any = {}) : Observable<any> {
    let methodTrace = `${this.constructor.name} > register() > `; //for debugging

    return this.http.post<Response>(`${this.serverHost}/update`, postData, { headers : this.headers })
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
  } 

  /**
   * Server call to Get a team from the server based on its slug
   * @param {string} slug . The team slug
   */
  getMyTeamBySlug(email : string, slug : string) : Observable<any> {
    let methodTrace = `${this.constructor.name} > getMyTeamBySlug() > `; //for debugging

    if (!email || !slug) {
      this.appService.consoleLog('error', `${methodTrace} Required parameters missing.`);
      return of(null);
    }

    let params = new HttpParams()
        .set('email', email)
        .set('slug', slug);

    return this.http.get<Response>(`${this.serverHost}/getMyTeamBySlug`, { params })
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
  }

  /**
   * Server call to Get all the teams for the current user from the server
   * @param {string} slug . The team slug
   */
  getTeams(email : string) : Observable<any> {
    let methodTrace = `${this.constructor.name} > getTeams() > `; //for debugging

    if (!email) {
      this.appService.consoleLog('error', `${methodTrace} Required parameters missing.`);
      return from([]);
    }

    let params = new HttpParams().set('email', email);

    const teamsData$ = this.http.get<Response>(`${this.serverHost}/getAll`, { params })
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
    
    return teamsData$.pipe(switchMap((teamsData) => {
      let teams : Team[] = [];

      if (teamsData && teamsData instanceof Array) {
        for (let item of teamsData) {
          let admin = null;
          let members = [];
          for (let member of item.members) {
            const newMember = new User(member.name, member.email, member.gravatar);
            members.push(newMember);
            if (member.isAdmin) {
              admin = newMember;
            }
          }
          teams.push(new Team(item.name, item.description || null, item.slug, admin, members));
        }
      } else {
        this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
      }

      return of(teams);
    }));
  }

  /**
   * Server call to Get all the teams for the current user from the server
   * @param {string} slug . The team slug
   * @param {string} email . The current user email.
   */
  delete(slug : string, email : string) : Observable<any> {
    let methodTrace = `${this.constructor.name} > delete() > `; //for debugging

    if (!slug || !email) {
      this.appService.consoleLog('error', `${methodTrace} Required parameters missing.`);
      return Observable.throw(null);
    }

    let params = new HttpParams().set('email', email);

    return this.http.delete<Response>(`${this.serverHost}/delete/${slug}`, {headers : this.headers, params } )
        .pipe(
          map(this.appService.extractData),
          catchError(this.appService.handleError)
        );
  }
}
