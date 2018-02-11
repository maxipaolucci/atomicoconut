import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { UsersService } from '../../../users/users.service';
import { AppService } from '../../../../app.service';
import { User } from '../../../users/models/user';
import { Observable } from 'rxjs/Observable';
import { Property } from '../../models/property';

@Component({
  selector: 'properties-dashboard',
  templateUrl: './properties-dashboard.component.html',
  styleUrls: ['./properties-dashboard.component.scss']
})
export class PropertiesDashboardComponent implements OnInit, OnDestroy {

  user : User = null;
  properties : Property[] = [];

  constructor(private route : ActivatedRoute, private mainNavigatorService : MainNavigatorService, private usersService : UsersService,  
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
    const user$ : Observable<User> = this.route.data.map((data : { authUser: User }) =>  {
      this.user = data.authUser;
      
      return data.authUser;
    });

    if (!this.properties.length) {
      //this.getInvestments(user$);
    }
  }

  ngOnDestroy(): void {
    
  }

}
