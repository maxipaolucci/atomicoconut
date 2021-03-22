import { Component, OnInit, OnDestroy } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import {User} from '../../models/user';
import { UtilService } from '../../../../util.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { userSelector } from 'src/app/modules/users/user.selectors';
import _ from 'lodash';
import { LoadingData } from 'src/app/models/loadingData';
import { loadingSelector } from 'src/app/app.selectors';
import { AccountPersonalInfoModel } from '../../models/account-personal-info-model';
import { RequestUpdateAccountPersonalInfo } from '../../user.actions';


@Component({
  selector: 'account-personal-info',
  templateUrl: './account-personal-info.component.html',
  styleUrls: ['./account-personal-info.component.scss']
})
export class AccountPersonalInfoComponent implements OnInit, OnDestroy {

  user: User;
  model: AccountPersonalInfoModel = { birthday : null };
  startAt: Date = new Date(1990, 0, 1);
  subscription: Subscription = new Subscription();
  loading$: Observable<LoadingData>;

  constructor(
      private dateAdapter: DateAdapter<NativeDateAdapter>,
      public utilService: UtilService,
      private store: Store<State>) {
    
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    // get the user (this is fast)
    this.subscription.add(this.store.select(userSelector()).subscribe((user: User) => this.user = user));
    
    if (this.user.personalInfo) {
      this.model.birthday = this.user.personalInfo.birthday;
      
      if (this.user.personalInfo.birthday) {
        this.startAt = this.user.personalInfo.birthday;
      }
    }
    
    this.loading$ = this.store.select(loadingSelector());
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging

    this.store.dispatch(new RequestUpdateAccountPersonalInfo(_.cloneDeep(this.model)));
  }

}
