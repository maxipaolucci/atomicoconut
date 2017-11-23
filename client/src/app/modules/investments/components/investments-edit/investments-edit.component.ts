import { Component, OnInit } from '@angular/core';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { User } from '../../../users/models/user';
import { TeamsService } from '../../../teams/teams.service';
import { AppService } from "../../../../app.service";
import { Team } from '../../../teams/models/team';

@Component({
  selector: 'investments-edit',
  templateUrl: './investments-edit.component.html',
  styleUrls: ['./investments-edit.component.scss']
})
export class InvestmentsEditComponent implements OnInit {

  editMode : boolean = false;
  user : User = null;
  editInvestmentServiceRunning : boolean = false;
  getInvestmentServiceRunning : boolean = false;
  model : any = {
    email : null, //user email for api check
  };
  id : string = null; //investment id
  type : string = null; //investment type

  constructor(private route : ActivatedRoute, private mainNavigatorService : MainNavigatorService, private teamsService : TeamsService,
    private appService : AppService, private router : Router) { }

  ngOnInit() {
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: '/investments', selected: false }
    ]);

    //get authUser from resolver
    this.route.data.subscribe((data: { authUser: User }) => {
      this.user = data.authUser;
      this.model.email = this.user.email;
    });

    this.route.paramMap.map((params: ParamMap) => params.get('id')).subscribe(id => {
      this.editInvestmentServiceRunning = false;
      this.getInvestmentServiceRunning = false;
      
      if (!id) {
        //we are creating a new team
        this.id = null;
        this.editMode = false;
        this.mainNavigatorService.appendLink({ displayName: 'Create Investment', url: '', selected : true });
      } else {
        this.mainNavigatorService.appendLink({ displayName: 'Edit Investment', url: '', selected : true });
        //we are editing an existing investment
        this.id = id; //the new slug
        this.editMode = true;
        
        //this.getInvestment(); //get data
      }
    });

    this.route.paramMap.map((params: ParamMap) => params.get('type')).subscribe(type => {
      if (!['currency', 'crypto', 'property'].includes(type)) {
        this.appService.showResults('You must provide a valid investment type to continue.');
        this.router.navigate(['welcome']);
      } else {
        console.log(type);
      }
    });
  }

}
