import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { combineLatest, tap, filter, first, map } from 'rxjs/operators';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../users/models/user';
import { UsersService } from '../users/users.service';
import { AppService } from '../../app.service';
import { MatDialog } from '@angular/material';
import { ProgressBarDialogComponent } from '../shared/components/progress-bar-dialog/progress-bar-dialog.component';
import { AppState } from '../../reducers';
import { Store, select } from '@ngrx/store';
import { Team } from './models/team';
import { RequestTeams } from './team.actions';
import { teamsSelector, allTeamsLoaded } from './team.selectors';


@Injectable()
export class TeamsResolver implements Resolve<any> {

  constructor(
      private appService: AppService, 
      private usersService: UsersService, 
      public dialog: MatDialog,
      private router: Router,
      private store: Store<AppState>) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Team[] | Observable<Team[]> {
    const methodTrace = `${this.constructor.name} > resolve() > `; // for debugging  
    
    //this.openProgressBarDialog();

    const user: User = this.usersService.getUser(); //thanks to auth guard I know there is a user logged in
    return this.store.pipe(
      select(teamsSelector()),
      combineLatest(this.store.select(allTeamsLoaded()), (teams: Team[], isInitialState: boolean) => {
        return { isInitialState, teams };
      }),
      tap(data => {
        if (!data.teams.length && data.isInitialState) {
          // the initial state assigned from the ngrx adapter is [], so in this case we are not sure if it is 
          // empty due that it was never loaded before or because the user has not got any teams so lets fetch it
          // Anyway this is going to happen every time the user access the teams dashboard with no teams
          this.store.dispatch(new RequestTeams({ userEmail: user.email, forceServerRequest: true }))
        }
      }),
      filter(data => !(!data.teams.length && data.isInitialState) ), //if the teams is undefined then filter this element, and wait the dispatched request event
      map(data => data.teams), // extract the teams
      // tap((teams: Team[]) => {
      //   if (!teams || !teams.length) { 
      //     // the initial state assigned from the ngrx adapter is [], so in this case we are not sure if it is 
      //     // empty due that it was never loaded before or because the user has not got any teams so lets fetch it
      //     // Anyway this is going to happen every time the user access the teams dashboard with no teams
      //     this.store.dispatch(new RequestTeams({ userEmail: user.email }))
      //   }
      // }),
      // filter((teams: Team[]) => teams && teams.length ), //if the teams is undefined then filter this element, and wait the dispatched request event
      first()

      // first((teams: Team[]) => {
      //   this.dialog.closeAll();
      //   return true;
      // }) //to ensure the method observable completes
    );
  }

  openProgressBarDialog() {
    const methodTrace = `${this.constructor.name} > openProgressBarDialog() > `; // for debugging
    
    this.dialog.open(ProgressBarDialogComponent, {
      width: '250px',
      disableClose: true,
      data: {
        color : 'primary', 
        message : `Loading teams...`,
        extraClasses: 'pepe-class' 
      }
    });

    return false;
  }
  
}
