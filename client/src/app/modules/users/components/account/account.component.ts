import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../../util.service';
import { SetLinks } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private store: Store<State>,
    public utilService: UtilService
  ) { }

  ngOnInit() {
    this.store.dispatch(new SetLinks({ links: [
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'My account', url: null, selected: true }
    ]}));
  }

  

}
