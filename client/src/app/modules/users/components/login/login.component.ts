import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private model : any = {email : '', password : ''};
  private submitted : boolean = false;

  constructor(private usersService : UsersService, private router : Router) { }

  ngOnInit() {
  }

  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging

    this.submitted = true;
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
}
