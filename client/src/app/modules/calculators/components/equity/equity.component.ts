import { Component, OnInit, ViewChild } from '@angular/core';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';

@Component({
  selector: 'app-equity',
  templateUrl: './equity.component.html',
  styleUrls: ['./equity.component.scss']
})
export class EquityComponent implements OnInit {
  @ViewChild('equityForm') form;

  private loanAmount : number = 0;
  private discount : number = 0;
  private equity : number = 0;
  private depositAmount : number = 0;
  private usableEquityAfterReno : number = 0;

  private model : any = { 
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
      { displayName: 'Equity', url: null, selected: true }]);
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
