import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TeamActionTypes, RequestAll, AddAll, RequestDelete, Delete, CancelRequest, RequestOne, AddOne } from './team.actions';
import { TeamsService } from './teams.service';
import { mergeMap, map, withLatestFrom, filter, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Team } from './models/team';
import { allTeamsLoadedSelector } from './team.selectors';
import { AppState } from '../../reducers';
import { Store, select } from '@ngrx/store';
import { AppService } from 'src/app/app.service';

@Injectable()
export class TeamEffects {

  @Effect()
  addAll$ = this.actions$.pipe(
    ofType<RequestAll>(TeamActionTypes.RequestAll),
    withLatestFrom(this.store.pipe(select(allTeamsLoadedSelector()))),
    filter(([{ payload }, allTeamsLoaded]) => {
      if (!allTeamsLoaded || payload.forceServerRequest) {
        // teams are not in the store or we want to push a fetch from the server
        return true;
      } else {
        // teams are in the store 
        this.store.dispatch(new CancelRequest());
        return false;
      }
    }),
    mergeMap(([{ payload }, allTeamsLoaded]) => this.teamsService.getTeams$(payload.userEmail)
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((teams: Team[]) => {
      //dispatch the action to save the value in the store
      if (teams) {
        return new AddAll({ teams });
      }

      return new AddAll({ teams: [], serverError: true }); //avoid set allTeamsLoaded flag to true
    }) 
  );

  @Effect()
  addOne$ = this.actions$.pipe(
    ofType<RequestOne>(TeamActionTypes.RequestOne),
    mergeMap(({ payload }) => this.teamsService.getMyTeamBySlug$(payload.userEmail, payload.slug)
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((team: Team) => {
      if (team) {
        //dispatch the action to save the value in the store
        return new AddOne({ team });
      }

      // if here, means http error in the request. 
      return new CancelRequest(); //we don't want to do anything in this case, stop the loadingData flag
    }) 
  );
  
  @Effect()
  delete$ = this.actions$.pipe(
    ofType<RequestDelete>(TeamActionTypes.RequestDelete),
    mergeMap(({ payload }) => this.teamsService.delete$(payload.slug, payload.userEmail).
      pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((data: any) => {
      if (data) {
        if (data.removed > 0) {
          this.appService.showResults(`Team "${data.team.name}" successfully removed!`, 'success');
          return new Delete({ slug: data.team.slug });
        } else {
          this.appService.showResults(`Team "${data.team.name}" could not be removed, please try again.`, 'error');
        } 
      }
      
      return new CancelRequest(); //we don't want to do anything in this case, stop the loadingData flag
    })
  );

  constructor(
      private actions$: Actions, 
      private teamsService: TeamsService,
      private appService: AppService, 
      private store: Store<AppState>
  ) {}

}
