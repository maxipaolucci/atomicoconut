import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { SetLinks } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';
import { RoutingPaths } from 'src/app/constants';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'app-calculators-dashboard',
  templateUrl: './calculators-dashboard.component.html',
  styleUrls: ['./calculators-dashboard.component.scss']
})
export class CalculatorsDashboardComponent implements OnInit {

  constructor(private store: Store<State>, public utilService: UtilService) { }

  ngOnInit() {
    this.store.dispatch(new SetLinks({ links: [
      { displayName: 'Welcome', url: RoutingPaths.WELCOME, selected: false },
      { displayName: 'Calculators', url: null, selected: true },
      { displayName: 'Equity', url: `${RoutingPaths.CALCULATORS}/equity`, selected: false },
      { displayName: 'House figures', url: `${RoutingPaths.CALCULATORS}/house-figures`, selected: false }
    ]}));
  }

}
