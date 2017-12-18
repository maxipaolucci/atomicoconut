import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { YesNoDialogComponent } from '../../../shared/components/yes-no-dialog/yes-no-dialog.component';

import { AppService } from '../../../../app.service';
import { InvestmentsService } from '../../investments.service';
import { User } from '../../../users/models/user';
import { UsersService } from '../../../users/users.service';
import { Router } from '@angular/router';
import { CurrencyExchangeService } from '../../currency-exchange.service';
import { CurrencyInvestment } from '../../models/currencyInvestment';

@Component({
  selector: 'currency-investment',
  templateUrl: './currency-investment.component.html',
  styleUrls: ['./currency-investment.component.scss']
})
export class CurrencyInvestmentComponent implements OnInit {

  @Input() investment : CurrencyInvestment;
  @Output() totalReturns: EventEmitter<any> = new EventEmitter();
  @Output() deletedId : EventEmitter<string> = new EventEmitter();
  currentUsdValue : number = 0;
  usdValueWhenBought : number = 0;
  currentPrice : number = 0;
  actionRunning : boolean = false;
  user : User = null;


  constructor(private currencyExchangeService: CurrencyExchangeService, private appService : AppService, private usersService : UsersService, private investmentsService : InvestmentsService, 
    public dialog: MatDialog, private router : Router) {}

  ngOnInit() : void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    
    this.usersService.user$.subscribe((user : User) => this.user = user); //start listening the source of user

    this.usdValueWhenBought = this.investment.buyingPrice * this.investment.amount;
    
    if (this.investment.type === 'crypto') {
      //crypto investment
      this.currencyExchangeService.getCryptoRates(this.investment.unit).subscribe(
        (data : any) => {
          this.currentPrice = data.price; 
          this.currentUsdValue = data.price * this.investment.amount;
          this.totalReturns.emit({
            usdValueWhenBought : this.usdValueWhenBought,
            currentUsdValue : this.currentUsdValue
          }); 
        },
        (error : any) => {
          this.appService.consoleLog('error', `${methodTrace} There was an error trying to get crypto currency rates data > ${error}`);
          this.appService.showResults(`There was an error trying to get crypto currency rates data, please try again in a few minutes.`, 'error');
        }
      );
    } else {
      //currency exchange
      this.currencyExchangeService.getCurrencyRates().subscribe(
        (data : any) => {
          this.currentPrice = data[this.investment.unit] || 0; 
          this.currentUsdValue = data[this.investment.unit] * this.investment.amount || 0;
          this.totalReturns.emit({
            usdValueWhenBought : this.usdValueWhenBought,
            currentUsdValue : this.currentUsdValue
          }); 
        },
        (error : any) => {
          this.appService.consoleLog('error', `${methodTrace} There was an error trying to get crypto currency rates data > ${error}`);
          this.appService.showResults(`There was an error trying to get crypto currency rates data, please try again in a few minutes.`, 'error');
        }
      );
    }
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
      
      this.investmentsService.delete(this.investment.id, this.user.email).subscribe(
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
    } else {
      this.appService.showResults(`You are not logged into AtomiCoconut, you must login first.`, 'error');
      this.router.navigate(['/users/login']);
    }
  }
    
}
