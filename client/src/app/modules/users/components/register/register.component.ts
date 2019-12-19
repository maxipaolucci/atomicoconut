import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../../../app.service';
import { Subscription, Observable } from 'rxjs';
import { ConsoleNotificationTypes } from 'src/app/constants';
import { RequestRegister } from '../../user.actions';
import _ from 'lodash';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { LoadingData } from 'src/app/models/loadingData';
import { loadingSelector } from 'src/app/app.selectors';
import { RegisterUserModel } from '../../models/register-user-model';
import { SetLinks } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public model: RegisterUserModel = {
    email: '',
    name: '',
    'password-confirm' : '',
    password: ''
  };
  showPassword = false;
  subscription: Subscription = new Subscription();
  loading$: Observable<LoadingData>;
  
  constructor(
    private store: Store<State>, 
    private appService: AppService
  ) {}

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.store.dispatch(new SetLinks({ links: [
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Login', url: '/users/login', selected: false },
      { displayName: 'Create account', url: null, selected: true }
    ]}));

    this.loading$ = this.store.select(loadingSelector());
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  /**
   * When user submits the register form.
   */
  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging

    // chech that the password and the confirmed password are the same
    if (this.model.password !== this.model['password-confirm']) {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Confirm password must match password.`);
      return false;
    }
    
    this.store.dispatch(new RequestRegister(_.cloneDeep(this.model)));
  }

}
