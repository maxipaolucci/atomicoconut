import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {
  private xmrBuyDate : Date = new Date(2017, 5, 23); //month minus 1, 5 = june
  private xmrBuyDate2 : Date = new Date(2017, 8, 23);
  private xmrBuyDate3 : Date = new Date(2017, 8, 25);
  private btcBuyDate : Date = new Date(2017, 6, 19);
  private totalInvestment = 0;
  private totalReturn = 0;


  constructor() {}

  ngOnInit(): void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging
  }


  setTotals(totalReturns : any) : void {
    this.totalReturn += totalReturns.usdFromCryptoCurrency;
    this.totalInvestment += totalReturns.usdFromCryptoCurrencyWhenBought;
  }
}
