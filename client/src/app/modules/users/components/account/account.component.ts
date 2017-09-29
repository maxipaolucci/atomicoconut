import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';
import {User} from '../../user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  private model : any = {name : '', email : ''};

  constructor(private usersService : UsersService, private appService : AppService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { authUser: User }) => {
      this.model = { name : data.authUser.name, email : data.authUser.email };
    });
  }

  /**
   * When user submits the register form.
   */
  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging
    
    //call the account service
    this.usersService.updateAccount(this.model).subscribe(
      (data : any) => {
        if (data && data.email) {
          const user = new User(data.name, data.email, data.avatar);
          this.usersService.user = user;
          this.appService.showResults(`Your profile was successfully updated!.`);
        } else {
          console.error(`${methodTrace} Unexpected data format.`)
        }
      },
      (error : any) => {
        console.error(`${methodTrace} There was an error with the update account service > ${error}`);
        if (error.codeno === 400) {
          //the mail system failed for external reasons
          this.appService.showResults(`There was an error with the update account service, please try again in a few minutes.`);
        }
      }
    );
  }

}
