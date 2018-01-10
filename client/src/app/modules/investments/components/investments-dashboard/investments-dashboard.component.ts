import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { User } from '../../../users/models/user';
import { UsersService } from '../../../users/users.service';
import { InvestmentSelectorDialogComponent } from '../investment-selector-dialog/investment-selector-dialog.component';
import { Investment } from '../../models/investment';
import { AppService } from '../../../../app.service';
import { InvestmentsService } from '../../investments.service';
import { Team } from '../../../teams/models/team';
import { TeamsService } from '../../../teams/teams.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { CurrencyExchangeService } from '../../currency-exchange.service';
import { CurrencyInvestment } from '../../models/currencyInvestment';
import { INVESTMENTS_TYPES } from '../../../../constants/constants';

@Component({
  selector: 'investments-dashboard',
  templateUrl: './investments-dashboard.component.html',
  styleUrls: ['./investments-dashboard.component.scss']
})
export class InvestmentsDashboardComponent implements OnInit, OnDestroy {
  investments : Investment[] = [];
  teams : Team[] = [];
  investmentsUI : any[] = []; //this is a structure to use in the view an make the rendering easier organizing the info in rows
  xmrBuyDate : Date = new Date(2017, 5, 23); //month minus 1, 5 = june
  xmrBuyDate2 : Date = new Date(2017, 8, 23);
  xmrBuyDate3 : Date = new Date(2017, 8, 25);
  btcBuyDate : Date = new Date(2017, 6, 19);
  totalInvestment = 0;
  totalReturn = 0;
  myTotalInvestment = 0;
  myTotalReturn = 0;
  totals : any = {};
  user : User = null;
  subscription : Subscription = new Subscription();
  getInvestmentsServiceRunning : boolean = false;
  getTeamsServiceRunning : boolean = false;

