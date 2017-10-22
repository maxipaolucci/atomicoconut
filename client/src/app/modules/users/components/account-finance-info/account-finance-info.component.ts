import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {User} from '../../models/user';
import {AccountFinance} from '../../models/account-finance';

@Component({
  selector: 'account-finance-info',
  templateUrl: './account-finance-info.component.html',
  styleUrls: ['./account-finance-info.component.scss']
})
export class AccountFinanceInfoComponent implements OnInit {
  @ViewChild('financeForm') form;
  @Input() user : User;
  model : AccountFinance = null;
  accountFinanceServiceRunning : boolean = false;

  constructor() {}

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    
    this.model = this.user.finance;
  }

  ngAfterViewInit() {
    
  }

  onSubmit() {
    console.log(this.user.finance);
  }
}
