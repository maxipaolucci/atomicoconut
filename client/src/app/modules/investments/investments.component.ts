import { Component, OnInit } from '@angular/core';
import { MainNavigatorService } from '../shared/components/main-navigator/main-navigator.service';

@Component({
  selector: 'investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {
  
  constructor(private mainNavigatorService : MainNavigatorService) {}

  ngOnInit(): void {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: null, selected: true }]);
  }
}
