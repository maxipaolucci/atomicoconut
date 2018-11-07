import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CurrencyExchangeService } from '../../currency-exchange.service';
import { CurrencyInvestment } from '../../models/currencyInvestment';
import { INVESTMENTS_TYPES } from '../../../../constants';
import { UtilService } from '../../../../util.service';
import { PropertyInvestment } from '../../models/PropertyInvestment';

@Component({
  selector: 'investments-dashboard',
  templateUrl: './investments-dashboard.component.html',
  styleUrls: ['./investments-dashboard.component.scss']
})
export class InvestmentsDashboardComponent implements OnInit, OnDestroy {
  investments: Investment[] = [];
  teams: Team[] = [];
  investmentsUI: any[] = []; // this is a structure to use in the view an make the rendering easier organizing the info in rows
  totalInvestment = 0;
  totalReturn = 0;
  myTotalInvestment = 0;
  myTotalReturn = 0;
  totals: any = {};
  user: User = null;
  subscription: Subscription = new Subscription();
  getInvestmentsServiceRunning = false;
  getTeamsServiceRunning = false;
  INVESTMENTS_TYPES: any = INVESTMENTS_TYPES; // make it available in the view

  constructor(private route: ActivatedRoute, private mainNavigatorService: MainNavigatorService, private usersService: UsersService, public dialog: MatDialog,
      private appService: AppService, private teamsService: TeamsService, private investmentsService: InvestmentsService, private currencyExchangeService: CurrencyExchangeService,
      private utilService: UtilService) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: null, selected: true },
      { displayName: 'Properties', url: '/properties', selected: false }
    ]);

    // get authUser from resolver
    const user$: Observable<User> = this.route.data.pipe(map((data: { authUser: User }) =>  {
      this.user = data.authUser;
      return data.authUser;
    }));

    if (!this.investments.length) {
      this.getInvestments(user$);
    }

    this.getTeams(user$);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  /**
   * Get my teams from server
   */
  getTeams(user$: Observable<User>) {
    const methodTrace = `${this.constructor.name} > getTeams() > `; // for debugging

    this.teams = [];
    this.getTeamsServiceRunning = true;

    const newSubscription = user$.pipe(switchMap((user) => {
      return this.teamsService.getTeams$(user.email);
    })).subscribe(
      (teams: Team[]) => {
        this.teams = teams;
        this.getTeamsServiceRunning = false;
      },
      (error: any) => {
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
  getInvestments(user$: Observable<User>) {
    const methodTrace = `${this.constructor.name} > getInvestments() > `; // for debugging

    this.investments = [];
    this.getInvestmentsServiceRunning = true;

    const newSubscription = user$.pipe(switchMap((user) => {
      return this.investmentsService.getInvestments$(user.email);
    })).subscribe(
      (investments: Investment[]) => {
        // organize investments in rows of n-items to show in the view
        let investmentsRow: any[] = [];
        const investmentsDates: string[] = [];

        for (const item of investments) {
          if (investmentsRow.length < 2) {
            investmentsRow.push(item);
          } else {
            this.investmentsUI.push(investmentsRow);
            investmentsRow = [item];
          }

          if (item instanceof CurrencyInvestment) {
            investmentsDates.push(this.utilService.formatDate((<CurrencyInvestment>item).buyingDate, 'YYYY-MM-DD'));
          } else if (item instanceof PropertyInvestment) {
            investmentsDates.push(this.utilService.formatDate((<PropertyInvestment>item).buyingDate, 'YYYY-MM-DD'));
          }
        }

        this.currencyExchangeService.getCurrencyRates$(investmentsDates); // lets retrieve investment dates for future usage in each investment

        if (investmentsRow.length) {
          this.investmentsUI.push(investmentsRow);
        }

        this.investments = investments;
        this.getInvestmentsServiceRunning = false;
      },
      (error: any) => {
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

  setTotals(totalReturns: any): void {
    // update the total that matches the id
    this.totals[totalReturns.investmentId] = totalReturns;
    // reset totals
    this.totalReturn = 0;
    this.totalInvestment = 0;
    this.myTotalInvestment = 0;
    this.myTotalReturn = 0;

    // re calculate totals
    for (const investmentId of Object.keys(this.totals)) {
      this.totalReturn += this.totals[investmentId].investmentReturn;
      this.totalInvestment += this.totals[investmentId].investmentAmount;
      this.myTotalInvestment += this.totals[investmentId].myInvestmentAmount;
      this.myTotalReturn += this.totals[investmentId].myInvestmentReturn;
    }

  }

  /**
   * Removes the investment from the investments array and from the investmentUI array used in view. Also reduces the totals in the inveestment amount
   */
  removeInvestment(investmentData: any): void {
    const methodTrace = `${this.constructor.name} > removeInvestment() > `; // for debugging

    let investment = investmentData.investment;
    if (investment) {
      // get my portion in the investment
      let myPortion = 0;
      for (const portion of investment.investmentDistribution) {
        if (this.user.email === portion.email) {
          myPortion = portion.percentage;
          break;
        }
      }

      // update totals row
      let investmentReturn = investmentData.investmentReturn;
      let investmentAmount = investmentData.investmentAmount;
      this.totalReturn -= investmentReturn;
      this.totalInvestment -= investmentAmount;
      this.myTotalReturn -= investmentReturn * myPortion / 100;
      this.myTotalInvestment -= investmentAmount * myPortion / 100;

      // remove investment from array
      let index = 0;
      for (const investmentToDelete of this.investments) {
        if (investment.id === investmentToDelete.id) {
          break;
        }

        index += 1;
      }
      this.investments.splice(index, 1);

      // update ui array
      let row = 0;
      let offset = 0;
      let found = false;
      for (let i = 0; i < this.investmentsUI.length; i++) {
        for (let j = 0; j < this.investmentsUI[i].length; j++) {
          if (this.investmentsUI[i][j].id === investment.id) {
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
    const addPersonDialogRef = this.dialog.open(InvestmentSelectorDialogComponent, {});
    return false;
  }
}
