import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CryptoCurrencyService } from './crypto-currency.service';
import { AppService } from '../../../../app.service';
@Component({
  selector: 'crypto-currency',
  templateUrl: './crypto-currency.component.html',
  styleUrls: ['./crypto-currency.component.scss']
})
export class CryptoCurrencyComponent implements OnInit {

  @Input() cryptoCurrency : string;
  @Input() cryptoCurrencyCount : number;
  @Input() cryptoCurrencyBuyPrice : number; //USD
  @Input() cryptoCurrencyBuyDate : Date;
  public usdFromCryptoCurrency : number = 0;
  public usdFromCryptoCurrencyWhenBought : number = 0;
  public cryptoCurrencyCurrentPrice : number = 0;
  @Output() totalReturns: EventEmitter<any> = new EventEmitter();

  constructor(private cryptoCurrencyService: CryptoCurrencyService, private appService : AppService) {}

  ngOnInit() : void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    
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
}
