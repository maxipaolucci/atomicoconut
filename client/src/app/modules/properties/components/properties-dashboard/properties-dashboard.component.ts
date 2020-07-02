import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { SetLinks } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';
import { RoutingPaths } from 'src/app/constants';

@Component({
  selector: 'properties-dashboard',
  templateUrl: './properties-dashboard.component.html',
  styleUrls: ['./properties-dashboard.component.scss']
})
export class PropertiesDashboardComponent implements OnInit, OnDestroy {
  
  constructor(private store: Store<State>) { }


  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.store.dispatch(new SetLinks({ links: [
      { displayName: 'Welcome', url: RoutingPaths.WELCOME, selected: false },
      { displayName: 'Investments', url: RoutingPaths.INVESTMENTS, selected: false },
      { displayName: 'Properties', url: null, selected: true },
      { displayName: 'Calculators', url: RoutingPaths.CALCULATORS, selected: false }
    ]}));
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging
  }

}
