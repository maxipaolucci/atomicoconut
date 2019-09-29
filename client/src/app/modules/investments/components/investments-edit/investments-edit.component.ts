import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { User } from '../../../users/models/user';
import { TeamsService } from '../../../teams/teams.service';
import { AppService } from '../../../../app.service';
import { Team } from '../../../teams/models/team';
import { Subscription, Observable, of } from 'rxjs';
import { map, combineLatest, debounceTime, flatMap } from 'rxjs/operators';
import { MatSelectChange, MatRadioChange } from '@angular/material';
import { InvestmentsService } from '../../investments.service';
import { Investment } from '../../models/investment';
import { CurrencyInvestment } from '../../models/currencyInvestment';
import { INVESTMENTS_TYPES, DEFAULT_CURRENCY } from '../../../../constants';
import { BehaviorSubject } from 'rxjs';
import { PropertyInvestment } from '../../models/propertyInvestment';

@Component({
  selector: 'investments-edit',
  templateUrl: './investments-edit.component.html',
  styleUrls: ['./investments-edit.component.scss']
})
export class InvestmentsEditComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('editInvestmentForm', {static: false}) form;
  editMode = false;
  user: User = null;
  teams: Team[] = [];
  investment: Investment = null;
  model: any = {
    id : null,
    email : null, // user email for api check
    owner : 'me',
    team : null,
    teamSlug : null,
    membersPercentage : {},
    loanAmount : null,
    loanAmountUnit : null,
    investmentAmount : null,
    investmentAmountUnit : null,
    type : null,
    investmentData : {}, // specific data related to the investment type
    investmentDistribution : [] // how the investment would be distributed into its owners
  };
  id: string = null; // investment id
  type: string = null; // investment type
  // services flags
  editInvestmentServiceRunning = false;
  getInvestmentServiceRunning = false;
  getTeamsServiceRunning = false;
  subscription: Subscription = new Subscription();
  formChangesSubscription: any = null;
  investmentDataValid = false; // this value is set when investment data form is updated
  INVESTMENT_TYPES: any = INVESTMENTS_TYPES;

  
  constructor(private route: ActivatedRoute, private mainNavigatorService: MainNavigatorService, private investmentsService: InvestmentsService,
      private teamsService: TeamsService, private appService: AppService, private router: Router) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: '/investments', selected: false }
    ]);

    //start listening to Pusher notifications related to this component
    this.bindToPushNotificationEvents();
    
    // generates a user source object from authUser from resolver
    const user$ = this.route.data.pipe(map((data: { authUser: User }): User => data.authUser));

    // creates a params source from parameters in url useful for the rest of the code
    const params$ = this.route.paramMap.pipe(map((params: ParamMap): any => { 
      const type: string = params.get('type');

      if (![INVESTMENTS_TYPES.CURRENCY, INVESTMENTS_TYPES.CRYPTO, INVESTMENTS_TYPES.PROPERTY].includes(type)) {
        this.appService.showResults('You must provide a valid investment type to continue.', 'error');
        this.router.navigate(['welcome']);
      } else {
        this.type = type;
        this.model.type = type;
        this.model.investmentData.type = type;
      }

      return { id : params.get('id') }; 
    }));
    
    // combine user$ and id$ sources into one object and start listen to it for changes
    const newSubscription = user$.pipe(
      combineLatest(params$, (user: User, urlParams: any): string => {
        const urlObject = (<BehaviorSubject<any>>this.route.url).getValue(); 
        let investmentId: string = null;
        let propertyId: string = null;
        if (urlObject[0]['path'] === INVESTMENTS_TYPES.PROPERTY && urlObject[1]['path'] === 'create') {
          // we are creating a property investment coming from the property component
          propertyId = urlParams.id;
        } else {
          // we are editing an investment or creating a new one coming from the investment dashboard
          investmentId = urlParams.id;
        }

        this.populateRequiredData(user, investmentId, propertyId);

        return investmentId; 
      }),
      flatMap((investmentId: string): Observable<Investment> => {
        if (investmentId) {
          return this.getInvestment$(investmentId);
        }
        
        return of(null);
      })
    ).subscribe(
      (investment: Investment) => {
        if (investment) {
          this.populateInvestmentData(investment);
          this.getInvestmentServiceRunning = false;

          if (this.form && !this.formChangesSubscription) {
            this.subscribeFormValueChanges();
          }
        }
      },
      (error: any) => {
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

  /**
   * Populates the data required to work with this component
   */
  populateRequiredData(user: User, investmentId: string = null, propertyId: string = null) {
    this.user = user;
    this.getTeams(); // don't need to wait for this
    
    this.model.email = user.email;
    this.model.investmentAmountUnit = user.currency || DEFAULT_CURRENCY;
    this.model.loanAmountUnit = user.currency || DEFAULT_CURRENCY;
    this.model.id = investmentId;
    if (propertyId) {
      this.model.investmentData.propertyId = propertyId;
    }

    if (!investmentId) {
      // we are creating a new investment
      this.id = null;
      this.editMode = false;
      this.mainNavigatorService.appendLink({ displayName: 'Create Investment', url: '', selected : true });
    } else {
      this.mainNavigatorService.appendLink({ displayName: 'Edit Investment', url: '', selected : true });
      // we are editing an existing investment
      this.id = investmentId; // the new slug
      this.editMode = true;
    }
  }

  /**
   * Populates all the investment data in the view model
   * @param { Investment } investment 
   */
  populateInvestmentData(investment: Investment) {
    this.investment = investment;
          
    // populate the model
    this.model.owner = investment.team ? 'team' : 'me';
    this.model.team = investment.team;
    this.setSelectedTeam(); // this is necesary to make the selectbox in ui set a team
    this.model.teamSlug = investment.team ? investment.team.slug : null;
    this.model.investmentDistribution = investment.investmentDistribution;
    for (const portion of investment.investmentDistribution) {
      this.model.membersPercentage[portion.email] = portion.percentage;
    }
    this.model.loanAmount = investment.loanAmount;
    this.model.loanAmountUnit = investment.loanAmountUnit;
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
    } else if (investment instanceof PropertyInvestment) {
      this.model.investmentData = {
        type : investment.type,
        property : investment.property,
        address : investment.property.address,
        buyingPrice : investment.buyingPrice,
        buyingPriceUnit : investment.buyingPriceUnit,
        buyingDate : investment.buyingDate
      };
    }
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
    this.formChangesSubscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe(values => {
      if (values.owner === 'team' && values.team && this.model.team) {
        // calculates the percentage acum from all the members
        const percentageAcum = this.model.team.members.reduce((total, member) => {
          return total + (this.model.membersPercentage[member.email] || 0);
        }, 0);

        if (percentageAcum > 100) {
          const [lastMember] = this.model.team.members.slice(-1);
          const diff = percentageAcum - 100;
          const newValue = Number(DecimalPipe.prototype.transform(this.model.membersPercentage[lastMember.email] - diff, '1.0-2', 'en'));
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

  /**
   * Start listening to Pusher notifications comming from server
   */
  bindToPushNotificationEvents() {
    this.appService.pusherChannel.bind('investment-deleted', data => {
      if (this.investment.id == data.investment.id) {
        this.router.navigate(['/investments']);
      }
    });

    // when a user updates a team
    this.appService.pusherChannel.bind('team-updated', data => {
      if (data.team && data.team.slug == this.investment.team.slug && data.team.memberState[this.user.email] == 'remove') {
        // the user was removed from the investment team
        this.router.navigate(['/investments']);
      }
    });
  }

  /**
   * Stop listening to Pusher notifications comming from server
   */
  unbindToPushNotificationEvents() {
    this.appService.pusherChannel.unbind('investment-deleted');
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging
    
    this.subscription.unsubscribe();
    this.unbindToPushNotificationEvents();
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging

    this.editInvestmentServiceRunning = true;

    this.model.investmentDistribution = this.populateInvestmentDistributionArray();
    this.model.createdOn = new Date(Date.now());
    this.model.updatedOn = new Date(Date.now());

    // call the investment create service
    const newSubscription = this.investmentsService.create$(this.model).subscribe(
      (data: any) => {
        if (data && data.id && data.type) {
          this.appService.showResults(`Investment successfully created!`, 'success');
          this.router.navigate(['/investments/', data.type, 'edit', data.id]);
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
          this.editInvestmentServiceRunning = false;
        }
      },
      (error: any) => {
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
    const methodTrace = `${this.constructor.name} > onUpdate() > `; // for debugging

    this.editInvestmentServiceRunning = true;

    this.model.investmentDistribution = this.populateInvestmentDistributionArray();
    this.model.updatedOn = new Date(Date.now());
    // call the investment create service
    const newSubscription = this.investmentsService.update$(this.model).subscribe(
      (data: any) => {
        if (data && data.id && data.type) {
          this.appService.showResults(`Investment successfully updated!`, 'success');
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
        }

        this.editInvestmentServiceRunning = false;
      },
      (error: any) => {
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
    const methodTrace = `${this.constructor.name} > getTeams() > `; // for debugging

    this.teams = [];
    this.getTeamsServiceRunning = true;

    const newSubscription = this.teamsService.getTeams$(this.user.email).subscribe(
      (teams: Team[]) => {
        this.teams = teams;
        this.getTeamsServiceRunning = false;
        
        this.setSelectedTeam();
      },
      (error: any) => {
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
  setSelectedTeam() {
    if (this.teams && this.teams.length && this.investment && this.investment.team) {
      for (const team of this.teams) {
        if (this.investment.team.slug === team.slug) {
          this.model.team = team;
          break;
        }
      }
    }
  }

  /**
   * Populates an array that specifies the distribution of the investment between its owners and returns it.
   * 
   * @return {array} The distribution of the investment
   */
  populateInvestmentDistributionArray(): any[] {
    const result = [];

    if (!this.model.team) {
      result.push({ email : this.user.email, percentage : 100 });
    } else {
      for (const email of Object.keys(this.model.membersPercentage)) {
        result.push({ email, percentage : this.model.membersPercentage[email] });
      }
    }

    return result;
  }

  /**
   * Get an investment source from server based on the id provided
   * @param {string} id 
   * 
   * @return { Observable<Investment> }
   */
  getInvestment$(id: string): Observable<Investment> {
    const methodTrace = `${this.constructor.name} > getInvestment$() > `; // for debugging
    
    if (!id) {
      this.appService.showResults(`Invalid investment ID`, 'error');
      this.appService.consoleLog('error', `${methodTrace} ID parameter must be provided, but was: `, id);
      return of(null);
    }

    this.getInvestmentServiceRunning = true;

    return this.investmentsService.getInvestmentById$(this.user.email, id);
  }

  onSelectChange(matSelectChange: MatSelectChange) {
    this.model.teamSlug = matSelectChange.value.slug;

    this.setDefaultInvestmentPercentages();
  }

  onRadioChange(matRadioChange: MatRadioChange) {
    if (matRadioChange.value === 'me') {
      // reset team values from model
      this.model.team = this.model.teamSlug = null;
    }

    this.model.membersPercentage = {};
  }

  onCurrencyUnitChange($event: MatSelectChange) {
    this.model[$event.source.id] = $event.value;
  }

  onInvestmentDataChange($event: any) {
    this.model.investmentData = $event.value.model;
    this.investmentDataValid = $event.value.valid;
  }

  /**
   * Splits equally the percentage of an investment to all the team members
   */
  setDefaultInvestmentPercentages() {
    this.model.membersPercentage = {};
    // set the default percentage of the investment to each member
    const defaultPercentage = Number(DecimalPipe.prototype.transform(100 / this.model.team.members.length, '1.0-2', 'en'));
    for (const member of this.model.team.members) {
      this.model.membersPercentage[member.email] = defaultPercentage;
    }
  }
}
