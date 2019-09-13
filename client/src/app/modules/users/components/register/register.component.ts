import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';
import {User} from '../../models/user';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { Subscription } from 'rxjs';
import { SnackbarNotificationTypes, ConsoleNotificationTypes } from 'src/app/constants';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public model: any = {name : '', email : '', password : '', 'password-confirm' : ''};
  public registerServiceRunning = false;
  showPassword = false;
  subscription: Subscription = new Subscription();
  
  constructor(private usersService: UsersService, private appService: AppService, private router: Router,
      private mainNavigatorService: MainNavigatorService) {}

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Login', url: '/users/login', selected: false },
      { displayName: 'Create account', url: null, selected: true }]);
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

    this.registerServiceRunning = true;

    // chech that the password and the confirmed password are the same
    if (this.model.password !== this.model['password-confirm']) {
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Confirm password must match password.`);
      this.registerServiceRunning = false;
      return false;
    }
    
    // call the register service
    const newSubscription: Subscription = this.usersService.register$(this.model).subscribe(
      (user: User) => {
        if (user) {
          this.router.navigate(['/']); // go home
          this.appService.showResults(`${user.name} welcome to AtomiCoconut!`, SnackbarNotificationTypes.SUCCESS);
        }

        this.registerServiceRunning = false;
      },
      (error: any) => {
        this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          if (error.data && error.data.name === 'UserExistsError') {
            // the mail system failed for external reasons
            this.appService.showResults(`The selected email address already in use by another person, pick a different one please.`, SnackbarNotificationTypes.ERROR);
          } else {
            this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, SnackbarNotificationTypes.ERROR);
          }
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, SnackbarNotificationTypes.ERROR);
        }

        this.registerServiceRunning = false;
      }
    );
    this.subscription.add(newSubscription);
  }

}
