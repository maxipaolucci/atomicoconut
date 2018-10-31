import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsersService } from '../../users.service';
import {User} from '../../models/user';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'users-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  model : any = { password : '', 'password-confirm' : ''};
  private token : string = '';
  resetPasswordServiceRunning : boolean = false;
  showPassword : boolean = false;

  constructor(private appService : AppService, private usersService : UsersService, private router : Router, private route : ActivatedRoute,
      private mainNavigatorService : MainNavigatorService ) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Login', url: '/users/login', selected: false },
      { displayName: 'Reset password', url: null, selected: true }]);

    this.route.paramMap.pipe(map((params: ParamMap) => params.get('token')))
        .subscribe(token => { 
          if (token) {
            this.token = token;
          } else {
            this.appService.consoleLog('error', `${methodTrace} Token must be set to reset a password.`);
            this.router.navigate(['/']);
          }
        });
  }

  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging
    this.resetPasswordServiceRunning = true;

    //chech that the password and the confirmed password are the same
    if (this.model.password !== this.model['password-confirm']) {
      this.appService.consoleLog('error', `${methodTrace} Confirm password must match password.`);

      this.resetPasswordServiceRunning = false;
      return false;
    }

    //call the reset password service.
    this.usersService.setUser(null); //reset authenticated user. Reset automatically authenticates the registered user.
    this.usersService.reset(this.token, this.model).subscribe(
      (data : any) => {
        if (data) {
          const user = new User(data.name, data.email, data.avatar, null, null, data.currency);
          this.usersService.setUser(user);
          this.appService.showResults('Your password was successfully updated!', 'success');
          this.router.navigate(['/']); //go home
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`)
        }

        this.resetPasswordServiceRunning = false;
      },
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }
        this.resetPasswordServiceRunning = false;
      }
    );
  }

}
