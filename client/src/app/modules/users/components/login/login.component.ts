import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../users.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model : any = {email : '', password : ''};
  forgotModel : any = { email : '', forgot : false };

  constructor(private usersService : UsersService, private router : Router, public snackBar: MdSnackBar) { }

  ngOnInit() {}

  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging

    this.usersService.setUser(null); //reset authenticated user. Register automatically authenticates the registered user.
    //call the register service
    this.usersService.login(this.model).subscribe(
      (data : any) => {
        if (data && data.email) {
          this.usersService.setUser(data);
          this.router.navigate(['/']); //go home
        } else {
          console.error(`${methodTrace} Unexpected data format.`)
        }
      },
      (error : any) => console.error(`${methodTrace} There was an error with the register service > ${error}`)
    );
  }

  onForgotSubmit() { 
    const methodTrace = `${this.constructor.name} > onForgotSubmit() > `; //for debugging

    //call the register service
    this.usersService.forgot(this.forgotModel).subscribe(
      (data : any) => {
        this.showResults(`You have been emailed a password reset link.`);
      },
      (error : any) => {
        console.error(`${methodTrace} There was an error with the forgot password service > ${error}`);
        this.showResults(`No account with that email exists.`);
      }
    );
  }

  showResults(message : string) {
    this.snackBar.open(message, null, {
      duration: 3000,
      extraClasses: ['snack-bar--simple']
    });
  }
}
