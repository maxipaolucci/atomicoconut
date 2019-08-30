import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TeamActionTypes, RequestTeams, LoadTeams, RequestDeleteTeam, DeleteTeam, CancelRequest } from './team.actions';
import { TeamsService } from './teams.service';
import { mergeMap, map, withLatestFrom, filter, catchError, partition } from 'rxjs/operators';
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
    filter(([{ payload }, allTeamsLoaded]) => {
      if (!allTeamsLoaded || payload.forceServerRequest) {
        // teams are not in the store or we want to push a fetch from the server
        return true;
      } else {
        // teams are in the store 
        this.store.dispatch(new CancelRequest);
        return false;
      }
    }), //filter action if teams are loaded
    mergeMap(([{ payload }, allTeamsLoaded]) => this.teamsService.getTeams$(payload.userEmail)),
    map((teams: Team[]) => new LoadTeams({ teams })) //dispatch the action to save the value in the store
  );

  @Effect()
  deleteTeam$ = this.actions$.pipe(
    ofType<RequestDeleteTeam>(TeamActionTypes.RequestDeleteTeam),
    mergeMap(({ payload }) => this.teamsService.delete$(payload.slug, payload.userEmail).
      pipe(
        catchError(err => of(null))
      )
    ),
    map((data: any) => {
      if (data) {
        if (data.removed > 0) {
          this.appService.showResults(`Team "${data.team.name}" successfully removed!`, 'success');
          return new DeleteTeam({ slug: data.team.slug });
        } else {
          this.appService.showResults(`Team "${data.team.name}" could not be removed, please try again.`, 'error');
        } 
      }
      
      return new CancelRequest(); //we don't want to remove anything in this case
    })
  );

  constructor(
      private actions$: Actions, 
      private teamsService: TeamsService,
      private appService: AppService, 
      private store: Store<AppState>
  ) {}

}
