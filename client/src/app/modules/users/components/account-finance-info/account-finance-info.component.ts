import { Component, OnInit, Input } from '@angular/core';
import {User} from '../../models/user';
import {AccountFinance} from '../../models/account-finance';

@Component({
  selector: 'account-finance-info',
  templateUrl: './account-finance-info.component.html',
  styleUrls: ['./account-finance-info.component.scss']
})
export class AccountFinanceInfoComponent implements OnInit {

  @Input() user : User;
  model : AccountFinance;

  constructor() {
    this.model = new AccountFinance();
  }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    
    this.model = this.user.finance;
  }

}
