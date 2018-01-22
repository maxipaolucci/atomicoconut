import { Component, OnInit } from '@angular/core';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';

@Component({
  selector: 'app-house-figures',
  templateUrl: './house-figures.component.html',
  styleUrls: ['./house-figures.component.scss']
})
export class HouseFiguresComponent implements OnInit {

  model : any = { 
    purchasePrice : 0,
    capitalGrowth : 0.04,
    marketValue : 0,
    loanCoverage : 0.65,
    interestRates : 0.07,
    weeklyRent : 0,
    vacancy : 4,
    renovationCost : 0,
    mantainanceCost : 0,
    bodyCorporate : 0,
    houseRates : 2000,
    utilities : 0,
    insurance : 900,
    otherCosts : 0,
    managed : 0.8
  }

  constructor(private mainNavigatorService : MainNavigatorService) { }

  ngOnInit() {
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Calculators', url: '/calculators', selected: false },
      { displayName: 'Equity', url: '/calculators/equity', selected: false },
      { displayName: 'House figures', url: null, selected: true }]);
  }

}
