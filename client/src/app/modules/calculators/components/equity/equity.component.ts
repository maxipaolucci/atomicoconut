import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equity',
  templateUrl: './equity.component.html',
  styleUrls: ['./equity.component.scss']
})
export class EquityComponent implements OnInit {

  private loanAmount : number = 0;
  private discount : number = 0;
  private equity : number = 0;
  private depositAmount : number = 0;
  private usableEquityAfterReno : number = 0;
  private addRenovations = false;

  private model : any = { 
    purchasePrice : 0,
    marketValue : 0,
    loanCoverage : 0.8,
    savings : 0,
    renovationCost : 0,
    newMarketValue : 0,
    firstYearRepayment : 0
  }

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    
  }

}
