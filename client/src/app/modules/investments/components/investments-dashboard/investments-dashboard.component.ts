import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import {User} from '../../../users/models/user';
import {UsersService} from '../../../users/users.service';

@Component({
  selector: 'investments-dashboard',
  templateUrl: './investments-dashboard.component.html',
  styleUrls: ['./investments-dashboard.component.scss']
})
export class InvestmentsDashboardComponent implements OnInit {
  private xmrBuyDate : Date = new Date(2017, 5, 23); //month minus 1, 5 = june
  private xmrBuyDate2 : Date = new Date(2017, 8, 23);
  private xmrBuyDate3 : Date = new Date(2017, 8, 25);
  private btcBuyDate : Date = new Date(2017, 6, 19);
  private totalInvestment = 0;
  private totalReturn = 0;
  public showInvestments = false;
  private user : User = null;

  constructor(private route : ActivatedRoute, private mainNavigatorService : MainNavigatorService, private usersService : UsersService) { }

  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: null, selected: true }
    ]);

    //get authUser from resolver
    this.route.data.subscribe((data: { authUser: User }) => {
      this.user = data.authUser;
      this.showInvestments = data.authUser.accessToInvestments;
    });
  }

  setTotals(totalReturns : any) : void {
    this.totalReturn += totalReturns.usdFromCryptoCurrency;
    this.totalInvestment += totalReturns.usdFromCryptoCurrencyWhenBought;
  }
}
