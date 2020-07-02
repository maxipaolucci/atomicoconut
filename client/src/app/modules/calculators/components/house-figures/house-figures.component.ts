import { Component, OnInit } from '@angular/core';
import { SetLinks } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { RoutingPaths } from 'src/app/constants';

@Component({
  selector: 'app-house-figures',
  templateUrl: './house-figures.component.html',
  styleUrls: ['./house-figures.component.scss']
})
export class HouseFiguresComponent implements OnInit {

  model: any = { 
    purchasePrice : 0,
    capitalGrowth : 4,
    marketValue : 0,
    loanCoverage : 65,
    interestRates : 7,
    loanTerm : 30,
    paymentFrecuency : '26',
    rentPrice : 0,
    rentPaymentFrecuency : 'weekly',
    vacancy : 4,
    renovationCost : 0,
    maintenanceCost : 0,
    bodyCorporate : 0,
    houseRates : 2000,
    utilities : 0,
    insurance : 900,
    otherCosts : 0,
    managed : 10
  };

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new SetLinks({ links: [
      { displayName: 'Welcome', url: RoutingPaths.WELCOME, selected: false },
      { displayName: 'Calculators', url: RoutingPaths.CALCULATORS, selected: false },
      { displayName: 'Equity', url: `${RoutingPaths.CALCULATORS}/equity`, selected: false },
      { displayName: 'House figures', url: null, selected: true }
    ]}));
  }
}
