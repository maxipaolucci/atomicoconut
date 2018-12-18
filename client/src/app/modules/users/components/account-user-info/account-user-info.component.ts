import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import {User} from '../../models/user';
import { UsersService } from '../../users.service';
import { AppService } from '../../../../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'account-user-info',
  templateUrl: './account-user-info.component.html',
  styleUrls: ['./account-user-info.component.scss']
})
export class AccountUserInfoComponent implements OnInit, OnDestroy {

  @Input() user: User = null;
  public model: any = {name : '', email : '', currency : ''};
  public updateAccountServiceRunning = false;
  subscription: Subscription = new Subscription();

  
  constructor(private usersService: UsersService, private appService: AppService) {}

  ngOnInit() {
    this.model = { name : this.user.name, email : this.user.email, currency : this.user.currency };
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  onCurrencyUnitChange($event: MatSelectChange) {
    if ($event.source.id === 'preferredCurrency') {
      this.model.currency = $event.value;
    }
  }

  

  /**
   * When user submits the register form.
   */
  onSubmit() { 
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging
    this.updateAccountServiceRunning = true;
    
    // call the account service
    const newSubscription = this.usersService.updateAccount$(this.model).subscribe(
      (user: User) => {
        if (user) {
          this.appService.showResults(`Your profile was successfully updated!.`, 'success');
        }

        this.updateAccountServiceRunning = false;
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.updateAccountServiceRunning = false;
      }
    );
    this.subscription.add(newSubscription);
  }

}
