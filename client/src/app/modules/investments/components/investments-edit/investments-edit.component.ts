import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { User } from '../../../users/models/user';
import { TeamsService } from '../../../teams/teams.service';
import { AppService } from "../../../../app.service";
import { Team } from '../../../teams/models/team';
import { Subscription } from 'rxjs/Subscription';
import { MatSelectChange, MatRadioChange } from '@angular/material';
import { InvestmentsService } from '../../investments.service';

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
    membersPercentage : {},
    investmentAmount : null,
    investmentAmountUnit : null,
    type : null,
    investmentData : {}, //specific data related to the investment type
    investmentDistribution : [] //how the investment would be distributed into its owners
  };
  id : string = null; //investment id
  type : string = null; //investment type
  //services flags
  editInvestmentServiceRunning : boolean = false;
  getInvestmentServiceRunning : boolean = false;
  getTeamsServiceRunning : boolean = false;
  subscription : Subscription = new Subscription();
  investmentDataValid : boolean = false; //this value is set when investment data form is updated

  
  constructor(private route : ActivatedRoute, private mainNavigatorService : MainNavigatorService, private investmentsService : InvestmentsService,
    private teamsService : TeamsService, private appService : AppService, private router : Router) { }

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
      this.model.investmentAmountUnit = this.user.currency;

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
        this.appService.showResults('You must provide a valid investment type to continue.', 'error');
        this.router.navigate(['welcome']);
      } else {
        this.type = type;
        this.model.type = type;
      }
    });
  }

  ngAfterViewInit(): void {
    const newSubscription = this.form.valueChanges.debounceTime(500).subscribe(values => {
      
      if (values.owner === 'team' && values.team && this.model.team) {
        //calculates the percentage acum from all the members
        const percentageAcum = this.model.team.members.reduce((total, member) => {
          return total + (this.model.membersPercentage[member.email] || 0);
        }, 0);

        if (percentageAcum > 100) {
          const [lastMember] = this.model.team.members.slice(-1);
          const diff = percentageAcum - 100;
          const decimalPipe = new DecimalPipe('en');
          const newValue = Number(decimalPipe.transform(this.model.membersPercentage[lastMember.email] - diff, '1.0-2'));
          if (newValue < 0) {
            this.setDefaultInvestmentPercentages();
            this.appService.showResults(`The sum of percentages must not exceed 100%, we reset the values to make it valid.`, 'warn');
          } else {
            this.model.membersPercentage[lastMember.email] = newValue <= 100 ? newValue : 0;
            this.appService.showResults(`The sum of percentages must not exceed 100%, we reset the last values to make it valid.`, 'warn');
          }
        }
      }
    });

    this.subscription.add(newSubscription);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; //for debugging
    
    //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; //for debugging

    this.editInvestmentServiceRunning = true;

    this.model.investmentDistribution = this.populateInvestmentDistributionArray();
    //call the investment create service
    const newSubscription = this.investmentsService.create(this.model).subscribe(
      (data : any) => {
        if (data && data.id && data.type) {
          this.appService.showResults(`Investment successfully created!`, 'success');
          this.router.navigate(['/investments/', data.type, 'edit', data.id]);
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
          this.editInvestmentServiceRunning = false;
        }
      },
      (error : any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the create/edit investment service.`, error);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error with the investment services, please try again in a few minutes.`, 'error');
        }

        this.editInvestmentServiceRunning = false;
      }
    );

    this.subscription.add(newSubscription);
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

  /**
   * Populates an array that specifies the distribution of the investment between its owners and returns it.
   * 
   * @return {array} The distribution of the investment
   */
  populateInvestmentDistributionArray() : any[] {
    let result = [];

    if (!this.model.team) {
      result.push({ email : this.user.email, percentage : 100 });
    } else {
      for (let email of Object.keys(this.model.membersPercentage)) {
        result.push({ email, percentage : this.model.membersPercentage[email] });
      }
    }

    return result;
  }

  /**
   * Get a team from server based on the id provided
   * @param {string} id 
   */
  getInvestment(id : string) {
    const methodTrace = `${this.constructor.name} > getInvestment() > `; //for debugging
    
        if (!id) {
          this.appService.showResults(`Invalid investment ID`, 'error');
          this.appService.consoleLog('error', `${methodTrace} ID parameter must be provided, but was: `, id);
          return false;
        }
    
        this.getInvestmentServiceRunning = true;
    
        const newSubscription = this.investmentsService.getInvestmentById(this.user.email, id).subscribe(
          (data : any) => {
            if (data && data._id) {
              console.log(data);
            } else {
              this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
            }
    
            this.getInvestmentServiceRunning = false;
          },
          (error : any) => {
            this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
            if (error.codeno === 400) {
              this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
            } else if (error.codeno === 462) {
              this.appService.showResults(error.msg, 'error');
              this.router.navigate(['/welcome']);
            } else {
              this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
            }
    
            this.getInvestmentServiceRunning = false;
          }
        );
    
        this.subscription.add(newSubscription);
  }

  onSelectChange(matSelectChange : MatSelectChange) {
    this.model.teamSlug = matSelectChange.value.slug;

    this.setDefaultInvestmentPercentages();
  }

  onRadioChange(matRadioChange : MatRadioChange) {
    if (matRadioChange.value === 'me') {
      //reset team values from model
      this.model.team = this.model.teamSlug = null;
      this.model.membersPercentage = {};
    }
  }

  onCurrencyUnitChange($event : MatSelectChange) {
    if ($event.source.id === 'investmentAmountUnit') {
      this.model.investmentAmountUnit = $event.value;
    }
  }

  onInvestmentDataChange($event : any) {
    this.model.investmentData = $event.value.model;
    this.investmentDataValid = $event.value.valid;
  }

  /**
   * Splits equally the percentage of an investment to all the team members
   */
  setDefaultInvestmentPercentages() {
    const decimalPipe = new DecimalPipe('en');
    //set the default percentage of the investment to each member
    const defaultPercentage = Number(decimalPipe.transform(100 / this.model.team.members.length, '1.0-2'));
    for (let member of this.model.team.members) {
      this.model.membersPercentage[member.email] = defaultPercentage;
    }
  }
}
