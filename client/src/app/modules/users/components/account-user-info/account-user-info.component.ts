import { Component, OnInit, Input } from '@angular/core';
import {User} from '../../models/user';
import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'account-user-info',
  templateUrl: './account-user-info.component.html',
  styleUrls: ['./account-user-info.component.scss']
})
export class AccountUserInfoComponent implements OnInit {

  public model : any = {name : '', email : ''};
  @Input() user : User = null;
  public updateAccountServiceRunning : boolean = false;

  constructor(private usersService : UsersService, private appService : AppService) {}

  ngOnInit() {
    this.model = { name : this.user.name, email : this.user.email };
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
