import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { AppService } from '../../../../app.service';
import { User } from '../../../users/models/user';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'properties-dashboard',
  templateUrl: './properties-dashboard.component.html',
  styleUrls: ['./properties-dashboard.component.scss']
})
export class PropertiesDashboardComponent implements OnInit, OnDestroy {
  
  user : User = null;
  subscription : Subscription = new Subscription();
  
  constructor(private route : ActivatedRoute, private mainNavigatorService : MainNavigatorService, 
      private appService : AppService ) { }


  ngOnInit() {
    let methodTrace = `${this.constructor.name} > ngOnInit() > `; //for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: '/investments', selected: false },
      { displayName: 'Properties', url: null, selected: true },
      { displayName: 'Calculators', url: '/calculators', selected: false }
    ]);

    //get authUser from resolver
    this.route.data.subscribe((data: { authUser: User }) => {
      this.user = data.authUser;
    });
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; //for debugging

    //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

}
