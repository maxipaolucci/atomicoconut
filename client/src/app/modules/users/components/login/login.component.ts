import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';
import {User} from '../../models/user';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {email : '', password : ''};
  forgotModel: any = { email : '', forgot : false };
  loginServiceRunning = false;
  forgotServiceRunning = false;
  showPassword = false;

  constructor(private usersService: UsersService, private appService: AppService,  
    private mainNavigatorService: MainNavigatorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging
    
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Login', url: null, selected: true }]);

    this.route.paramMap.pipe(map((params: ParamMap) => params.get('state')))
        .subscribe(state => {
          if (state === 'reset-password-token-expired') {
            this.appService.showResults('Reset password token has expired or is invalid. Click on "Forgot my password" again to create a new one.', 'error', 10000);
          }
        });
  }

  /**
   * When user submits the login form
   */
  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging

    this.loginServiceRunning = true;
    
    // call the register service
    this.usersService.login$(this.model).subscribe(
      (user: User) => {
        if (user) {
          const redirectUrl = this.usersService.routerRedirectUrl ? this.usersService.routerRedirectUrl : '/';
          this.usersService.routerRedirectUrl = null;
          this.router.navigate([redirectUrl]);
        }

        this.loginServiceRunning = false;
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else if (error.codeno === 451) {
          this.appService.showResults(error.msg, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.loginServiceRunning = false;
      }
    );
  }

  /**
   * When user submits the forgot password form
   */
  onForgotSubmit() { 
    const methodTrace = `${this.constructor.name} > onForgotSubmit() > `; // for debugging

    this.forgotServiceRunning = true;
    // call the register service
    this.usersService.forgot$(this.forgotModel).subscribe(
      (data: any) => {
        if (data && data.email && data.expires) {
          this.appService.showResults(`We sent an email to ${data.email} with a password reset link that will expire in ${data.expires}.`, 'info');
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
        }
        
        this.forgotServiceRunning = false;
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else if (error.codeno === 455) {
          // invalid email
          this.appService.showResults(error.msg, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }
        this.forgotServiceRunning = false;
      }
    );
  }

  
}
