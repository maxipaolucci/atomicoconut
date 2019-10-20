import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { TeamActionTypes, RequestAll, AddAll, RequestDelete, Delete, RequestOne, AddOne, RequestUpdate, Update_, UseAndResetLastUpdatedTeamSlug, RequestCreate } from './team.actions';
import { TeamsService } from './teams.service';
import { delay, mergeMap, tap, map, withLatestFrom, filter, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Team } from './models/team';
import { allTeamsLoadedSelector } from './team.selectors';
import { State } from '../../main.reducer';
import { Store, select } from '@ngrx/store';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { SnackbarNotificationTypes } from 'src/app/constants';
import { ShowProgressBar, HideProgressBar, FinalizeOperation } from 'src/app/app.actions';

@Injectable()
export class TeamEffects {

  @Effect()
  requestAll$ = this.actions$.pipe(
    ofType<RequestAll>(TeamActionTypes.RequestAll),
    tap(({payload}) => {
      if (!payload.silently) {
        this.store.dispatch(new ShowProgressBar({ message: 'Fetching teams...' }));
      } 
    }),
    withLatestFrom(this.store.pipe(select(allTeamsLoadedSelector()))),
    filter(([{ payload }, allEntitiesLoaded]) => {
      if (!allEntitiesLoaded || payload.forceServerRequest) {
        // teams are not in the store or we want to push a fetch from the server
        return true;
      } else {
        // teams are in the store 
        this.store.dispatch(new FinalizeOperation());
        return false;
      }
    }),
    mergeMap(([{ payload }, allEntitiesLoaded]) => this.teamsService.getTeams$(payload.userEmail)
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((teams: Team[]) => {
      //dispatch the action to save the value in the store
      if (teams) {
        return new AddAll({ teams });
      }

      return new AddAll({ teams: [], serverError: true }); //avoid set allEntitiesLoaded flag to true
    }) 
  );

  @Effect({ dispatch: false })
  addAll$ = this.actions$.pipe(
    ofType<AddAll>(TeamActionTypes.AddAll),
    tap(() => {
      this.store.dispatch(new HideProgressBar());
    })
  );

  @Effect()
  requestOne$ = this.actions$.pipe(
    ofType<RequestOne>(TeamActionTypes.RequestOne),
    tap(({payload}) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Fetching team...' }));
    }),
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
      return new FinalizeOperation({ redirectData: ['/teams'] }); //we don't want to do anything in this case, stop the loadingData flag
    }) 
  );

  @Effect({ dispatch: false })
  addOne$ = this.actions$.pipe(
    ofType<AddOne>(TeamActionTypes.AddOne),
    tap(() => {
      this.store.dispatch(new HideProgressBar());
    })
  );
  
  @Effect()
  requestDelete$ = this.actions$.pipe(
    ofType<RequestDelete>(TeamActionTypes.RequestDelete),
    tap(({payload}) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Removing team...', color: 'warn' }));
    }),
    mergeMap(({ payload }) => this.teamsService.delete$(payload.slug, payload.userEmail).
      pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((data: any) => {
      if (data) {
        if (data.removed > 0) {
          this.appService.showResults(`Team "${data.team.name}" successfully removed!`, SnackbarNotificationTypes.SUCCESS);
          return new Delete({ slug: data.team.slug });
        } else {
          this.appService.showResults(`Team "${data.team.name}" could not be removed, please try again.`, SnackbarNotificationTypes.ERROR);
        } 
      }
      
      return new FinalizeOperation(); //we don't want to do anything in this case, stop the loadingData flag
    })
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType<Delete>(TeamActionTypes.Delete),
    tap(() => {
      this.store.dispatch(new HideProgressBar());
    })
  );

  @Effect()
  requestUpdate$ = this.actions$.pipe(
    ofType<RequestUpdate>(TeamActionTypes.RequestUpdate),
    tap(({payload}) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Updating team...', color: 'accent' }));
    }),
    mergeMap(({ payload }) => this.teamsService.update$(payload.model).pipe(
      map((team: Team): { team: Team, originalSlug: string } => {
        return { team, originalSlug: payload.originalSlug } 
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
      return new FinalizeOperation();
    })
  );

  @Effect({ dispatch: false })
  update$ = this.actions$.pipe(
    ofType<Update_>(TeamActionTypes.Update_),
    tap(() => {
      this.store.dispatch(new HideProgressBar());
    })
  );

  @Effect({ dispatch: false })
  useAndResetLastUpdatedTeamSlug$ = this.actions$.pipe(
    ofType<UseAndResetLastUpdatedTeamSlug>(TeamActionTypes.UseAndResetLastUpdatedTeamSlug),
    tap(({ payload }) => window.location.replace(`/teams/edit/${payload.lastUpdatedTeamSlug}`)) // redirect to new slug. We do this way because the router.navigate does not reload the component and some stuff does not work with redux store 
  )

  @Effect()
  requestCreate$ = this.actions$.pipe(
    ofType<RequestCreate>(TeamActionTypes.RequestCreate),
    tap(({payload}) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Creating team...', color: 'accent' }));
    }),
    delay(5000),
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
      return new FinalizeOperation({ redirectData: ['/teams'] }); //we don't want to do anything in this case, stop the loadingData flag
    })
  );

  constructor(
      private actions$: Actions, 
      private teamsService: TeamsService,
      private appService: AppService, 
      private store: Store<State>,
      private router: Router
  ) {}

}
