import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { YesNoDialogComponent } from '../../../shared/components/yes-no-dialog/yes-no-dialog.component';

import { AppService } from '../../../../app.service';
import { InvestmentsService } from '../../investments.service';
import { User } from '../../../users/models/user';
import { UsersService } from '../../../users/users.service';
import { Router } from '@angular/router';
import { CurrencyExchangeService } from '../../currency-exchange.service';
import { CurrencyInvestment } from '../../models/currencyInvestment';
import { BehaviorSubject, Subscription } from 'rxjs';
import { combineLatest, switchMap } from 'rxjs/operators';
import { Team } from '../../../teams/models/team';
import { INVESTMENTS_TYPES } from '../../../../constants';
import { UtilService } from '../../../../util.service';

@Component({
  selector: 'currency-investment',
  templateUrl: './currency-investment.component.html',
  styleUrls: ['./currency-investment.component.scss']
})
export class CurrencyInvestmentComponent implements OnInit, OnDestroy {

  @Input() investment: CurrencyInvestment;
  @Input()
  set teams(teams: Team[]) {
    this.teams$.next(teams);
  }
  get teams(): Team[] {
    return this.teams$.getValue();
  }
  @Output() totalReturns: EventEmitter<any> = new EventEmitter();
  @Output() deletedInvestment: EventEmitter<any> = new EventEmitter();
  private teams$ = new BehaviorSubject<Team[]>([]);
  investmentAmount = 0;
  buyingPrice = 0;
  investmentReturn = 0;
  investmentValueWhenBought = 0;
  currentPrice = 0;
  loanAmount = 0;
  actionRunning = false;
  user: User = null;
  team: Team = null; // if the investment has a tema this will be populated with the full info of the team
  investmentDistribution: any[] = [];
  subscription: Subscription = new Subscription();


  constructor(private currencyExchangeService: CurrencyExchangeService, private appService: AppService, private usersService: UsersService, private investmentsService: InvestmentsService, 
    public dialog: MatDialog, private router: Router, private utilService: UtilService) {}

  ngOnInit(): void {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    // get the team of the investmetn if exists
    let newSubscription = null;
    const currencyRates$ = this.currencyExchangeService.getCurrencyRates$([this.utilService.formatDate(this.investment.buyingDate)]); // get currency rates observable source
    const currencyRatesAndUser$ = this.usersService.user$.pipe(
      combineLatest(currencyRates$, (user, currencyRates) => {
        this.user = user;
        return { user, currencyRates};
      })
    ); // (currency rates and user) source
    
    if (this.investment.type === INVESTMENTS_TYPES.CRYPTO) {
      // crypto investment
      const cryptoRates$ = this.currencyExchangeService.getCryptoRates$(this.investment.unit); // get crypto rates observable source
      
      newSubscription = cryptoRates$.pipe(
        combineLatest(currencyRatesAndUser$, (cryptoRates, currencyRatesAndUser) => { 
          return  {
            currencyRates : currencyRatesAndUser.currencyRates,
            user : currencyRatesAndUser.user, 
            cryptoRates 
          }; 
        }),
        switchMap((data) => {
          this.currentPrice = Number(data.cryptoRates.priceUsd);
          // the investment amount was paid on the date of the investment so we need to convert using that day rates
          this.investmentAmount = this.investment.investmentAmount / (data.currencyRates[this.utilService.formatDate(this.investment.buyingDate)][`USD${this.investment.investmentAmountUnit}`] || 1);
          // the loan amount was requested on the date of the investment so we need to convert using that day rates
          this.loanAmount = this.investment.loanAmount / (data.currencyRates[this.utilService.formatDate(this.investment.buyingDate)][`USD${this.investment.loanAmountUnit}`] || 1);
          // the buying price (of the crypto) was paid on the date of the investment so we need to convert using that day rates
          this.buyingPrice = this.investment.buyingPrice / (data.currencyRates[this.utilService.formatDate(this.investment.buyingDate)][`USD${this.investment.buyingPriceUnit}`] || 1);
          this.investmentValueWhenBought = this.buyingPrice * this.investment.amount;
          this.investmentReturn = this.currentPrice * this.investment.amount - this.loanAmount;

          return this.teams$;
        })
      ).subscribe((teams: Team[]) => {
        this.setInvestmentTeamData(teams);
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error trying to generate investment data > `, error);
        this.appService.showResults(`There was an error trying to generate investment data, please try again in a few minutes.`, 'error');
      });
    } else {
      // currency exchange
      newSubscription = currencyRatesAndUser$.pipe(switchMap(
        (data) => {
          this.currentPrice = 1 / (data.currencyRates[this.utilService.formatToday()][`USD${this.investment.unit}`] || 1);
          // the investment amount was paid on the date of the investment so we need to convert using that day rates
          this.investmentAmount = this.investment.investmentAmount / (data.currencyRates[this.utilService.formatDate(this.investment.buyingDate)][`USD${this.investment.investmentAmountUnit}`] || 1);
          // the loan amount was requested on the date of the investment so we need to convert using that day rates
          this.loanAmount = this.investment.loanAmount / (data.currencyRates[this.utilService.formatDate(this.investment.buyingDate)][`USD${this.investment.loanAmountUnit}`] || 1);
          // the buying price (of the currency) was paid on the date of the investment so we need to convert using that day rates
          this.buyingPrice = this.investment.buyingPrice / (data.currencyRates[this.utilService.formatDate(this.investment.buyingDate)][`USD${this.investment.buyingPriceUnit}`] || 1);
          this.investmentValueWhenBought = this.buyingPrice * this.investment.amount;
          this.investmentReturn = this.currentPrice * this.investment.amount - this.loanAmount;

          return this.teams$;
        }
      )).subscribe((teams: Team[]) => {
        this.setInvestmentTeamData(teams);
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error trying to generate investment data > `, error);
        this.appService.showResults(`There was an error trying to generate investment data, please try again in a few minutes.`, 'error');
      });
    }
    this.subscription.add(newSubscription);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging

