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
  usableEquity : number = 0;
  purchaseCapacity : number = 0;

  model : any = { 
    purchasePrice : 0,
    marketValue : 0,
    loanCoverage : 80,
    savings : 0,
    renovationCost : 0,
    loanAmountPaid : 0,
    secondLoanCoverage : 65
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
      this.loanAmount = values.purchasePrice * (values.loanCoverage / 100);
      this.discount = values.marketValue - values.purchasePrice - values.renovationCost;
      this.depositAmount = values.purchasePrice - this.loanAmount;
      this.equity = values.savings + this.discount + this.depositAmount;
      this.usableEquity = values.marketValue * (this.model.loanCoverage / 100) - this.loanAmount + values.loanAmountPaid + values.savings;
      this.purchaseCapacity = (this.usableEquity * 100) / (100 - values.secondLoanCoverage);

    });
  }

}
