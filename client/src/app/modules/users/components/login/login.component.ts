import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppService } from '../../../../app.service';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { RequestLogin, RequestForgot } from '../../user.actions';
import { LoginModel } from '../../models/login-model';
import { forgotFormVisibilitySelector } from '../../user.selectors';
import { LoadingData } from 'src/app/models/loadingData';
import { SnackbarNotificationTypes } from 'src/app/constants';
import { loadingSelector } from 'src/app/app.selectors';
import _ from 'lodash';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  model: LoginModel = { email : '', password : '' };
  forgotModel: any = { email : '' };
  showPassword = false;
  subscription: Subscription = new Subscription();
  forgotFormVisibility: boolean = false;
  loadingData$: Observable<LoadingData> = null;

  constructor(
    private appService: AppService,  
    private mainNavigatorService: MainNavigatorService,  
    private route: ActivatedRoute,
    private store: Store<State>
  ) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging
    
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Login', url: null, selected: true }]);

    this.route.paramMap.pipe(map((params: ParamMap) => params.get('state'))).subscribe(state => {
      if (state === 'reset-password-token-expired') {
        this.appService.showResults('Reset password token has expired or is invalid. Click on "Forgot my password" again to create a new one.', SnackbarNotificationTypes.INFO, 10000);
      }
    });

    this.loadingData$ = this.store.select(loadingSelector());

    let newSubscription = this.store.select(forgotFormVisibilitySelector()).subscribe((visibility: boolean) => {
      this.forgotFormVisibility = visibility
    });
    this.subscription.add(newSubscription);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging
    this.store.dispatch(new RequestLogin(_.cloneDeep(this.model)));
  }

  /**
   * When user submits the forgot password form
   */
  onForgotSubmit() { 
    const methodTrace = `${this.constructor.name} > onForgotSubmit() > `; // for debugging

    this.store.dispatch(new RequestForgot(_.cloneDeep(this.forgotModel)));
  }
}
