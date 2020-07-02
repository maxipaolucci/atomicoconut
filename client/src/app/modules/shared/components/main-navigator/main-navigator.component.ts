import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigatorLinkModel } from './models/navigator-link-model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { linksSelector } from './main-navigator.selectors';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'main-navigator',
  templateUrl: './main-navigator.component.html',
  styleUrls: ['./main-navigator.component.scss']
})
export class MainNavigatorComponent implements OnInit, OnDestroy {
  
  links$: Observable<NavigatorLinkModel[]>;
  
  constructor(
    private store: Store<State>,
    public utilService: UtilService
  ) { }

  ngOnInit() {
    this.links$ = this.store.select(linksSelector());
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging
  }
}
