import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { SetLinks } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';

@Component({
  selector: 'app-calculators-dashboard',
  templateUrl: './calculators-dashboard.component.html',
  styleUrls: ['./calculators-dashboard.component.scss']
})
export class CalculatorsDashboardComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new SetLinks({ links: [
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Calculators', url: null, selected: true },
      { displayName: 'Equity', url: '/calculators/equity', selected: false },
      { displayName: 'House figures', url: '/calculators/house-figures', selected: false }
    ]}));
  }

}
