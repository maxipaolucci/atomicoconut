import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { YesNoDialogComponent } from '../../../shared/components/yes-no-dialog/yes-no-dialog.component';

import { CryptoCurrencyService } from './crypto-currency.service';
import { AppService } from '../../../../app.service';
import { InvestmentsService } from '../../investments.service';
import { User } from '../../../users/models/user';
import { UsersService } from '../../../users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'crypto-currency',
  templateUrl: './crypto-currency.component.html',
  styleUrls: ['./crypto-currency.component.scss']
})
export class CryptoCurrencyComponent implements OnInit {

  @Input() id : string;
  @Input() cryptoCurrency : string;
  @Input() cryptoCurrencyCount : number;
  @Input() cryptoCurrencyBuyPrice : number; //USD
  @Input() cryptoCurrencyBuyDate : Date;
  @Output() totalReturns: EventEmitter<any> = new EventEmitter();
  @Output() deletedId : EventEmitter<string> = new EventEmitter();
  usdFromCryptoCurrency : number = 0;
  usdFromCryptoCurrencyWhenBought : number = 0;
  cryptoCurrencyCurrentPrice : number = 0;
  actionRunning : boolean = false;
  user : User = null;


  constructor(private cryptoCurrencyService: CryptoCurrencyService, private appService : AppService, private usersService : UsersService, private investmentsService : InvestmentsService, 
    public dialog: MatDialog, private router : Router) {}

  ngOnInit() : void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    
    this.usersService.user$.subscribe((user : User) => this.user = user); //start listening the source of user

    this.usdFromCryptoCurrencyWhenBought = this.cryptoCurrencyBuyPrice * this.cryptoCurrencyCount;
    this.cryptoCurrencyService.getPrices(this.cryptoCurrency).subscribe(
      (pricesData : any) => {
        this.cryptoCurrencyCurrentPrice = pricesData.price; 
        this.usdFromCryptoCurrency = pricesData.price * this.cryptoCurrencyCount;
        this.totalReturns.emit({
          usdFromCryptoCurrencyWhenBought : this.usdFromCryptoCurrencyWhenBought,
          usdFromCryptoCurrency : this.usdFromCryptoCurrency
        }); 
      },
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error trying to get crypto currency rates data > ${error}`);
        this.appService.showResults(`There was an error trying to get crypto currency rates data, please try again in a few minutes.`, 'error');
      }
    );
  }

  openDeleteDialog() {
    const methodTrace = `${this.constructor.name} > openDeleteDialog() > `; //for debugging
    
    if (!this.id) {
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
      
      this.investmentsService.delete(this.id, this.user.email).subscribe(
        (data : any) => {
          if (data && data.removed > 0) {
            this.appService.showResults(`Investment successfully removed!`, 'success');
            this.deletedId.emit(this.id);
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
