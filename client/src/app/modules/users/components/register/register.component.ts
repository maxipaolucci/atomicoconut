import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';
import {User} from '../../models/user';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public model : any = {name : '', email : '', password : '', 'password-confirm' : ''};
  public registerServiceRunning : boolean = false;
  
  constructor(private usersService : UsersService, private appService : AppService, private router : Router,
      private mainNavigatorService : MainNavigatorService) {}

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Login', url: '/users/login', selected: false },
      { displayName: 'Create account', url: null, selected: true }]);
  }

  /**
   * When user submits the register form.
   */
  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging

    this.registerServiceRunning = true;

    //chech that the password and the confirmed password are the same
    if (this.model.password !== this.model['password-confirm']) {
      console.error(`${methodTrace} Confirm password must match password.`);
      this.registerServiceRunning = false;
      return false;
    }

    this.usersService.setUser(null); //reset authenticated user. Register automatically authenticates the registered user.
    //call the register service
    this.usersService.register(this.model).subscribe(
      (data : any) => {
        if (data && data.email) {
          const user = new User(data.name, data.email, data.avatar, data.accessToInvestments, null, null, data.currency)
          this.usersService.setUser(user);
          this.router.navigate(['/']); //go home
          this.appService.showResults(`${user.name} welcome to AtomiCoconut!`);
        } else {
          console.error(`${methodTrace} Unexpected data format.`, data);
        }

        this.registerServiceRunning = false;
      },
      (error : any) => {
        console.error(`${methodTrace} There was an error with the register service.`, error);
        if (error.codeno === 400) {
          if (error.data && error.data.name === 'UserExistsError')
          //the mail system failed for external reasons
          this.appService.showResults(`The submitted email was already use by another person, pick a different one please.`);
        }

        this.registerServiceRunning = false;
      }
    );
  }

}
