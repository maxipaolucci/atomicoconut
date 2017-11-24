import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { User } from '../../../users/models/user';
import { UsersService } from '../../../users/users.service';
import { InvestmentSelectorDialogComponent } from '../investment-selector-dialog/investment-selector-dialog.component';

@Component({
  selector: 'investments-dashboard',
  templateUrl: './investments-dashboard.component.html',
  styleUrls: ['./investments-dashboard.component.scss']
})
export class InvestmentsDashboardComponent implements OnInit {
  xmrBuyDate : Date = new Date(2017, 5, 23); //month minus 1, 5 = june
  xmrBuyDate2 : Date = new Date(2017, 8, 23);
  xmrBuyDate3 : Date = new Date(2017, 8, 25);
  btcBuyDate : Date = new Date(2017, 6, 19);
  totalInvestment = 0;
  totalReturn = 0;
  user : User = null;
  getInvestmentsServiceRunning : boolean = false;

  constructor(private route : ActivatedRoute, private mainNavigatorService : MainNavigatorService, private usersService : UsersService, public dialog: MatDialog) { }

  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: null, selected: true }
    ]);

    //get authUser from resolver
    this.route.data.subscribe((data: { authUser: User }) => {
      this.user = data.authUser;
    });
  }

  setTotals(totalReturns : any) : void {
    this.totalReturn += totalReturns.usdFromCryptoCurrency;
    this.totalInvestment += totalReturns.usdFromCryptoCurrencyWhenBought;
  }

  openNewInvestmentDialog() {
    let addPersonDialogRef = this.dialog.open(InvestmentSelectorDialogComponent, {});
    return false;
  }
}
