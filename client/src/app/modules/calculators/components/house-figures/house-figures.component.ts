import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';

@Component({
  selector: 'app-house-figures',
  templateUrl: './house-figures.component.html',
  styleUrls: ['./house-figures.component.scss']
})
export class HouseFiguresComponent implements OnInit, AfterViewInit {

  @ViewChild('houseFiguresForm') form;
  grossAnnualRent : number = 0;
  netAnnualRent : number = 0;
  grossYield : number = 0;
  netYield : number = 0;
  expenses : number = 0;
  loanInterest : number = 0;
  preTaxCashflow : number = 0;
  discount : number = 0;
  capitalGrowths : number = 0;
  totalFirstYearReturn : number = 0;
  deposit : number = 0;
  returnOnDeposit : number = 0;

  model : any = { 
    purchasePrice : 0,
    capitalGrowth : 4,
    marketValue : 0,
    loanCoverage : 65,
    interestRates : 7,
    weeklyRent : 0,
    vacancy : 4,
    renovationCost : 0,
    mantainanceCost : 0,
    bodyCorporate : 0,
    houseRates : 2000,
    utilities : 0,
    insurance : 900,
    otherCosts : 0,
    managed : 10
  }

  constructor(private mainNavigatorService : MainNavigatorService) { }

  ngOnInit() {
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Calculators', url: '/calculators', selected: false },
      { displayName: 'Equity', url: '/calculators/equity', selected: false },
      { displayName: 'House figures', url: null, selected: true }]);
  }

  ngAfterViewInit() {
    this.form.valueChanges.debounceTime(500).subscribe(values => {
      this.grossAnnualRent = this.model.weeklyRent * 52;
      this.netAnnualRent = this.grossAnnualRent - this.model.weeklyRent * this.model.vacancy;
      this.grossYield = this.grossAnnualRent / this.model.purchasePrice;
      this.expenses = this.model.renovationCost + this.model.mantainanceCost + this.model.bodyCorporate + this.model.houseRates + this.model.utilities + this.model.insurance
          + this.model.otherCosts + this.netAnnualRent * (this.model.managed / 100);
      this.netYield = (this.netAnnualRent - this.expenses) / this.model.purchasePrice;
      this.loanInterest = this.model.purchasePrice * (this.model.loanCoverage / 100) * (this.model.interestRates / 100);
      this.preTaxCashflow = this.netAnnualRent - this.expenses - this.loanInterest;
      this.discount = (this.model.marketValue - this.model.purchasePrice - this.model.renovationCost) / (this.model.marketValue || 1);
      this.capitalGrowths = this.model.marketValue * (this.model.capitalGrowth / 100);
      this.totalFirstYearReturn = this.capitalGrowths + this.model.marketValue - this.model.purchasePrice - this.model.renovationCost + this.preTaxCashflow;
      this.deposit = this.model.purchasePrice * (1 - this.model.loanCoverage / 100);
      this.returnOnDeposit = this.totalFirstYearReturn / this.deposit;
    });
  }
}
