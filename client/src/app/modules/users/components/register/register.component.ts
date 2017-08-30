import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../users.service';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private model : any = {name : '', email : '', password : '', passwordConfirm : ''};
  
  constructor(private usersService : UsersService, private router : Router) {}

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
  }

  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging

    //chech that the password and the confirmed password are the same
    if (this.model.password !== this.model.passwordConfirm) {
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
