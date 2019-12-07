import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HideProgressBar, ShowProgressBar, FinalizeOperation } from 'src/app/app.actions';
import { PropertiesService } from './properties.service';
import { AppService } from 'src/app/app.service';
import { State } from '../../main.reducer';
import { Store, select } from '@ngrx/store';
import { RequestAll, PropertyActionTypes, AddAll, RequestDelete, Delete, RequestOne, AddOne, RequestUpdate, Update_, RequestCreate } from './property.actions';
import { delay, mergeMap, tap, map, withLatestFrom, filter, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Property } from './models/property';
import { allPropertiesLoadedSelector } from './property.selectors';
import { SnackbarNotificationTypes } from 'src/app/constants';
import { Update } from '@ngrx/entity';
import { Router } from '@angular/router';


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
    withLatestFrom(this.store.pipe(select(allPropertiesLoadedSelector()))),
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
    // delay(4000),
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

  @Effect()
  requestDelete$ = this.actions$.pipe(
    ofType<RequestDelete>(PropertyActionTypes.RequestDelete),
    tap(({payload}) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Removing property...', color: 'warn' }));
    }),
    // delay(4000),
    mergeMap(({ payload }) => this.propertiesService.delete$(payload.id, payload.userEmail).
      pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((data: any) => {
      if (data) {
        if (data.removed > 0) {
          this.appService.showResults(`Property successfully removed!`, SnackbarNotificationTypes.SUCCESS);
          return new Delete({ id: data.property._id });
        } else {
          this.appService.showResults(`Property could not be removed, please try again.`, SnackbarNotificationTypes.ERROR);
        } 
      }
      
      return new FinalizeOperation(); //we don't want to do anything in this case, stop the loadingData flag
    })
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType<Delete>(PropertyActionTypes.Delete),
    tap(() => {
      this.store.dispatch(new HideProgressBar());
    })
  );

  @Effect()
  requestOne$ = this.actions$.pipe(
    ofType<RequestOne>(PropertyActionTypes.RequestOne),
    tap(({payload}) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Fetching property...' }));
    }),
    mergeMap(({ payload }) => this.propertiesService.getPropertyById$(payload.userEmail, payload.id)
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((property: Property) => {
      if (property) {
        //dispatch the action to save the value in the store
        return new AddOne({ property });
      }

      // if here, means http error in the response. 
      return new FinalizeOperation({ redirectData: ['/properties'] }); //we don't want to do anything in this case, stop the loadingData flag
    }) 
  );

  @Effect({ dispatch: false })
  addOne$ = this.actions$.pipe(
    ofType<AddOne>(PropertyActionTypes.AddOne),
    tap(() => {
      this.store.dispatch(new HideProgressBar());
    })
  );
  
  @Effect()
  requestUpdate$ = this.actions$.pipe(
    ofType<RequestUpdate>(PropertyActionTypes.RequestUpdate),
    tap(({payload}) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Updating property...', color: 'accent' }));
    }),
    mergeMap(({ payload }) => this.propertiesService.update$(payload.model).pipe(
      catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
    )),
    map((property: Property) => {
      if (property) {
        const entityChanges: Update<Property> = {
          id: property.id,
          changes: property
        }
        return new Update_({ entityChanges });
      }
      return new FinalizeOperation();
    })
  );

  @Effect({ dispatch: false })
  update$ = this.actions$.pipe(
    ofType<Update_>(PropertyActionTypes.Update_),
    tap(() => {
      this.store.dispatch(new HideProgressBar());
    })
  );

  @Effect()
  requestCreate$ = this.actions$.pipe(
    ofType<RequestCreate>(PropertyActionTypes.RequestCreate),
    tap(({payload}) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Creating property...', color: 'accent' }));
    }),
    // delay(5000),
    mergeMap(({ payload }) => this.propertiesService.create$(payload.model).pipe(
      catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
    )),
    map((property: Property) => {
      if (property && property.type && property.id) {
        this.router.navigate(['/properties/', property.type, 'edit', property.id]);
        //dispatch the action to save the value in the store
        return new AddOne({ property });
      }

      // if here, means http error in the response. 
      return new FinalizeOperation({ redirectData: ['/properties'] }); //we don't want to do anything in this case, stop the loadingData flag
    })
  );

  constructor(
    private actions$: Actions,
    private appService: AppService, 
    private store: Store<State>,
    private propertiesService: PropertiesService,
    private router: Router
  ) {}

}
