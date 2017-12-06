import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { User } from '../../../users/models/user';
import { UsersService } from '../../../users/users.service';
import { InvestmentSelectorDialogComponent } from '../investment-selector-dialog/investment-selector-dialog.component';
import { Investment } from '../../models/investment';
import { AppService } from '../../../../app.service';
import { InvestmentsService } from '../../investments.service';

@Component({
  selector: 'investments-dashboard',
  templateUrl: './investments-dashboard.component.html',
  styleUrls: ['./investments-dashboard.component.scss']
})
export class InvestmentsDashboardComponent implements OnInit {
  investments : Investment[] = [];
  xmrBuyDate : Date = new Date(2017, 5, 23); //month minus 1, 5 = june
  xmrBuyDate2 : Date = new Date(2017, 8, 23);
  xmrBuyDate3 : Date = new Date(2017, 8, 25);
  btcBuyDate : Date = new Date(2017, 6, 19);
  totalInvestment = 0;
  totalReturn = 0;
  user : User = null;
  getInvestmentsServiceRunning : boolean = false;
  investmentActionRunning : boolean[] = [];

  constructor(private route : ActivatedRoute, private mainNavigatorService : MainNavigatorService, private usersService : UsersService, public dialog: MatDialog, 
      private appService : AppService, private investmentsService : InvestmentsService) { }

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

    if (!this.investments.length) {
      this.getInvestments();
    }
  }

  /**
   * Get my investments from server
   */
  getInvestments() {
    const methodTrace = `${this.constructor.name} > getInvestments() > `; //for debugging

    this.investments = [];
    this.getInvestmentsServiceRunning = true;

    this.investmentsService.getInvestments(this.user.email).subscribe(
      (investments : Investment[]) => {
        let index = 0;
        this.investments = investments;
        for (let item of investments) {
          this.investmentActionRunning[index] = false;
          index += 1;
        }
        console.log(this.investments);

        this.getInvestmentsServiceRunning = false;
      },
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.getInvestmentsServiceRunning = false;
      }
    );
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