    // this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  /**
   * Populates team data as well as the distribution on the investment between team members when the investment is asigned to a team
   * 
   * @param {Team[]} teams . The teams of the current user
   */
  setInvestmentTeamData(teams: Team[]) {
    this.team = this.investment.team ? teams.filter(team => team.slug === this.investment.team.slug)[0] : null; // look for the team of the investment
    
    // set totals to emit to parent component. If no team assigned then the total of the investment is the same as my portion
    const totals = {
      investmentId : this.investment.id,
      investmentAmount : this.investmentAmount,
      investmentReturn : this.investmentReturn,
      myInvestmentAmount : this.investmentAmount,
      myInvestmentReturn : this.investmentReturn
    };

    if (this.team) {
      // if team is present then get my portion of the investment
      for (const member of this.team.members) {
        const percentage = (this.investment.investmentDistribution.filter(portion => portion.email === member.email)[0]).percentage;
        this.investmentDistribution.push({
          member,
          percentage,
          money : this.investmentReturn * percentage / 100
        });

        if (this.user && this.user.email === member.email) {
          totals.myInvestmentAmount = this.investmentAmount * percentage / 100;
          totals.myInvestmentReturn = this.investmentReturn * percentage / 100;  
        }
      }
    }

    this.totalReturns.emit(totals);
  }

  openDeleteDialog() {
    const methodTrace = `${this.constructor.name} > openDeleteDialog() > `; // for debugging
    
    if (!this.investment.id) {
      this.appService.consoleLog('error', `${methodTrace} Investment ID is required to delete.`);
      return false;
    }

    this.actionRunning = true;
    const yesNoDialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '250px',
      data: { 
        title : 'Delete investment',
        message : `Are you sure you want to delete this investment forever?`
      }
    });

    const newSubscription: Subscription = yesNoDialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.delete();
      } else {
        this.actionRunning = false;
      }
    });
    this.subscription.add(newSubscription);

    return false;
  }

  delete() {
    const methodTrace = `${this.constructor.name} > delete() > `; // for debugging
    if (this.user) {
      this.actionRunning = true;
      
      const newSubscription = this.investmentsService.delete$(this.investment.id, this.user.email).subscribe(
        (data: any) => {
          if (data && data.removed > 0) {
            this.appService.showResults(`Investment successfully removed!`, 'success');
            this.deletedInvestment.emit({ investment : this.investment, investmentReturn : this.investmentReturn, investmentAmount : this.investmentAmount });
          } else {
            this.appService.showResults(`Investment could not be removed, please try again.`, 'error');
            this.actionRunning = false;
          }
        },
        (error: any) => {
          this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
          if (error.codeno === 400) {
            this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
          } else {
            this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
          }
  
          this.actionRunning = false;
        }
      );

      this.subscription.add(newSubscription);
    } else {
      this.appService.showResults(`You are not logged into AtomiCoconut, you must login first.`, 'error');
      this.router.navigate(['/users/login']);
    }
  }
    
}
