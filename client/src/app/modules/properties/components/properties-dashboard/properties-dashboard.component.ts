import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { SetLinks } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';


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
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: '/investments', selected: false },
      { displayName: 'Properties', url: null, selected: true },
      { displayName: 'Calculators', url: '/calculators/dashboard', selected: false }
    ]}));
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging
  }

}
