import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';
import {User} from '../../models/user';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public model : any = {name : '', email : ''};
  public user : User = null;
  public updateAccountServiceRunning : boolean = false;

  constructor(private usersService : UsersService, private appService : AppService, 
      private mainNavigatorService : MainNavigatorService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'My account', url: null, selected: true }]);
    
    //get authUser from resolver
    this.route.data.subscribe((data: { authUser: User }) => {
      this.user = data.authUser;
      this.model = { name : data.authUser.name, email : data.authUser.email };
    });
  }

  /**
   * When user submits the register form.
   */
  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging
    this.updateAccountServiceRunning = true;
    
    //call the account service
    this.usersService.updateAccount(this.model).subscribe(
      (data : any) => {
        if (data && data.email) {
          const user = new User(data.name, data.email, data.avatar, data.accessToInvestments);
          this.usersService.user = user;
          this.appService.showResults(`Your profile was successfully updated!.`);
        } else {
          console.error(`${methodTrace} Unexpected data format.`)
        }

        this.updateAccountServiceRunning = false;
      },
      (error : any) => {
        console.error(`${methodTrace} There was an error with the update account service > ${error}`);
        if (error.codeno === 400) {
          //the mail system failed for external reasons
          this.appService.showResults(`There was an error with the update account service, please try again in a few minutes.`);
        }

        this.updateAccountServiceRunning = false;
      }
    );
  }

}
