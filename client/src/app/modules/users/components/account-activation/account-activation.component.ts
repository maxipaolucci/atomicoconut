import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppService } from '../../../../app.service';
import { Subscription, Observable } from 'rxjs';
import { LoadingData } from 'src/app/models/loadingData';
import { ConsoleNotificationTypes, RoutingPaths } from 'src/app/constants';
import { State } from 'src/app/main.reducer';
import { Store } from '@ngrx/store';
import { RequestAccountActivation } from '../../user.actions';
import _ from 'lodash';
import { loadingSelector } from 'src/app/app.selectors';
import { SetLinks } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit, OnDestroy {

  private token = '';
  subscription: Subscription = new Subscription();
  loadingData$: Observable<LoadingData> = null;

  constructor(
    private appService: AppService, 
    private router: Router, 
    private route: ActivatedRoute,
    private store: Store<State>
  ) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging
    
    this.store.dispatch(new SetLinks({ links: [
      { displayName: 'Acccount activation', url: null, selected: true }
    ]}));

    this.route.paramMap.pipe(map((params: ParamMap) => params.get('token')))
      .subscribe(token => { 
        if (token) {
          this.token = token;
        } else {
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Token must be set to activate your account.`);
          this.router.navigate([RoutingPaths.HOME]);
        }
      });

    this.loadingData$ = this.store.select(loadingSelector());

    this.store.dispatch(new RequestAccountActivation({ token: this.token }));
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

}
