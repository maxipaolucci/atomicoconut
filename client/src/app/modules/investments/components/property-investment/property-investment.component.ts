import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyInvestment } from '../../models/PropertyInvestment';
import { Team } from '../../../teams/models/team';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../../../users/models/user';
import { CurrencyExchangeService } from '../../currency-exchange.service';
import { AppService } from '../../../../app.service';
import { UsersService } from '../../../users/users.service';
import { InvestmentsService } from '../../investments.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { YesNoDialogComponent } from '../../../shared/components/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-property-investment',
  templateUrl: './property-investment.component.html',
  styleUrls: ['./property-investment.component.scss']
})
export class PropertyInvestmentComponent implements OnInit {

  @Input() investment : PropertyInvestment;
  @Input()
  set teams(teams : Team[]) {
    this.teams$.next(teams);
  }
  get teams() : Team[] {
    return this.teams$.getValue();
  }
  @Output() totalReturns: EventEmitter<any> = new EventEmitter();
  @Output() deletedId : EventEmitter<string> = new EventEmitter();
  private teams$ = new BehaviorSubject<Team[]>([]);
  investmentAmount : number = 0;
  buyingPrice : number = 0;
  investmentReturn : number = 0;
  investmentValueWhenBought : number = 0;
  currentPrice : number = 0;
  actionRunning : boolean = false;
  user : User = null;
  team : Team = null; //if the investment has a tema this will be populated with the full info of the team
  investmentDistribution : any[] = [];
  subscription : Subscription = new Subscription();


  constructor(private currencyExchangeService: CurrencyExchangeService, private appService : AppService, private usersService : UsersService, private investmentsService : InvestmentsService, 
    public dialog: MatDialog, private router : Router) {}

  ngOnInit() : void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    
    //get the team of the investmetn if exists
    let newSubscription = null;
    const currencyRates$ = this.currencyExchangeService.getCurrencyRates(); //get currency rates observable source
    const currencyRatesAndUser$ = this.usersService.user$.combineLatest(currencyRates$, 
      (user, currencyRates) => { 
        this.user = user;
        
        return { user, currencyRates} 
      }
    ); //(currency rates and user) source
    
    newSubscription = currencyRatesAndUser$.switchMap(
      (data) => {
        this.currentPrice = data.currencyRates[this.investment.investmentAmountUnit] || 1;
        this.investmentAmount = this.currencyExchangeService.getUsdValueOf(this.investment.investmentAmount, this.investment.investmentAmountUnit);
        this.buyingPrice = this.currencyExchangeService.getUsdValueOf(this.investment.buyingPrice, this.investment.buyingPriceUnit);
        this.investmentValueWhenBought = this.buyingPrice;
        this.investmentReturn = this.investmentAmount;

        return this.teams$;
      }
    ).subscribe((teams : Team[]) => {
      this.setInvestmentTeamData(teams);
    },
    (error : any) => {
      this.appService.consoleLog('error', `${methodTrace} There was an error trying to generate investment data > `, error);
      this.appService.showResults(`There was an error trying to generate investment data, please try again in a few minutes.`, 'error');
    });

    this.subscription.add(newSubscription);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; //for debugging

    //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  /**
   * Populates team data as well as the distribution on the investment between team members when the investment is asigned to a team
   * 
   * @param {Team[]} teams . The teams of the current user
   */
  setInvestmentTeamData(teams : Team[]) {
    this.team = this.investment.team ? teams.filter(team => team.slug === this.investment.team.slug)[0] : null; //look for the team of the investment
    
    //set totals to emit to parent component. If no team assigned then the total of the investment is the same as my portion
    let totals = {
      investmentId : this.investment.id,
      investmentAmount : this.investmentAmount,
      investmentReturn : this.investmentReturn,
      myInvestmentAmount : this.investmentAmount,
      myInvestmentReturn : this.investmentReturn
    };

    if (this.team) {
      //if team is present then get my portion of the investment
      for (let member of this.team.members) {
        let percentage = (this.investment.investmentDistribution.filter(portion => portion.email === member.email)[0]).percentage;
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
    const methodTrace = `${this.constructor.name} > openDeleteDialog() > `; //for debugging
    
    if (!this.investment.id) {
      this.appService.consoleLog('error', `${methodTrace} Investment ID is required to delete.`);
      return false;
    }

    this.actionRunning = true;
    let yesNoDialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '250px',
      data: { 
        title : 'Delete investment',
        message : `Are you sure you want to delete this investment forever?`
      }
    });

    yesNoDialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.delete();
      } else {
        this.actionRunning = false;
      }
    });

    return false;
  }

  delete() {
    const methodTrace = `${this.constructor.name} > delete() > `; //for debugging
    if (this.user) {
      this.actionRunning = true;
      
      const newSubscription = this.investmentsService.delete(this.investment.id, this.user.email).subscribe(
        (data : any) => {
          if (data && data.removed > 0) {
            this.appService.showResults(`Investment successfully removed!`, 'success');
            this.deletedId.emit(this.investment.id);
          } else {
            this.appService.showResults(`Investment could not be removed, please try again.`, 'error');
            this.actionRunning = false;
          }
        },
        (error : any) => {
          this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
          if (error.codeno === 400) {
            this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
          } else {
            this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
          }
  
          this.actionRunning = false;
        }
      );

      this.subscription.add(newSubscription)
    } else {
      this.appService.showResults(`You are not logged into AtomiCoconut, you must login first.`, 'error');
      this.router.navigate(['/users/login']);
    }
  }

}
