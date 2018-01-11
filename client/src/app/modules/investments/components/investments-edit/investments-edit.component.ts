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
import { Investment } from '../../models/investment';
import { CurrencyInvestment } from '../../models/currencyInvestment';

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
  investment : Investment = null;
  model : any = {
    id : null,
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
  formChangesSubscription : any = null;
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
      this.model.id = data.investmentId || null;

      this.editInvestmentServiceRunning = false;
      this.getInvestmentServiceRunning = false;
      
      //get user teams
      this.getTeams();

      if (!data.investmentId) {
        //we are creating a new investment
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

      
    });

    //get TYPE parameter
    this.route.paramMap.map((params: ParamMap) => params.get('type')).subscribe(type => {
      if (!['currency', 'crypto', 'property'].includes(type)) {
        this.appService.showResults('You must provide a valid investment type to continue.', 'error');
        this.router.navigate(['welcome']);
      } else {
        this.type = type;
        this.model.type = type;
        this.model.investmentData.type = type;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.form && !this.formChangesSubscription) {
      this.subscribeFormValueChanges();
    }
  }

  /**
   * This methods subscribes to changes on the main form in the view. We do it in a separate method because when the page loads for edition the form it is not defined in the
   * view until an investment is retrived from the server. We save an instance of the subscription to avoid subscriwe twice or more times.
   */
  subscribeFormValueChanges() {
    this.formChangesSubscription = this.form.valueChanges.debounceTime(500).subscribe(values => {
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

    this.subscription.add(this.formChangesSubscription);
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
    this.model.createdOn = new Date(Date.now());
    this.model.updatedOn = new Date(Date.now());
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

  onUpdate() {
    const methodTrace = `${this.constructor.name} > onUpdate() > `; //for debugging

    this.editInvestmentServiceRunning = true;

    this.model.investmentDistribution = this.populateInvestmentDistributionArray();
    this.model.updatedOn = new Date(Date.now());
    //call the investment create service
    const newSubscription = this.investmentsService.update(this.model).subscribe(
      (data : any) => {
        if (data && data.id && data.type) {
          this.appService.showResults(`Investment successfully updated!`, 'success');
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
        }

        this.editInvestmentServiceRunning = false;
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
        
        if (teams.length) {
          this.getSelectedTeam();
        } else {
          this.appService.showResults(`You are not member of any team yet!. Create a team if you want to split your investment with other people.`, 'info');
        }
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
   * Get the selected team . This is going to works when teams and investment is here (so we are in edit mode) and the investment has a team selected
   */
  getSelectedTeam() {
    if (this.teams && this.teams.length && this.investment && this.investment.team) {
      for (let team of this.teams) {
        if (this.investment.team.slug === team.slug) {
          this.model.team = team;
        }
      }
    }
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
          (investment : Investment) => {
            this.investment = investment;
            //populate the model
            this.model.owner = investment.team ? 'team' : 'me';
            this.model.team = investment.team;
            this.getSelectedTeam(); //this is necesary to make the selectbox in ui set a team
            this.model.teamSlug = investment.team ? investment.team.slug : null;
            this.model.investmentDistribution = investment.investmentDistribution;
            for (let portion of investment.investmentDistribution) {
              this.model.membersPercentage[portion.email] = portion.percentage;
            }
            this.model.investmentAmount = investment.investmentAmount;
            this.model.investmentAmountUnit = investment.investmentAmountUnit;
            this.model.type = investment.type;
            if (investment instanceof CurrencyInvestment) {
              this.model.investmentData = {
                type : investment.type,
                unit : investment.unit,
                amount : investment.amount,
                buyingPrice : investment.buyingPrice,
                buyingPriceUnit : investment.buyingPriceUnit,
                buyingDate : investment.buyingDate
              };
            }
    
            this.getInvestmentServiceRunning = false;
            if (this.form && !this.formChangesSubscription) {
              this.subscribeFormValueChanges();
            }
          },
          (error : any) => {
            this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > ${error}`);
            if (error.codeno === 400) {
              this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
            } else if (error.codeno === 461 || error.codeno === 462) {
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
    }

    this.model.membersPercentage = {};
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
    this.model.membersPercentage = {};
    //set the default percentage of the investment to each member
    const defaultPercentage = Number(decimalPipe.transform(100 / this.model.team.members.length, '1.0-2'));
    for (let member of this.model.team.members) {
      this.model.membersPercentage[member.email] = defaultPercentage;
    }
  }
}
