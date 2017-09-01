import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  model : any = { password : '', 'password-confirm' : ''};

  constructor(private usersService : UsersService, private router : Router) { }

  ngOnInit() {}

  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging

    //chech that the password and the confirmed password are the same
    if (this.model.password !== this.model['password-confirm']) {
      console.error(`${methodTrace} Confirm password must match password.`);
      return false;
    }

    this.usersService.setUser(null); //reset authenticated user. Register automatically authenticates the registered user.
    //call the register service
    this.usersService.register(this.model).subscribe(
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

}
