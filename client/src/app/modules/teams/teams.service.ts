import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { Team } from './models/team';
import { User } from '../users/models/user';
import { Observable } from 'rxjs';
import { Response } from '../../models/response';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { TeamEditModel } from './models/team-edit-model';
import { ConsoleNotificationTypes } from 'src/app/constants';


@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private serverHost: string = environment.apiHost + '/api/teams';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private appService: AppService) {}

  /**
   * Server call to Create a new team in the system 
   * @param postData 
   * 
   * @return { Observable<Team> }
   */
  create$(postData: any = {}): Observable<Team> {
    const methodTrace = `${this.constructor.name} > create$() > `; // for debugging

    return this.http.post<Response>(`${this.serverHost}/create`, postData, { headers : this.headers }).pipe(
      map(this.appService.extractData),
      mergeMap((data: any): Observable<Team> => {
        return of(this.populate(data));
      })
    );
  } 
  
  /**
   * Server call to Update a team in the system 
   * @param { TeamEditModel } postData
   * 
   * @return { Observable<Team> } 
   */
  update$(postData: TeamEditModel): Observable<Team> {
    const methodTrace = `${this.constructor.name} > update$() > `; // for debugging

    // //to prevent receiving notification of actions performed by current user
    // postData.pusherSocketID = this.appService.pusherSocketID;

    return this.http.post<Response>(`${this.serverHost}/update`, postData, { headers : this.headers }).pipe(
      map(this.appService.extractData),
      mergeMap((data: any): Observable<Team> => { //guess I don't need a mergeMap for this, it could be simply a map returning a Team object
        if (data && data.team && data.team.slug) {
          const messages: any[] = [
            {
              message : `Team "${data.team.name}" successfully updated!`,
              type : 'success'
            }
          ];

          if (data.usersNotRegistered.length) {
            // handle not registered users
            const message = {
              message : `The following emails added to the team are not registered users in AtomiCoconut: `,
              duration : 8000
            };
            
            for (const email of data.usersNotRegistered) {
              message.message += `"${email}", `;
            }

            message.message = message.message.slice(0, -2); // remove last comma char
            message.message += '. We sent them an email to create an account. Once they do it try to add them again.';

            messages.push(message);
          }

          this.appService.showManyResults(messages);
          return of(this.populate(data.team));
        } else {
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
        }

        return of(null);
      })
    );
  }

  /**
   * Server call to Get a team from the server based on its slug
   * @param {string} slug . The team slug
   * 
   * @return { Observable<Team> }
   */
  getMyTeamBySlug$(email: string, slug: string): Observable<Team> {
    const methodTrace = `${this.constructor.name} > getMyTeamBySlug$() > `; // for debugging

    if (!email || !slug) {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Required parameters missing.`);
      return of(null);
    }

    const params = new HttpParams()
        .set('email', email)
        .set('slug', slug);

    return this.http.get<Response>(`${this.serverHost}/getMyTeamBySlug`, { params }).pipe(
      map(this.appService.extractData),
      mergeMap((data: any): Observable<Team> => {
        return of(this.populate(data));
      })
    );
  }

  /**
   * Server call to Get all the teams for the current user from the server
   * @param {string} slug . The team slug
   * 
   * @return { Observable<Team[]> }
   */
  getTeams$(email: string): Observable<Team[]> {
    const methodTrace = `${this.constructor.name} > getTeams$() > `; // for debugging

    if (!email) {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Required parameters missing.`);
      return of([]);
    }

    const params = new HttpParams().set('email', email);

    return this.http.get<Response>(`${this.serverHost}/getAll`, { params }).pipe(
      map(this.appService.extractData),
      mergeMap((teamsData): Observable<Team[]> => {
        const teams: Team[] = [];

        if (teamsData && teamsData instanceof Array) {
          for (const item of teamsData) {
            teams.push(this.populate(item));
          }
        } else {
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
        }

        return of(teams);
      })
    );
  }

  /**
   * Populates a team from an object from server
   * @param { any } teamData
   * 
   * @return { Team } 
   */
  populate(teamData: any): Team {
    const methodTrace = `${this.constructor.name} > populate() > `; // for debugging

    if (teamData && teamData.slug) {
      // populate admin
      const admin = new User(teamData.admin.name, teamData.admin.email, teamData.admin.gravatar);
      // populate members
      const members = [];
      for (const member of teamData.members) {
        const newMember = new User(member.name, member.email, member.gravatar);
        members.push(newMember);
      }
      // create team
      return new Team(teamData.name, teamData.description || null, teamData.slug, admin, members);
    } else {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
    }

    return null;
  }

  /**
   * Server call to Get all the teams for the current user from the server
   * @param {string} slug . The team slug
   * @param {string} email . The current user email.
   * 
   * @return { Observable<any> }
   */
  delete$(slug: string, email: string): Observable<any> {
    const methodTrace = `${this.constructor.name} > delete$() > `; // for debugging

    if (!slug || !email) {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Required parameters missing.`);
      return Observable.throw(null);
    }

    const params = new HttpParams()
        .set('email', email)
        .set('pusherSocketID', this.appService.pusherSocketID);

    return this.http.delete<Response>(`${this.serverHost}/delete/${slug}`, {headers : this.headers, params } )
        .pipe(
          map(this.appService.extractData)
        );
  }
}
