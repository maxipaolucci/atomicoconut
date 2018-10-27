import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainNavigatorService } from './main-navigator.service';
import { Subscription } from 'rxjs';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'main-navigator',
  templateUrl: './main-navigator.component.html',
  styleUrls: ['./main-navigator.component.scss']
})
export class MainNavigatorComponent implements OnInit, OnDestroy {
  
  links : any;
  subscription : Subscription = new Subscription();
  
  constructor(private mainNavigatorService : MainNavigatorService, private appService : AppService) { }

  ngOnInit() {
    this.subscription = this.mainNavigatorService.links$.subscribe((links : any[]) => this.links = links);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; //for debugging
    
    //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }
}
