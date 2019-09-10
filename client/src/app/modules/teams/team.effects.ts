import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { TeamActionTypes, RequestAll, AddAll, RequestDelete, Delete, CancelRequest, RequestOne, AddOne, RequestUpdate, Update_, UseAndResetLastUpdatedTeamSlug, RequestCreate } from './team.actions';
import { TeamsService } from './teams.service';
import { mergeMap, tap, map, withLatestFrom, filter, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Team } from './models/team';
import { allTeamsLoadedSelector } from './team.selectors';
import { AppState } from '../../reducers';
import { Store, select } from '@ngrx/store';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

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
        this.store.dispatch(new CancelRequest(null));
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

      // if here, means http error in the response. 
      return new CancelRequest({ redirectData: ['/teams'] }); //we don't want to do anything in this case, stop the loadingData flag
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
      
      return new CancelRequest(null); //we don't want to do anything in this case, stop the loadingData flag
    })
  );

  @Effect()
  requestUpdate$ = this.actions$.pipe(
    ofType<RequestUpdate>(TeamActionTypes.RequestUpdate),
    mergeMap(({ payload }) => this.teamsService.update$(payload.model).pipe(
      mergeMap((team: Team) => {
        return of({ team, originalSlug: payload.originalSlug } ) 
      }),
      catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
    )),
    map((data: { team: Team, originalSlug: string }) => {
      if (data.team) {
        const teamChanges: Update<Team> = {
          id: data.originalSlug,
          changes: data.team
        }
        return new Update_({ teamChanges });
      }
      return new CancelRequest(null);
    })
  );

  @Effect()
  requestCreate$ = this.actions$.pipe(
    ofType<RequestCreate>(TeamActionTypes.RequestCreate),
    mergeMap(({ payload }) => this.teamsService.create$(payload.model).pipe(
      catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
    )),
    map((team: Team) => {
      if (team) {
        this.router.navigate(['/teams/edit', team.slug]);
        //dispatch the action to save the value in the store
        return new AddOne({ team });
      }

      // if here, means http error in the response. 
      return new CancelRequest({ redirectData: ['/teams'] }); //we don't want to do anything in this case, stop the loadingData flag
    })
  );

  @Effect({ dispatch: false })
  UseAndResetLastUpdatedTeamSlug$ = this.actions$.pipe(
    ofType<UseAndResetLastUpdatedTeamSlug>(TeamActionTypes.UseAndResetLastUpdatedTeamSlug),
    tap(({ payload }) => window.location.replace(`/teams/edit/${payload.lastUpdatedTeamSlug}`)) // redirect to new slug. We do this way because the router.navigate does not reload the component and some stuff does not work with redux store 
  )
  
  @Effect({ dispatch: false })
  cancelRequest$ = this.actions$.pipe(
    ofType<CancelRequest>(TeamActionTypes.CancelRequest),
    tap(({ payload }) => {
      if (payload && payload.redirectData && payload.redirectData.length) {
        return this.router.navigate(payload.redirectData);
      }

      return; // do nothing here
    }) // redirect to new slug)
    // tap(({ payload }) => this.router.navigate(['/teams/edit', payload.lastUpdatedTeamSlug])) // redirect to new slug)
  )

  constructor(
      private actions$: Actions, 
      private teamsService: TeamsService,
      private appService: AppService, 
      private store: Store<AppState>,
      private router: Router
  ) {}

}
