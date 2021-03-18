import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppService } from 'src/app/app.service';
import { InvestmentsService } from './investments.service';
import { Router } from '@angular/router';
import { State } from '../../main.reducer';
import { Store, select } from '@ngrx/store';
import { delay, mergeMap, tap, map, withLatestFrom, filter, catchError } from 'rxjs/operators';
import { ShowProgressBar, FinalizeOperation, HideProgressBar } from 'src/app/app.actions';
import { RequestAll, InvestmentActionTypes, AddAll, RequestDelete, Delete, RequestOne, AddOne, RequestUpdate, Update_, RequestCreate } from './investment.actions';
import { allInvestmentsLoadedSelector } from './investment.selectors';
import { of } from 'rxjs';
import { Investment } from './models/investment';
import { SnackbarNotificationTypes, RoutingPaths } from 'src/app/constants';
import { Update } from '@ngrx/entity';


@Injectable()
export class InvestmentEffects {

  @Effect()
  requestAll$ = this.actions$.pipe(
    ofType<RequestAll>(InvestmentActionTypes.RequestAll),
    tap((action) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Fetching investments...' }));
    }),
    withLatestFrom(this.store.pipe(select(allInvestmentsLoadedSelector()))),
    filter(([action, allEntitiesLoaded]) => {
      if (!allEntitiesLoaded) {
        // properties are not in the store or we want to push a fetch from the server
        return true;
      } else {
        // properties are in the store 
        this.store.dispatch(new FinalizeOperation());
        return false;
      }
    }),
    // delay(4000),
    mergeMap(([action, allEntitiesLoaded]) => this.investmentsService.getInvestments$()
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((investments: Investment[]) => {
      //dispatch the action to save the value in the store
      if (investments) {
        return new AddAll({ investments });
      }

      return new AddAll({ investments: [], serverError: true }); //avoid set allEntitiesLoaded flag to true
    }) 
  );

  @Effect({ dispatch: false })
  addAll$ = this.actions$.pipe(
    ofType<AddAll>(InvestmentActionTypes.AddAll),
    tap(() => {
      this.store.dispatch(new HideProgressBar());
    })
  );

  @Effect()
  requestDelete$ = this.actions$.pipe(
    ofType<RequestDelete>(InvestmentActionTypes.RequestDelete),
    tap(({payload}) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Removing investment...', color: 'warn' }));
    }),
    // delay(4000),
    mergeMap(({ payload }) => this.investmentsService.delete$(payload.id).
      pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((data: any) => {
      if (data) {
        if (data.removed > 0) {
          this.appService.showResults(`Investment successfully removed!`, SnackbarNotificationTypes.SUCCESS);
          return new Delete({ id: data.investment._id });
        } else {
          this.appService.showResults(`Investment could not be removed, please try again.`, SnackbarNotificationTypes.ERROR);
        } 
      }
      
      return new FinalizeOperation(); //we don't want to do anything in this case, stop the loadingData flag
    })
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType<Delete>(InvestmentActionTypes.Delete),
    tap(() => {
      this.store.dispatch(new HideProgressBar());
    })
  );

  @Effect()
  requestOne$ = this.actions$.pipe(
    ofType<RequestOne>(InvestmentActionTypes.RequestOne),
    tap(({payload}) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Fetching investment...' }));
    }),
    mergeMap(({ payload }) => this.investmentsService.getInvestmentById$(payload.id)
      .pipe(
        catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
      )
    ),
    map((investment: Investment) => {
      if (investment) {
        //dispatch the action to save the value in the store
        return new AddOne({ investment });
      }

      // if here, means http error in the response. 
      return new FinalizeOperation({ redirectData: [RoutingPaths.PROPERTIES] }); //we don't want to do anything in this case, stop the loadingData flag
    }) 
  );

  @Effect({ dispatch: false })
  addOne$ = this.actions$.pipe(
    ofType<AddOne>(InvestmentActionTypes.AddOne),
    tap(() => {
      this.store.dispatch(new HideProgressBar());
    })
  );
  
  @Effect()
  requestUpdate$ = this.actions$.pipe(
    ofType<RequestUpdate>(InvestmentActionTypes.RequestUpdate),
    tap(({payload}) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Updating investment...', color: 'accent' }));
    }),
    mergeMap(({ payload }) => this.investmentsService.update$(payload.model).pipe(
      catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
    )),
    map((investment: Investment) => {
      if (investment) {
        const entityChanges: Update<Investment> = {
          id: investment.id,
          changes: investment
        }
        return new Update_({ entityChanges });
      }
      return new FinalizeOperation();
    })
  );

  @Effect({ dispatch: false })
  update$ = this.actions$.pipe(
    ofType<Update_>(InvestmentActionTypes.Update_),
    tap(() => {
      this.store.dispatch(new HideProgressBar());
    })
  );

  @Effect()
  requestCreate$ = this.actions$.pipe(
    ofType<RequestCreate>(InvestmentActionTypes.RequestCreate),
    tap(({payload}) => {
      this.store.dispatch(new ShowProgressBar({ message: 'Creating investment...', color: 'accent' }));
    }),
    mergeMap(({ payload }) => this.investmentsService.create$(payload.model).pipe(
      catchError((error: any) => of(null)) //http errors are properly handle in http-error.interceptor, just send null to the next method
    )),
    map((investment: Investment) => {
      if (investment && investment.type && investment.id) {
        this.router.navigate(['/investments/', investment.type, 'edit', investment.id]);
        //dispatch the action to save the value in the store
        return new AddOne({ investment });
      }

      // if here, means http error in the response. 
      return new FinalizeOperation({ redirectData: [RoutingPaths.INVESTMENTS] }); //we don't want to do anything in this case, stop the loadingData flag
    })
  );

  constructor(
    private actions$: Actions,
    private appService: AppService, 
    private store: Store<State>,
    private investmentsService: InvestmentsService,
    private router: Router  
  ) {}

}
