import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import _ from 'lodash';
import { SetLinks } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';


@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  constructor(
    private appService: AppService,
    private store: Store<State>
  ) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging
    
    this.store.dispatch(new SetLinks({ links: [
      { displayName: 'Welcome', url: null, selected: true },
      { displayName: 'Investments', url: '/investments', selected: false },
      { displayName: 'Properties', url: '/properties', selected: false },
      { displayName: 'Calculators', url: '/calculators', selected: false }
    ]}));
  }

  ngOnDestroy() {
    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }
}
