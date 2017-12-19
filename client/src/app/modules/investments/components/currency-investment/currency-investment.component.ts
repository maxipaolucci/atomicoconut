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
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Team } from '../../../teams/models/team';

@Component({
  selector: 'currency-investment',
  templateUrl: './currency-investment.component.html',
  styleUrls: ['./currency-investment.component.scss']
})
export class CurrencyInvestmentComponent implements OnInit, OnDestroy {

  @Input() investment : CurrencyInvestment;
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
  subscription : Subscription = new Subscription();


  constructor(private currencyExchangeService: CurrencyExchangeService, private appService : AppService, private usersService : UsersService, private investmentsService : InvestmentsService, 
    public dialog: MatDialog, private router : Router) {}

  ngOnInit() : void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    
    //get the team of the investmetn if exists
    let newSubscription = this.teams$.subscribe((teams : Team[]) => {
      this.team = this.investment.team ? teams.filter(team => team.slug === this.investment.team.slug)[0] : null; //look for the team of the investment
      
      if (this.team) {
        for (let member of this.team.members) {
          let percentage = (this.investment.investmentDistribution.filter(portion => portion.email === member.email)[0]).percentage;
          member['portion_percentage'] = percentage;
        }
      }
    });
    this.subscription.add(newSubscription);

    const currencyRates$ = this.currencyExchangeService.getCurrencyRates(); //get currency rates observable source
    const currencyRatesAndUser$ = this.usersService.user$.combineLatest(currencyRates$, 
      (user, currencyRates) => { 
        this.user = user;
        
        return { user, currencyRates} 
      }
    ); //(currency rates and user) source
    
    
    if (this.investment.type === 'crypto') {
      //crypto investment
      const cryptoRates$ = this.currencyExchangeService.getCryptoRates(this.investment.unit); //get crypto rates observable source
      
      newSubscription = cryptoRates$.combineLatest(currencyRatesAndUser$, (cryptoRates, currencyRatesAndUser) => { 
        return  {
          currencyRates : currencyRatesAndUser.currencyRates,
          user : currencyRatesAndUser.user, 
          cryptoRates 
        }; 
      }).subscribe(
        (data) => {
          this.currentPrice = data.cryptoRates.price;
          this.investmentAmount = this.currencyExchangeService.getUsdValueOf(this.investment.investmentAmount, this.investment.investmentAmountUnit);
          this.buyingPrice = this.currencyExchangeService.getUsdValueOf(this.investment.buyingPrice, this.investment.buyingPriceUnit);
          this.investmentValueWhenBought = this.buyingPrice * this.investment.amount;
          this.investmentReturn = this.currentPrice * this.investment.amount;
          this.totalReturns.emit({
            investmentAmount : this.investmentAmount,
            investmentReturn : this.investmentReturn
          });
        },
        (error : any) => {
          this.appService.consoleLog('error', `${methodTrace} There was an error trying to get crypto currency rates data > ${error}`);
          this.appService.showResults(`There was an error trying to get crypto currency rates data, please try again in a few minutes.`, 'error');
        }
      );
    } else {
      //currency exchange
      newSubscription = currencyRatesAndUser$.subscribe(
        (data : any) => {
          this.currentPrice = data.currencyRates[this.investment.unit] || 0;
          this.investmentAmount = this.currencyExchangeService.getUsdValueOf(this.investment.investmentAmount, this.investment.investmentAmountUnit);
          this.buyingPrice = this.currencyExchangeService.getUsdValueOf(this.investment.buyingPrice, this.investment.buyingPriceUnit);
          this.investmentValueWhenBought = this.buyingPrice * this.investment.amount;
          this.investmentReturn = this.currentPrice * this.investment.amount;
          this.totalReturns.emit({
            investmentAmount : this.investmentAmount,
            investmentReturn : this.investmentReturn
          });
        },
        (error : any) => {
          this.appService.consoleLog('error', `${methodTrace} There was an error trying to get currency rates data > ${error}`);
          this.appService.showResults(`There was an error trying to get currency rates data, please try again in a few minutes.`, 'error');
        }
      );
    }
    this.subscription.add(newSubscription);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; //for debugging

    //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
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
      data: { message : `Are you sure you want to delete forever this investment?`}
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