  constructor(private route : ActivatedRoute, private mainNavigatorService : MainNavigatorService, private usersService : UsersService, public dialog: MatDialog, 
      private appService : AppService, private teamsService : TeamsService, private investmentsService : InvestmentsService, private currencyExchangeService : CurrencyExchangeService) { }

  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: null, selected: true }
    ]);

    //get authUser from resolver
    const user$ : Observable<User> = this.route.data.map((data : { authUser: User }) =>  {
      this.user = data.authUser;
      
      return data.authUser;
    });

    if (!this.investments.length) {
      this.getInvestments(user$);
    }

    this.getTeams(user$);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; //for debugging

    //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  /**
   * Get my teams from server
   */
  getTeams(user$ : Observable<User>) {
    const methodTrace = `${this.constructor.name} > getTeams() > `; //for debugging

    this.teams = [];
    this.getTeamsServiceRunning = true;

    const newSubscription = user$.switchMap((user) => {
      return this.teamsService.getTeams(user.email);
    }).subscribe(
      (teams : Team[]) => {
        this.teams = teams;
        
        this.getTeamsServiceRunning = false;
      },
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.getTeamsServiceRunning = false;
      }
    );

    this.subscription.add(newSubscription);
  }

  /**
   * Get my investments from server
   */
  getInvestments(user$ : Observable<User>) {
    const methodTrace = `${this.constructor.name} > getInvestments() > `; //for debugging

    this.investments = [];
    this.getInvestmentsServiceRunning = true;

    
    const newSubscription = user$.switchMap((user) => {
      return this.investmentsService.getInvestments(user.email);
    }).subscribe(
      (investments : Investment[]) => {
        this.investments = investments;
        
        //organize investments in rows of n-items to show in the view
        let investmentsRow : any[] = [];
        for (let item of investments) {
          if (investmentsRow.length < 2) {
            investmentsRow.push(item);
          } else {
            this.investmentsUI.push(investmentsRow);
            investmentsRow = [item];
          }
        }

        if (investmentsRow.length) {
          this.investmentsUI.push(investmentsRow);
        }

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

    this.subscription.add(newSubscription);
  }

  setTotals(totalReturns : any) : void {
    console.log(this.totals);
    this.totals[totalReturns.investmentId] = totalReturns;

    this.totalReturn = 0;
    this.totalInvestment = 0;
    this.myTotalInvestment = 0;
    this.myTotalReturn = 0;
    for (let investmentId of Object.keys(this.totals)) {
      this.totalReturn += this.totals[investmentId].investmentReturn;
      this.totalInvestment += this.totals[investmentId].investmentAmount;
      this.myTotalInvestment += this.totals[investmentId].myInvestmentAmount;
      this.myTotalReturn += this.totals[investmentId].myInvestmentReturn;
    }
    
  }

  /**
   * Removes the investment from the investments array and from the investmentUI array used in view
   */
  removeInvestment(deletedId : string) : void {
    const methodTrace = `${this.constructor.name} > removeInvestment() > `; //for debugging

    if (deletedId) {
      let index = 0;
      for (let investment of this.investments) {
        //update totals and break loop
        if (investment.id === deletedId) {
          //get my portion in the investment
          let myPortion = 0;
          for (let portion of investment.investmentDistribution) {
            if (this.user.email === portion.email) {
              myPortion = portion.percentage;
              break;
            }
          }
          console.log(myPortion);

          let currencyInvestment : CurrencyInvestment = <CurrencyInvestment>investment;
          if (currencyInvestment.type === INVESTMENTS_TYPES.CURRENCY) {
            this.currencyExchangeService.getCurrencyRates().take(1).subscribe((currencyRates) => {
              let investmentReturn = currencyInvestment.amount * (currencyRates[currencyInvestment.unit] || 1);
              let investmentAmount = this.currencyExchangeService.getUsdValueOf(currencyInvestment.investmentAmount, currencyInvestment.investmentAmountUnit);
              this.totalReturn -= investmentReturn;
              this.totalInvestment -= investmentAmount;
            },
            (error : any) => {
              this.appService.consoleLog('error', `${methodTrace} There was an error trying to get currency rates data > `, error);
              this.appService.showResults(`There was an error trying to get currency rates data, please try again in a few minutes.`, 'error');
            });
          } else if (investment.type === INVESTMENTS_TYPES.CRYPTO) {
            this.currencyExchangeService.getCryptoRates(currencyInvestment.unit).take(1).subscribe((rates) => {
              let investmentReturn = currencyInvestment.amount * rates.price;
              let investmentAmount = this.currencyExchangeService.getUsdValueOf(currencyInvestment.investmentAmount, currencyInvestment.investmentAmountUnit);
              this.totalReturn -= investmentReturn
              this.totalInvestment -= investmentAmount;
              this.myTotalReturn -= investmentReturn * myPortion;
              this.myTotalInvestment -= investmentAmount * myPortion;  
            },
            (error : any) => {
              this.appService.consoleLog('error', `${methodTrace} There was an error trying to get ${currencyInvestment.unit} rates data > `, error);
              this.appService.showResults(`There was an error trying to get ${currencyInvestment.unit} rates data, please try again in a few minutes.`, 'error');
            });
          }
          
          break;
        }

        index += 1;
      }
      //remove investment from array
      this.investments.splice(index, 1);

      //update ui array
      let row = 0;
      let offset = 0;
      let found = false;
      for (let i = 0; i < this.investmentsUI.length; i++) {
        for (let j = 0; j < this.investmentsUI[i].length; j++) {
          if (this.investmentsUI[i][j].id === deletedId) {
            row = i;
            offset = j;
            found = true;
            break;
          }
        }

        if (found) {
          break;
        }
      }

      this.investmentsUI[row].splice(offset, 1);
      if (!this.investmentsUI[row].length) {
        this.investmentsUI.splice(row, 1);
      }
    }
  }

  openNewInvestmentDialog() {
    let addPersonDialogRef = this.dialog.open(InvestmentSelectorDialogComponent, {});
    return false;
  }
}
