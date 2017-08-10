import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'app';
  private xmr$ : BehaviorSubject<any>;
  private xmrCount = 218;
  private xmrBuyPrice = 50; //USD
  private xmrBuyDate = new Date(2017, 5, 23);
  private usdFromXmr = 0;
  private usdFromXmrWhenBought = 0;
  private xmrCurrentPrice = 0;

  private btc$ : BehaviorSubject<any>;
  private btcCount = 1.28129356;
  private btcBuyPrice = 2359.99; //USD
  private btcBuyDate = new Date(2017, 6, 19);
  private usdFromBtc = 0;
  private usdFromBtcWhenBought = 0;
  private btcCurrentPrice = 0;

  private totalInvestment = 0;
  private totalReturn = 0;


  constructor(private appService: AppService) {
    
    this.usdFromXmrWhenBought = this.xmrBuyPrice * this.xmrCount;
    this.usdFromBtcWhenBought = this.btcBuyPrice * this.btcCount;
    this.totalInvestment = this.usdFromBtcWhenBought + this.usdFromXmrWhenBought;

    this.xmr$ = new BehaviorSubject<any>(null);
    this.btc$ = new BehaviorSubject<any>(null);
  }

  ngOnInit(): void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
    
    this.appService.getPrices('xmr').subscribe(
      (pricesData : any) => {
        this.xmr$.next(pricesData);
        this.xmrCurrentPrice = pricesData.price; 
        this.usdFromXmr = pricesData.price * this.xmrCount;
        this.totalReturn += this.usdFromXmr; 
      },
      (error : any) =>  console.error(`${methodTrace} There was an error trying to load Monero prices > ${error}`)
    );

    this.appService.getPrices().subscribe(
      (pricesData : any) => {
        this.btc$.next(pricesData);
        this.btcCurrentPrice = pricesData.price;
        this.usdFromBtc = pricesData.price * this.btcCount;
        this.totalReturn += this.usdFromBtc;
      },
      (error : any) =>  console.error(`${methodTrace} There was an error trying to load Bitcoin prices > ${error}`)
    );
  }


}
