import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import _ from 'lodash';
import { SetLinks } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';
import { RoutingPaths } from 'src/app/constants';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  constructor(
    private appService: AppService,
    private store: Store<State>,
    public utilService: UtilService
  ) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging
    
    this.store.dispatch(new SetLinks({ links: [
      { displayName: 'Welcome', url: null, selected: true },
      { displayName: 'Investments', url: RoutingPaths.INVESTMENTS, selected: false },
      { displayName: 'Properties', url: RoutingPaths.PROPERTIES, selected: false },
      { displayName: 'Calculators', url: RoutingPaths.CALCULATORS, selected: false }
    ]}));
  }

  ngOnDestroy() {
    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }
}
