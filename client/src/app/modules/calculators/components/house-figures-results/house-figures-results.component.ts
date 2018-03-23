import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'house-figures-results',
  templateUrl: './house-figures-results.component.html',
  styleUrls: ['./house-figures-results.component.scss']
})
export class HouseFiguresResultsComponent implements OnInit, OnChanges {

  @Input() title = null;
  @Input() subtitle = null;
  @Input() purchasePrice = 0;
  @Input() capitalGrowth = 0;
  @Input() marketValue = 0;
  @Input() loanCoverage = 0;
  @Input() interestRates = 0;
  @Input() loanTerm = 0;
  @Input() paymentFrecuency = "26";
  @Input() rentPrice = 0;
  @Input() rentPaymentFrecuency = "weekly";
  @Input() vacancy = 0;
  @Input() renovationCost = 0;
  @Input() mantainanceCost = 0;
  @Input() bodyCorporate = 0;
  @Input() houseRates = 0;
  @Input() utilities = 0;
  @Input() insurance = 0;
  @Input() otherCosts = 0;
  @Input() managed = 0;
  grossAnnualRent : number = 0;
  netAnnualRent : number = 0;
  grossYield : number = 0;
  netYield : number = 0;
  expenses : number = 0;
  loanInterest : number = 0;
  loanRepayments : number = 0;
  loanRepaymentsLabels : any = { '12': 'Monthly', '26' : 'Fortnightly', '52' : 'Weekly' };
  preTaxCashflow : number = 0;
  discount : number = 0;
  capitalGrowths : number = 0;
  totalFirstYearReturn : number = 0;
  deposit : number = 0;
  returnOnDeposit : number = 0;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //any time something changes then refresh all values
    let weeklyRent = this.getRentPricePerWeek();
    this.grossAnnualRent = weeklyRent * 52;
    this.netAnnualRent = this.grossAnnualRent - weeklyRent * this.vacancy;
    this.grossYield = this.grossAnnualRent / this.purchasePrice;
    this.expenses = this.renovationCost + this.mantainanceCost + this.bodyCorporate + this.houseRates + this.utilities + this.insurance
        + this.otherCosts + this.netAnnualRent * (this.managed / 100);
    this.netYield = (this.netAnnualRent - this.expenses) / this.purchasePrice;
    this.loanInterest = this.purchasePrice * (this.interestRates / 100);
    let numberOfPayments = this.loanTerm * parseInt(this.paymentFrecuency);
    let periodicInterestRate = (this.interestRates / 100) / parseInt(this.paymentFrecuency);
    let loanDiscountFactor = (Math.pow(1 + periodicInterestRate, numberOfPayments) - 1) / (periodicInterestRate * Math.pow(1 + periodicInterestRate, numberOfPayments));
    this.loanRepayments = (this.purchasePrice * (this.loanCoverage / 100)) / loanDiscountFactor; 
    this.preTaxCashflow = this.netAnnualRent - this.expenses - this.loanInterest;
    this.discount = (this.marketValue - this.purchasePrice - this.renovationCost) / (this.marketValue || 1);
    this.capitalGrowths = this.marketValue * (this.capitalGrowth / 100);
    this.totalFirstYearReturn = this.capitalGrowths + this.marketValue - this.purchasePrice - this.renovationCost + this.preTaxCashflow;
    this.deposit = this.purchasePrice * (1 - this.loanCoverage / 100);
    this.returnOnDeposit = this.totalFirstYearReturn / this.deposit;
  }

  /**
   * Calculates the price per week.
   */
  getRentPricePerWeek() : number {
    let price = 0;

    if (this.rentPrice) {
      price = this.rentPaymentFrecuency === 'monthly' ? this.rentPrice * 12 / 52 : this.rentPrice;
    }

    return price;
  }

}
