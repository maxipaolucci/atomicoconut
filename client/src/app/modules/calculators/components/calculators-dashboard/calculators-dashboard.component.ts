import { Component, OnInit } from '@angular/core';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';

@Component({
  selector: 'app-calculators-dashboard',
  templateUrl: './calculators-dashboard.component.html',
  styleUrls: ['./calculators-dashboard.component.scss']
})
export class CalculatorsDashboardComponent implements OnInit {

  constructor(private mainNavigatorService : MainNavigatorService) { }

  ngOnInit() {
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Calculators', url: null, selected: true },
      { displayName: 'Equity', url: '/calculators/equity', selected: false }]);
  }

}
