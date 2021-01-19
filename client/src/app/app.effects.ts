import { Injectable } from '@angular/core';
import { AddApiKeys, AppActionTypes, FinalizeOperation, RequestApiKeys, SetIsOnline, ShowProgressBar } from './app.actions';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap, switchMap, mapTo, map, mergeMap, catchError } from 'rxjs/operators';
import { merge, of, fromEvent } from "rxjs";
import { State } from 'src/app/main.reducer';
import { Store } from '@ngrx/store';
import { HideProgressBar } from 'src/app/app.actions';
import { Logout, UserActionTypes } from './modules/users/user.actions';
import { SetLinks } from './modules/shared/components/main-navigator/main-navigator.actions';
import { RoutingPaths } from 'src/app/constants';
import { AppService } from './app.service';
import { ApiKeys } from './models/api-keys';


@Injectable()
export class AppEffects {

  @Effect({ dispatch: false })
  finalizeOperation$ = this.actions$.pipe(
    ofType<FinalizeOperation>(AppActionTypes.FinalizeOperation),
    tap(({ payload }) => {
      this.store.dispatch(new HideProgressBar());
      if (payload && payload.redirectData && payload.redirectData.length) {
        return this.router.navigate(payload.redirectData);
      }

      return; // do nothing here
    })
  )

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(UserActionTypes.Logout),
    tap(() => {
      // we do this because the logout action previously reseted the global app state making it 
      // re-initilize and leaving the navigator empty. So this side effect repopulates the navigator with 
      // the welcome componennt options where we are going to be redirected
      this.store.dispatch(new SetLinks({ links: [
        { displayName: 'Welcome', url: null, selected: true },
        { displayName: 'Investments', url: RoutingPaths.INVESTMENTS, selected: false },
        { displayName: 'Properties', url: RoutingPaths.PROPERTIES, selected: false },
        { displayName: 'Calculators', url: RoutingPaths.CALCULATORS, selected: false }
      ]}));
    })
  );

  @Effect()
  startOnlineOfflineCheck$ = this.actions$.pipe(
    ofType(AppActionTypes.StartOnlineOfflineCheck),
    switchMap(() => {
      // for something more sophisticated check some libraries like: 
      // https://www.npmjs.com/package/ng-connection-service in  https://medium.com/@balramchavan/detecting-internet-connection-status-in-angular-application-ng-connection-service-1fa8add3b975 or
      // https://www.npmjs.com/package/@ngx-pwa/offline
      return merge(
        of(navigator.onLine),
        fromEvent(window, "online").pipe(mapTo(true)),
        fromEvent(window, "offline").pipe(mapTo(false))
      );
    }),
    map(isOnline => {
      return new SetIsOnline(isOnline);
    })
  );

  @Effect()
  requestApiKeys$ = this.actions$.pipe(
    ofType<RequestApiKeys>(AppActionTypes.RequestApiKeys),
    tap(() => {
      this.store.dispatch(new ShowProgressBar({ message: 'Fetching API Keys...' }));
    }),
    mergeMap(() => this.appService.getApiKeys$()
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((apiKeys: ApiKeys) => {
      if (apiKeys) {
        //dispatch the action to save the value in the store
        return new AddApiKeys({ apiKeys });
      }

      // if here, means http error in the response. 
      return new FinalizeOperation(); //we don't want to do anything in this case, stop the loadingData flag
    }) 
  );

  @Effect({ dispatch: false })
  addApiKeys$ = this.actions$.pipe(
    ofType<AddApiKeys>(AppActionTypes.AddApiKeys),
    tap(() => {
      this.store.dispatch(new HideProgressBar());
    })
  );

  constructor(
    private actions$: Actions, 
    private router: Router,
    private store: Store<State>,
    private appService: AppService, 
  ) {}

}
