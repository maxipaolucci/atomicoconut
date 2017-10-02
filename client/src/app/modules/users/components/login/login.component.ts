import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';
import {User} from '../../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model : any = {email : '', password : ''};
  forgotModel : any = { email : '', forgot : false };

  constructor(private usersService : UsersService, private appService : AppService, private router : Router) { }

  ngOnInit() {}

  /**
   * When user submits the login form
   */
  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging

    this.usersService.user = null; //reset authenticated user. Register automatically authenticates the registered user.
    //call the register service
    this.usersService.login(this.model).subscribe(
      (data : any) => {
        if (data && data.email) {
          const user = new User(data.name, data.email, data.avatar);
          this.usersService.user = user;
          const redirectUrl = this.usersService.routerRedirectUrl ? this.usersService.routerRedirectUrl : '/';
          this.usersService.routerRedirectUrl = null;
          this.router.navigate([redirectUrl]); //go home
        } else {
          console.error(`${methodTrace} Unexpected data format.`);
        }
      },
      (error : any) => {
        console.error(`${methodTrace} There was an error with the login service: `, error);

        if (error.codeno === 451) {
          this.appService.showResults(error.msg, 60000, 'Close');
        }
      }
    );
  }

  /**
   * When user submits the forgot password form
   */
  onForgotSubmit() { 
    const methodTrace = `${this.constructor.name} > onForgotSubmit() > `; //for debugging

    //call the register service
    this.usersService.forgot(this.forgotModel).subscribe(
      (data : any) => {
        this.appService.showResults(`You have been emailed a password reset link.`);
      },
      (error : any) => {
        console.error(`${methodTrace} There was an error with the forgot password service: `, error);
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
