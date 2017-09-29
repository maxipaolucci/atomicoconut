import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../users.service';
import {User} from '../../user';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private model : any = {name : '', email : '', password : '', 'password-confirm' : ''};
  
  constructor(private usersService : UsersService, private router : Router) {}

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
  }

  /**
   * When user submits the register form.
   */
  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging

    //chech that the password and the confirmed password are the same
    if (this.model.password !== this.model['password-confirm']) {
      console.error(`${methodTrace} Confirm password must match password.`);
      return false;
    }

    this.usersService.user = null; //reset authenticated user. Register automatically authenticates the registered user.
    //call the register service
    this.usersService.register(this.model).subscribe(
      (data : any) => {
        if (data && data.email) {
          const user = new User(data.name, data.email, data.avatar)
          this.usersService.user = user;
          this.router.navigate(['/']); //go home
        } else {
          console.error(`${methodTrace} Unexpected data format.`)
        }
      },
      (error : any) => console.error(`${methodTrace} There was an error with the register service > ${error}`)
    );
  }

}
