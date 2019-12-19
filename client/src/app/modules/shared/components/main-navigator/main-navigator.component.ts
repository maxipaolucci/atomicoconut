import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigatorLinkModel } from './models/navigator-link-model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { linksSelector } from './main-navigator.selectors';

@Component({
  selector: 'main-navigator',
  templateUrl: './main-navigator.component.html',
  styleUrls: ['./main-navigator.component.scss']
})
export class MainNavigatorComponent implements OnInit, OnDestroy {
  
  links$: Observable<NavigatorLinkModel[]>;
  //links: NavigatorLinkModel[];
  // subscription: Subscription = new Subscription();
  
  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.links$ = this.store.select(linksSelector());
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging
  }
}
