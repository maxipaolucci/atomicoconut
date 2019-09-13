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
import { Observable, Subscription, of } from 'rxjs';
import { map, switchMap, flatMap } from 'rxjs/operators';
import { CurrencyExchangeService } from '../../currency-exchange.service';
import { CurrencyInvestment } from '../../models/currencyInvestment';
import { INVESTMENTS_TYPES, SnackbarNotificationTypes, ConsoleNotificationTypes } from '../../../../constants';
import { UtilService } from '../../../../util.service';
import { PropertyInvestment } from '../../models/propertyInvestment';

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
    const newSubscription = this.route.data.pipe(
      map((data: { authUser: User }): User =>  {
        this.user = data.authUser;
        this.bindToPushNotificationEvents();

        return data.authUser;
      }), 
      flatMap((user: User): Observable<Investment[]> => {
        this.getTeams(); // I don't care when this come back
        return this.getInvestments$();
      })
    ).subscribe(
      (investments: Investment[]) => {
        this.organizeInvestmentsData(investments);
        this.getInvestmentsServiceRunning = false;
      },
      (error: any) => {
        this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, SnackbarNotificationTypes.ERROR);
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, SnackbarNotificationTypes.ERROR);
        }

        this.getInvestmentsServiceRunning = false;
      }
    );

    this.subscription.add(newSubscription);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
    this.unbindToPushNotificationEvents();
  }

  /**
   * Start listening to Pusher notifications comming from server
   */
  bindToPushNotificationEvents() {
    // when a user updates an investment
    this.appService.pusherChannel.bind('investment-updated', data => {
      let reloadData = this.investments.some((investment : Investment) => investment.id == data.investment.id);
      if (!reloadData && data.investment.team) {
        // check if the updated investment was associated to one of my teams
        reloadData = data.investment.team.members.some((member: any) => member.email == this.user.email);
      }

      if (!reloadData) {
        return;
      }

      this.fetchInvestmentsSilently();
    });

    // when a user removes an investment
    this.appService.pusherChannel.bind('investment-deleted', data => {
      let reloadData = this.investments.some((investment : Investment) => investment.id == data.investment.id);
      if (!reloadData) {
        return;
      }

      this.fetchInvestmentsSilently();
    });

    // when a user creates an investment
    this.appService.pusherChannel.bind('investment-created', data => {
      let reloadData = data.investment.team && data.investment.team.members.some((member: any) => member.email == this.user.email);
      if (!reloadData) {
        return;
      }

      this.fetchInvestmentsSilently();
    });

    // when a user updates a team
    this.appService.pusherChannel.bind('team-updated', data => {
      let reloadData = data.team && data.team.memberState[this.user.email];
      
      if (!reloadData) {
        return;
      }

      this.fetchTeamsSilently();
      this.fetchInvestmentsSilently();
    });
  }

  /**
   * Stop listening to Pusher notifications comming from server
   */
  unbindToPushNotificationEvents() {
    this.appService.pusherChannel.unbind('investment-deleted');
    this.appService.pusherChannel.unbind('investment-updated');
    this.appService.pusherChannel.unbind('investment-created');
    this.appService.pusherChannel.unbind('team-updated');
  }

  /**
   * Organize investments into a kind of matrix to allow show it in the view as a grid
   * 
   * @param {Array<Investment>} investments . The investments of the user to organize
   */
  organizeInvestmentsData(investments : Investment[]) {
    const methodTrace = `${this.constructor.name} > organizeInvestmentsData$() > `; // for debugging

    let investmentsRow: any[] = [];
    const investmentsDates: string[] = [];

    this.totals = {}; //empty totals object to be refilled with the set of investments
    this.investmentsUI = [];
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

    if (investmentsRow.length) {
      this.investmentsUI.push(investmentsRow);
    }

    this.currencyExchangeService.getCurrencyRates$(investmentsDates); // lets retrieve investment dates for future usage in each investment
    this.investments = investments;
  }

  /**
   * Refetch silently the user investments from the server, and update the investment data in the background
   */
  fetchInvestmentsSilently() {
    const methodTrace = `${this.constructor.name} > fetchInvestmentsSilently$() > `; // for debugging

    const newSubscription = this.fetchInvestments$().subscribe((investments : Investment[]) => this.organizeInvestmentsData(investments));
    this.subscription.add(newSubscription);
  }

  /**
   * Make and explicit request for user investments to the server and returns an investments observable
   * 
   * @return { Observable<Investment[]> }
   */
  getInvestments$(): Observable<Investment[]>  {
    const methodTrace = `${this.constructor.name} > getInvestments$() > `; // for debugging

    this.investments = [];
    this.getInvestmentsServiceRunning = true;

    return this.fetchInvestments$();
  }

  /**
   * Get a investments observable from server
   * 
   * @return { Observable<Investment[]> }
   */
  fetchInvestments$(): Observable<Investment[]> {
    const methodTrace = `${this.constructor.name} > fetchInvestments$() > `; // for debugging

    return this.investmentsService.getInvestments$(this.user.email);
  }

  /**
   * Get my teams from server
   */
  getTeams() {
    const methodTrace = `${this.constructor.name} > getTeams() > `; // for debugging

    this.teams = [];
    this.getTeamsServiceRunning = true;

    const newSubscription = this.fetchTeams$().subscribe(
      (teams: Team[]) => {
        this.teams = teams;
        this.getTeamsServiceRunning = false;
      },
      (error: any) => {
        this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, SnackbarNotificationTypes.ERROR);
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, SnackbarNotificationTypes.ERROR);
        }

        this.getTeamsServiceRunning = false;
      }
    );

    this.subscription.add(newSubscription);
  }

  /**
   * Refetch silently the user teams from the server, and update the teams data in the background
   */
  fetchTeamsSilently() {
    const methodTrace = `${this.constructor.name} > fetchTeamsSilently$() > `; // for debugging

    const newSubscription = this.fetchTeams$().subscribe((teams : Team[]) => this.teams = teams);
    this.subscription.add(newSubscription);
  }

  /**
   * Get a teams observable from server
   * 
   * @return { Observable<Team[]> }
   */
  fetchTeams$(): Observable<Team[]> {
    const methodTrace = `${this.constructor.name} > fetchTeams$() > `; // for debugging
    
    return this.teamsService.getTeams$(this.user.email);
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

    const investment = investmentData.investment;
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
      const investmentReturn = investmentData.investmentReturn;
      const investmentAmount = investmentData.investmentAmount;
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
