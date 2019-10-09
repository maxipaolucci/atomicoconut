import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../../util.service';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
      private mainNavigatorService: MainNavigatorService, 
      public utilService: UtilService
  ) { }

  ngOnInit() {
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'My account', url: null, selected: true }
    ]);
  }

  

}
