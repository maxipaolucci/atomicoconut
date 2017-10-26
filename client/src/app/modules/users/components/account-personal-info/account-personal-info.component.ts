import { Component, OnInit, Input } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import {User} from '../../models/user';
import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';
import { UtilService } from '../../../../util.service';

@Component({
  selector: 'account-personal-info',
  templateUrl: './account-personal-info.component.html',
  styleUrls: ['./account-personal-info.component.scss']
})
export class AccountPersonalInfoComponent implements OnInit {

  @Input() user : User;
  model : any = { birthday : null, email : null };
  startAt : Date = new Date(1990, 0, 1);
  accountPersonalServiceRunning : boolean = false;

  constructor(private dateAdapter: DateAdapter<NativeDateAdapter>, private usersService : UsersService, private appService : AppService, 
        public utilService : UtilService) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.model.email = this.user.email;
    
    if (this.user.personalInfo) {
      this.model.birthday = this.user.personalInfo.birthday;
      
      if (this.user.personalInfo.birthday) {
        this.startAt = this.user.personalInfo.birthday;
      }
    }
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging

    this.accountPersonalServiceRunning = true;
    //call the account service
    this.usersService.updatePersonalInfo(this.model).subscribe(
      (data : any) => {
        if (data && data.email) {
          const user = new User(data.name, data.email, data.avatar, data.accessToInvestments);
          this.usersService.user = user;
          this.appService.showResults(`Your personal information was successfully updated!.`);
        } else {
          console.error(`${methodTrace} Unexpected data format.`)
        }

        this.accountPersonalServiceRunning = false;
      },
      (error : any) => {
        console.error(`${methodTrace} There was an error with the update personal info service > ${error}`);
        if (error.codeno === 400) {
          //the mail system failed for external reasons
          this.appService.showResults(`There was an error with the personal info service, please try again in a few minutes.`);
        }

        this.accountPersonalServiceRunning = false;
      }
    );
  }

}
