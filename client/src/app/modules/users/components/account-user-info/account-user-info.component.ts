import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { User } from '../../models/user';
import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { userSelector } from 'src/app/modules/users/user.selectors';
import { DEFAULT_CURRENCY, SnackbarNotificationTypes, ConsoleNotificationTypes } from 'src/app/constants';
import { AccountUserInfoModel } from '../../models/account-user-info-model';
import { RequestUpdateAccountInfo } from '../../user.actions';
import _ from 'lodash';
import { LoadingData } from 'src/app/models/loadingData';
import { loadingSelector } from 'src/app/app.selectors';


@Component({
  selector: 'account-user-info',
  templateUrl: './account-user-info.component.html',
  styleUrls: ['./account-user-info.component.scss']
})
export class AccountUserInfoComponent implements OnInit, OnDestroy {

  user: User = null;
  model: AccountUserInfoModel = {
    name : null, 
    email : null, 
    currency : null
  };
  subscription: Subscription = new Subscription();
  loading$: Observable<LoadingData>;

  
  constructor(
    private usersService: UsersService, 
    private appService: AppService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.subscription.add(this.store.select(userSelector()).subscribe((user: User) => {
      this.user = user;
      this.model = { 
        name : this.user.name, 
        email : this.user.email, 
        currency : this.user.currency || DEFAULT_CURRENCY
      };
    }));

    this.loading$ = this.store.select(loadingSelector());
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  onCurrencyUnitChange($event: MatSelectChange) {
    if ($event.source.id === 'preferredCurrency') {
      this.model.currency = $event.value;
    }
  }

  

  /**
   * When user submits the register form.
   */
  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging
    
    this.store.dispatch(new RequestUpdateAccountInfo(_.cloneDeep(this.model)));
  }

}
