import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HideProgressBar, ShowProgressBar, FinalizeOperation } from 'src/app/app.actions';
import { PropertiesService } from './properties.service';
import { AppService } from 'src/app/app.service';
import { State } from '../../main.reducer';
import { Store, select } from '@ngrx/store';
import { RequestAll, PropertyActionTypes, AddAll } from './property.actions';
import { delay, mergeMap, tap, map, withLatestFrom, filter, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Property } from './models/property';


@Injectable()
export class PropertyEffects {

  @Effect()
  requestAll$ = this.actions$.pipe(
    ofType<RequestAll>(PropertyActionTypes.RequestAll),
    tap(({payload}) => {
      if (!payload.silently) {
        this.store.dispatch(new ShowProgressBar({ message: 'Fetching properties...' }));
      } 
    }),
    withLatestFrom(this.store.pipe(select(allEntitiesLoadedSelector()))),
    filter(([{ payload }, allEntitiesLoaded]) => {
      if (!allEntitiesLoaded || payload.forceServerRequest) {
        // properties are not in the store or we want to push a fetch from the server
        return true;
      } else {
        // properties are in the store 
        this.store.dispatch(new FinalizeOperation());
        return false;
      }
    }),
    mergeMap(([{ payload }, allEntitiesLoaded]) => this.propertiesService.getProperties$(payload.userEmail)
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((properties: Property[]) => {
      //dispatch the action to save the value in the store
      if (properties) {
        return new AddAll({ properties });
      }

      return new AddAll({ properties: [], serverError: true }); //avoid set allEntitiesLoaded flag to true
    }) 
  );

  @Effect({ dispatch: false })
  addAll$ = this.actions$.pipe(
    ofType<AddAll>(PropertyActionTypes.AddAll),
    tap(() => {
      this.store.dispatch(new HideProgressBar());
    })
  );

  constructor(
    private actions$: Actions,
    private appService: AppService, 
    private store: Store<State>,
    private propertiesService: PropertiesService
  ) {}

}
