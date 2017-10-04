import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';

import { UsersService } from '../../users.service';
import {User} from '../../user';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  private model : any = { password : '', 'password-confirm' : ''};
  private token : string = '';
  private resetPasswordServiceRunning : boolean = false;

  constructor(private usersService : UsersService, private router : Router, private route : ActivatedRoute,
      private mainNavigatorService : MainNavigatorService ) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Login', url: '/users/login', selected: false },
      { displayName: 'Reset password', url: null, selected: true }]);

    this.route.paramMap.map((params: ParamMap) => params.get('token'))
        .subscribe(token => { 
          if (token) {
            this.token = token;
          } else {
            console.error(`${methodTrace} Token must be set to reset a password.`);
            this.router.navigate(['/']);
          }
        });
  }

  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging
    this.resetPasswordServiceRunning = true;

    //chech that the password and the confirmed password are the same
    if (this.model.password !== this.model['password-confirm']) {
      console.error(`${methodTrace} Confirm password must match password.`);

      this.resetPasswordServiceRunning = false;
      return false;
    }

    //call the reset password service.
    this.usersService.user = null; //reset authenticated user. Reset automatically authenticates the registered user.
    this.usersService.reset(this.token, this.model).subscribe(
      (data : any) => {
        if (data) {
          const user = new User(data.name, data.email, data.avatar);
          this.usersService.user = user;
          this.router.navigate(['/']); //go home
        } else {
          console.error(`${methodTrace} Unexpected data format.`)
        }

        this.resetPasswordServiceRunning = false;
      },
      (error : any) => {
        console.error(`${methodTrace} There was an error with the reset password service > ${error}`);
        this.resetPasswordServiceRunning = false;
      }
    );
  }

}
