import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';

@Component({
  selector: 'properties-dashboard',
  templateUrl: './properties-dashboard.component.html',
  styleUrls: ['./properties-dashboard.component.scss']
})
export class PropertiesDashboardComponent implements OnInit, OnDestroy {
  
  constructor(
      private mainNavigatorService: MainNavigatorService
  ) { }


  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: '/investments', selected: false },
      { displayName: 'Properties', url: null, selected: true },
      { displayName: 'Calculators', url: '/calculators', selected: false }
    ]);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging
  }

}
