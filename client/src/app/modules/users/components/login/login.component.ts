import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';
import {User} from '../../user';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model : any = {email : '', password : ''};
  forgotModel : any = { email : '', forgot : false };
  loginServiceRunning : boolean = false;
  forgotServiceRunning : boolean = false;

  constructor(private usersService : UsersService, private appService : AppService,  
    private mainNavigatorService : MainNavigatorService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Login', url: null, selected: true }]);

    this.route.paramMap.map((params: ParamMap) => params.get('state'))
        .subscribe(state => {
          if (state === 'reset-password-token-expired') {
            this.appService.showResults('Reset password url has expired or is invalid. Please go to Forgot my password again to create a new one.', 5000);
          }
        });
  }

  /**
   * When user submits the login form
   */
  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging

    this.loginServiceRunning = true;
    this.usersService.user = null; //reset authenticated user. Register automatically authenticates the registered user.
    //call the register service
    this.usersService.login(this.model).subscribe(
      (data : any) => {
        if (data && data.email) {
          const user = new User(data.name, data.email, data.avatar, data.accessToInvestments);
          this.usersService.user = user;
          const redirectUrl = this.usersService.routerRedirectUrl ? this.usersService.routerRedirectUrl : '/';
          this.usersService.routerRedirectUrl = null;
          this.router.navigate([redirectUrl]); //go home
        } else {
          console.error(`${methodTrace} Unexpected data format.`);
          this.loginServiceRunning = false;
        }
      },
      (error : any) => {
        console.error(`${methodTrace} There was an error with the login service: `, error);

        if (error.codeno === 451) {
          this.appService.showResults(error.msg, 60000, 'Close');
        }

        this.loginServiceRunning = false;
      }
    );
  }

  /**
   * When user submits the forgot password form
   */
  onForgotSubmit() { 
    const methodTrace = `${this.constructor.name} > onForgotSubmit() > `; //for debugging

    this.forgotServiceRunning = true;
    //call the register service
    this.usersService.forgot(this.forgotModel).subscribe(
      (data : any) => {
        this.forgotServiceRunning = false;
        this.appService.showResults(`You have been emailed a password reset link.`);
      },
      (error : any) => {
        console.error(`${methodTrace} There was an error with the forgot password service: `, error);
        this.forgotServiceRunning = false;
        
        if (error.codeno === 455) {
          //invalid email
          this.appService.showResults(error.msg, 3000);
        } else if (error.codeno === 400) {
          //the mail system failed for external reasons
          this.appService.showResults(`There was an issue sending the reset password email, please try again in a few minutes.`);
        }
      }
    );
  }

  
}
