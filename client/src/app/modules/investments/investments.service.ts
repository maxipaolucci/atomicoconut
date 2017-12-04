import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { environment } from "../../../environments/environment";
import { AppService } from "../../app.service";
import { Team } from '../teams/models/team';
import { User } from '../users/models/user';


@Injectable()
export class InvestmentsService {

  private serverHost : string = environment.apiHost + '/api/investments';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http : Http, private appService : AppService) {}

  /**
   * Server call to Create a new investment in the system 
   * @param postData 
   */
  create(postData : any = {}) : Observable<any> {
    return this.http.post(`${this.serverHost}/create`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  } 
  
  /**
   * Server call to Update an investment in the system 
   * @param postData 
   */
  update(postData : any = {}) : Observable<any> {
    return this.http.post(`${this.serverHost}/update`, postData, { headers : this.headers })
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  } 

  // /**
  //  * Server call to Get a team from the server based on its slug
  //  * @param {string} slug . The team slug
  //  */
  // getTeamBySlug(email : string, slug : string) : Observable<any> {
  //   let methodTrace = `${this.constructor.name} > getTeamBySlug() > `; //for debugging

  //   if (!slug) {
  //     this.appService.consoleLog('error', `${methodTrace} Slug parameter must be provided, but was: `, slug);
  //     return null;
  //   }

  //   return this.http.get(`${this.serverHost}/getbySlug?${this.appService.getParamsAsQuerystring({slug, email})}`)
  //       .map(this.appService.extractData)
  //       .catch(this.appService.handleError);
  // }

  // /**
  //  * Server call to Get all the teams for the current user from the server
  //  * @param {string} slug . The team slug
  //  */
  // getTeams(email : string) : Observable<any> {
  //   let methodTrace = `${this.constructor.name} > getTeams() > `; //for debugging

  //   const teamsData$ = this.http.get(`${this.serverHost}/getAll?${this.appService.getParamsAsQuerystring({email})}`)
  //       .map(this.appService.extractData)
  //       .catch(this.appService.handleError);
    
  //   return teamsData$.switchMap((teamsData) => {
  //     let teams : Team[] = [];

  //     if (teamsData && teamsData instanceof Array) {
  //       for (let item of teamsData) {
  //         let admin = null;
  //         let members = [];
  //         for (let member of item.members) {
  //           const newMember = new User(member.name, member.email, member.gravatar);
  //           members.push(newMember);
  //           if (member.isAdmin) {
  //             admin = newMember;
  //           }
  //         }
  //         teams.push(new Team(item.name, item.description || null, item.slug, admin, members));
  //       }
  //     } else {
  //       this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
  //     }

  //     return Observable.of(teams);
  //   });
  // }

  /**
   * Server call to delete an investment from the server
   * @param {string} id . The team slug
   * @param {string} email . The current user email.
   */
  delete(id : string, email : string) : Observable<any> {
    let methodTrace = `${this.constructor.name} > delete() > `; //for debugging

    return this.http.delete(`${this.serverHost}/delete/${id}`, {headers : this.headers, body : { email } } )
        .map(this.appService.extractData)
        .catch(this.appService.handleError);
  }
}
