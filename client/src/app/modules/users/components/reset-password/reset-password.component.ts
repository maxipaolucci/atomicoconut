import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppService } from '../../../../app.service';
import { Subscription, Observable } from 'rxjs';
import { ResetPasswordModel } from '../../models/reset-password-model';
import { LoadingData } from 'src/app/models/loadingData';
import { SnackbarNotificationTypes, ConsoleNotificationTypes, RoutingPaths } from 'src/app/constants';
import { State } from 'src/app/main.reducer';
import { Store } from '@ngrx/store';
import { RequestReset } from '../../user.actions';
import _ from 'lodash';
import { loadingSelector } from 'src/app/app.selectors';
import { SetLinks } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';

@Component({
  selector: 'users-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  model: ResetPasswordModel = { password : '', 'password-confirm' : ''};
  private token = '';
  showPassword = false;
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
      { displayName: 'Welcome', url: RoutingPaths.WELCOME, selected: false },
      { displayName: 'Login', url: `${RoutingPaths.USERS}/login`, selected: false },
      { displayName: 'Reset password', url: null, selected: true }
    ]}));

    this.route.paramMap.pipe(map((params: ParamMap) => params.get('token')))
      .subscribe(token => { 
        if (token) {
          this.token = token;
        } else {
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Token must be set to reset a password.`);
          this.router.navigate([RoutingPaths.HOME]);
        }
      });

    this.loadingData$ = this.store.select(loadingSelector());
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging

    // chech that the password and the confirmed password are the same
    if (this.model.password !== this.model['password-confirm']) {
      this.appService.showResults(`Confirm password must match password.`, SnackbarNotificationTypes.ERROR);
      return false;
    }

    this.store.dispatch(new RequestReset({ token: this.token, model: _.cloneDeep(this.model) }));
  }

}
