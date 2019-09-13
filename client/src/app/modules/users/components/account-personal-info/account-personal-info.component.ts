import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import {User} from '../../models/user';
import {AccountPersonal} from '../../models/account-personal';
import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';
import { UtilService } from '../../../../util.service';
import { Subscription } from 'rxjs';
import { SnackbarNotificationTypes, ConsoleNotificationTypes } from 'src/app/constants';

@Component({
  selector: 'account-personal-info',
  templateUrl: './account-personal-info.component.html',
  styleUrls: ['./account-personal-info.component.scss']
})
export class AccountPersonalInfoComponent implements OnInit, OnDestroy {

  @Input() user: User;
  model: any = { birthday : null, email : null };
  startAt: Date = new Date(1990, 0, 1);
  accountPersonalServiceRunning = false;
  subscription: Subscription = new Subscription();

  constructor(private dateAdapter: DateAdapter<NativeDateAdapter>, private usersService: UsersService, private appService: AppService, 
        public utilService: UtilService) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.model.email = this.user.email;
    
    if (this.user.personalInfo) {
      this.model.birthday = this.user.personalInfo.birthday;
      
      if (this.user.personalInfo.birthday) {
        this.startAt = this.user.personalInfo.birthday;
      }
    }
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging

    this.accountPersonalServiceRunning = true;
    // call the account service
    const newSubscription = this.usersService.updatePersonalInfo$(this.model).subscribe(
      (user: User) => {
        if (user) {
          this.appService.showResults(`Your personal information was successfully updated!.`, SnackbarNotificationTypes.SUCCESS);
        }

        this.accountPersonalServiceRunning = false;
      },
      (error: any) => {
        this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, SnackbarNotificationTypes.ERROR);
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, SnackbarNotificationTypes.ERROR);
        }

        this.accountPersonalServiceRunning = false;
      }
    );
    this.subscription.add(newSubscription);
  }

}
