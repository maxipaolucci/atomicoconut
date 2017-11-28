import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { User } from '../../../users/models/user';
import { TeamsService } from '../../../teams/teams.service';
import { AppService } from "../../../../app.service";
import { Team } from '../../../teams/models/team';
import { Subscription } from 'rxjs/Subscription';
import { MatSelectChange, MatRadioChange } from '@angular/material';

@Component({
  selector: 'investments-edit',
  templateUrl: './investments-edit.component.html',
  styleUrls: ['./investments-edit.component.scss']
})
export class InvestmentsEditComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('editInvestmentForm') form;
  editMode : boolean = false;
  user : User = null;
  teams : Team[] = [];
  model : any = {
    email : null, //user email for api check
    owner : 'me',
    team : null,
    teamSlug : null,
    membersPercentage : {}
  };
  id : string = null; //investment id
  type : string = null; //investment type
  //services flags
  editInvestmentServiceRunning : boolean = false;
  getInvestmentServiceRunning : boolean = false;
  getTeamsServiceRunning : boolean = false;
  subscription : Subscription = new Subscription();

  
  constructor(private route : ActivatedRoute, private mainNavigatorService : MainNavigatorService, private teamsService : TeamsService,
    private appService : AppService, private router : Router) { }

  ngOnInit() {
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: '/investments', selected: false }
    ]);

    //generates a user source object from authUser from resolver
    const user$ = this.route.data.map((data: { authUser: User }) => data.authUser);

    //generates an investment id source from id parameter in url
    const id$ = this.route.paramMap.map((params: ParamMap) => params.get('id'));
    
    //combine user$ and id$ sources into one object and start listen to it for changes
    this.subscription = user$.combineLatest(id$, (user, id) => { 
      return { user, investmentId : id } 
    }).subscribe(data => {
      this.user = data.user;
      this.model.email = data.user.email;

      this.editInvestmentServiceRunning = false;
      this.getInvestmentServiceRunning = false;
      
      if (!data.investmentId) {
        //we are creating a new team
        this.id = null;
        this.editMode = false;
        this.mainNavigatorService.appendLink({ displayName: 'Create Investment', url: '', selected : true });
      } else {
        this.mainNavigatorService.appendLink({ displayName: 'Edit Investment', url: '', selected : true });
        //we are editing an existing investment
        this.id = data.investmentId; //the new slug
        this.editMode = true;
        
        this.getInvestment(data.investmentId); //get data
      }

      //get user teams
      this.getTeams();
    });

    //get TYPE parameter
    this.route.paramMap.map((params: ParamMap) => params.get('type')).subscribe(type => {
      if (!['currency', 'crypto', 'property'].includes(type)) {
        this.appService.showResults('You must provide a valid investment type to continue.');
        this.router.navigate(['welcome']);
      } else {
        this.type = type;
      }
    });
  }

  ngAfterViewInit(): void {
    this.form.valueChanges.debounceTime(500).subscribe(values => {
      
      if (values.owner === 'team' && values.team) {
        //calculates the percentage acum from all the members
        const percentageAcum = values.team.members.reduce((total, member) => {
          return total + (values[`memberPercentage_${member.email}`] || 0);
        }, 0);

        if (percentageAcum > 100) {
          const lastMember = values.team.members[values.team.members.length - 1];
          values[`memberPercentage_${lastMember.email}`] = 0;
        }
      }
    });
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; //for debugging
    
    //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  /**
   * Get my teams from server
   */
  getTeams() {
    const methodTrace = `${this.constructor.name} > getTeams() > `; //for debugging

    this.teams = [];
    this.getTeamsServiceRunning = true;

    const newSubscription = this.teamsService.getTeams(this.user.email).subscribe(
      (teams : Team[]) => {
        this.teams = teams;
        console.log(teams);
        this.getTeamsServiceRunning = false;
      },
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
        }

        this.getTeamsServiceRunning = false;
      }
    );

    this.subscription.add(newSubscription);
  }

  getInvestment(id : string) {
    console.log(id);
  }

  onSelectChange(matSelectChange : MatSelectChange) {
    this.model.teamSlug = matSelectChange.value.slug;
  }

  onRadioChange(matRadioChange : MatRadioChange) {
    if (matRadioChange.value === 'me') {
      this.model.team = this.model.teamSlug = null;
    }
    
  }
}
