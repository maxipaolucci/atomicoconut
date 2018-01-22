import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';

@Component({
  selector: 'app-equity',
  templateUrl: './equity.component.html',
  styleUrls: ['./equity.component.scss']
})
export class EquityComponent implements OnInit, AfterViewInit {
  @ViewChild('equityForm') form;

  loanAmount : number = 0;
  discount : number = 0;
  equity : number = 0;
  depositAmount : number = 0;
  usableEquityAfterReno : number = 0;

  model : any = { 
    purchasePrice : 0,
    marketValue : 0,
    loanCoverage : 0.8,
    savings : 0,
    renovationCost : 0,
    newMarketValue : 0,
    firstYearRepayment : 0,
    addRenovations : false
  }

  constructor(private mainNavigatorService : MainNavigatorService) { }

  ngOnInit() {
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Calculators', url: '/calculators', selected: false },
      { displayName: 'Equity', url: null, selected: true },
      { displayName: 'House figures', url: '/calculators/house-figures', selected: false }]);
  }

  ngAfterViewInit() {
    this.form.valueChanges.debounceTime(500).subscribe(values => {
      this.loanAmount = values.purchasePrice * values.loanCoverage;
      this.discount = values.marketValue - values.purchasePrice;
      this.depositAmount = values.purchasePrice - this.loanAmount;
      this.equity = values.savings + this.discount + this.depositAmount;
      if (values.addRenovations) {
        this.usableEquityAfterReno = values.newMarketValue * 0.8 - this.loanAmount + values.firstYearRepayment;
      }
    });
  }

}
