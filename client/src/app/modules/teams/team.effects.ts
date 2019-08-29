import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TeamActionTypes, RequestTeams, LoadTeams, RequestDeleteTeam, DeleteTeam, DoNone } from './team.actions';
import { TeamsService } from './teams.service';
import { mergeMap, map, withLatestFrom, filter, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Team } from './models/team';
import { allTeamsLoaded } from './team.selectors';
import { AppState } from '../../reducers';
import { Store, select } from '@ngrx/store';
import { AppService } from 'src/app/app.service';

@Injectable()
export class TeamEffects {

  @Effect()
  loadTeams$ = this.actions$.pipe(
    ofType<RequestTeams>(TeamActionTypes.RequestTeams),
    withLatestFrom(this.store.pipe(select(allTeamsLoaded()))),
    filter(([action, allTeamsLoaded]) => !allTeamsLoaded || action.payload.forceServerRequest), //filter action if teams are loaded
    mergeMap(([action, allTeamsLoaded]) => this.teamsService.getTeams$(action.payload.userEmail)),
    map((teams: Team[]) => new LoadTeams({ teams })) //dispatch the action to save the value in the store
  );

  @Effect()
  deleteTeam$ = this.actions$.pipe(
    ofType<RequestDeleteTeam>(TeamActionTypes.RequestDeleteTeam),
    mergeMap(action => this.teamsService.delete$(action.payload.slug, action.payload.userEmail)),
    map((data: any) => {
      if (data && data.removed > 0) {
        this.appService.showResults(`Team "${data.team.name}" successfully removed!`, 'success');
        return new DeleteTeam({ slug: data.team.slug });
      } else {
        this.appService.showResults(`Team "${data.team.name}" could not be removed, please try again.`, 'error');
        return new DoNone(); //we don't want to remove anything in this case
      }
    }),
    catchError(err => of(new DoNone()))
  );

  constructor(
      private actions$: Actions, 
      private teamsService: TeamsService,
      private appService: AppService, 
      private store: Store<AppState>
  ) {}

}
