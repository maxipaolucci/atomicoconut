import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { User } from '../../../users/models/user';
import { AppService } from '../../../../app.service';
import { Team } from '../../../teams/models/team';
import { Subscription, Observable, of, BehaviorSubject } from 'rxjs';
import { map, combineLatest, debounceTime, switchMap } from 'rxjs/operators';
import { MatSelectChange, MatRadioChange } from '@angular/material';
import { Investment } from '../../models/investment';
import { CurrencyInvestment } from '../../models/currencyInvestment';
import { INVESTMENTS_TYPES, DEFAULT_CURRENCY, SnackbarNotificationTypes } from '../../../../constants';
import { PropertyInvestment } from '../../models/propertyInvestment';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { LoadingData } from 'src/app/models/loadingData';
import { loadingSelector } from 'src/app/app.selectors';
import { RequestUpdate, RequestCreate, ResetAllEntitiesLoaded } from '../../investment.actions';
import _ from 'lodash';
import { userSelector } from 'src/app/modules/users/user.selectors';
import { investmentByIdSelector } from '../../investment.selectors';
import { teamsSelector } from 'src/app/modules/teams/team.selectors';
import { RequestAll as RequestAllTeams } from 'src/app/modules/teams/team.actions';
import { SetLinks, AppendLink } from 'src/app/modules/shared/components/main-navigator/main-navigator.actions';

@Component({
  selector: 'investments-edit',
  templateUrl: './investments-edit.component.html',
  styleUrls: ['./investments-edit.component.scss']
})
export class InvestmentsEditComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('editInvestmentForm') form;
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
  getTeamsServiceRunning = false;
  subscription: Subscription = new Subscription();
  formChangesSubscription: any = null;
  investmentDataValid = false; // this value is set when investment data form is updated
  INVESTMENT_TYPES: any = INVESTMENTS_TYPES;
  loading$: Observable<LoadingData>;
  
  constructor(
      private route: ActivatedRoute,
      private appService: AppService, 
      private router: Router,
      private store: Store<State>
  ) { }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.store.dispatch(new SetLinks({ links: [
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: '/investments', selected: false }
    ]}));

    this.loading$ = this.store.select(loadingSelector());
    
    // generates a user source object from authUser from resolver
    const user$ = this.store.select(userSelector());

    // creates a params source from parameters in url useful for the rest of the code
    const params$ = this.route.paramMap.pipe(
      map((params: ParamMap): any => { 
        const type: string = params.get('type');

        if (![INVESTMENTS_TYPES.CURRENCY, INVESTMENTS_TYPES.CRYPTO, INVESTMENTS_TYPES.PROPERTY].includes(type)) {
          this.appService.showResults('You must provide a valid investment type to continue.', SnackbarNotificationTypes.ERROR);
          this.router.navigate(['welcome']);
        } else {
          this.type = type;
          this.model.type = type;
          this.model.investmentData.type = type;
        }

        return { id : params.get('id') }; 
      })
    );
    
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

        //With the user set start listening to Pusher notifications related to this component
        this.bindToPushNotificationEvents();
        
        if (!investmentId) {
          this.editMode = false;
          this.store.dispatch(new AppendLink({ link: { displayName: 'Create Investment', url: '', selected : true }}));
        } else {
          this.store.dispatch(new AppendLink({ link: { displayName: 'Edit Investment', url: '', selected : true }}));
          this.editMode = true;
        }

        return investmentId; 
      }),
      switchMap((investmentId: string): Observable<Investment> => {
        if (investmentId) {
          // I read this one instead from resolver because this has always the latest information when we update the object
          return this.store.select(investmentByIdSelector(investmentId)); //this info is already in the store thanks to the resolver
        }
        
        return of(null);
      })
    ).subscribe((investment: Investment) => {
      if (investment) {
        this.populateInvestmentData(investment);

        if (this.form && !this.formChangesSubscription) {
          this.subscribeFormValueChanges();
        }
      }
    });

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
    } else {
      // we are editing an existing investment
      this.id = investmentId;
    }
  }

  /**
   * Populates all the investment data in the view model
   * @param { Investment } investment 
   */
  populateInvestmentData(investment: Investment) {
    const methodTrace = `${this.constructor.name} > populateInvestmentData() > `; // for debugging

    this.investment = _.cloneDeep(investment);
          
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
    
    if ([ INVESTMENTS_TYPES.CURRENCY, INVESTMENTS_TYPES.CRYPTO ].includes(investment.type)) {
      this.model.investmentData = {
        type : investment.type,
        unit : (<CurrencyInvestment>investment).unit,
        amount : (<CurrencyInvestment>investment).amount,
        buyingPrice : (<CurrencyInvestment>investment).buyingPrice,
        buyingPriceUnit : (<CurrencyInvestment>investment).buyingPriceUnit,
        buyingDate : (<CurrencyInvestment>investment).buyingDate
      };
    } else if ([ INVESTMENTS_TYPES.PROPERTY ].includes(investment.type)) {
      this.model.investmentData = {
        type : investment.type,
        property : (<PropertyInvestment>investment).property,
        address : (<PropertyInvestment>investment).property.address,
        buyingPrice : (<PropertyInvestment>investment).buyingPrice,
        buyingPriceUnit : (<PropertyInvestment>investment).buyingPriceUnit,
        buyingDate : (<PropertyInvestment>investment).buyingDate
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
            this.appService.showResults(`The sum of percentages must not exceed 100%, we reset the values to make it valid.`, SnackbarNotificationTypes.WARN);
          } else {
            this.model.membersPercentage[lastMember.email] = newValue <= 100 ? newValue : 0;
            this.appService.showResults(`The sum of percentages must not exceed 100%, we reset the last values to make it valid.`, SnackbarNotificationTypes.WARN);
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
    this.appService.pusherChannel.bind('investment-updated', data => {
      if (this.investment.id == data.investment.id) {
        this.store.dispatch(new ResetAllEntitiesLoaded());

        if (!data.investment.team) {
          // If I am receiving the notification then I wasn't the updater. If the team is null then I cannot see this anymore  
          this.router.navigate(['/investments']);
          
          return;
        }

        const isFromMyTeam = data.investment.team.members.some((member: any) => member.email == this.user.email);
        if (!isFromMyTeam) {
          // investment has a team but I am not a member of it
          this.router.navigate(['/investments']);
          
          return;
        }
      }
    });

    this.appService.pusherChannel.bind('investment-deleted', data => {
      if (this.investment.id == data.investment.id) {
        this.store.dispatch(new ResetAllEntitiesLoaded());
        this.router.navigate(['/investments']);
      }
    });

    // when a user updates a team
    this.appService.pusherChannel.bind('team-updated', data => {
      if (data.team && data.team.slug == this.investment.team.slug && data.team.memberState[this.user.email] == 'remove') {
        // the user was removed from the investment team
        this.store.dispatch(new ResetAllEntitiesLoaded());
        this.router.navigate(['/investments']);
      }
    });
  }

  /**
   * Stop listening to Pusher notifications comming from server
   */
  unbindToPushNotificationEvents() {
    this.appService.pusherChannel.unbind('investment-deleted');
    this.appService.pusherChannel.unbind('team-updated');
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging
    
    this.subscription.unsubscribe();
    this.unbindToPushNotificationEvents();
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging

    this.model.investmentDistribution = this.populateInvestmentDistributionArray();
    this.model.createdOn = new Date(Date.now());
    this.model.updatedOn = new Date(Date.now());

    //to prevent receiving notification of actions performed by current user
    this.model.pusherSocketID = this.appService.pusherSocketID;

    this.store.dispatch(new RequestCreate({ model: _.cloneDeep(this.model) }));
  }

  onUpdate() {
    const methodTrace = `${this.constructor.name} > onUpdate() > `; // for debugging

    this.model.investmentDistribution = this.populateInvestmentDistributionArray();
    this.model.updatedOn = new Date(Date.now());
    //to prevent receiving notification of actions performed by current user
    this.model.pusherSocketID = this.appService.pusherSocketID;

    this.store.dispatch(new RequestUpdate({ model: _.cloneDeep(this.model) }));
  }

  /**
   * Get my teams from server
   */
  getTeams() {
    const methodTrace = `${this.constructor.name} > getTeams() > `; // for debugging

    this.teams = [];
    this.getTeamsServiceRunning = true;

    this.store.dispatch(new RequestAllTeams({ userEmail: this.user.email, forceServerRequest: false }));
    const newSubscription = this.store.select(teamsSelector()).subscribe((teams: Team[]) => {
      this.teams = teams;
      this.setSelectedTeam();
      this.getTeamsServiceRunning = false;
    }, (error: any) => {
      this.getTeamsServiceRunning = false;
    });
    
    this.subscription.add(newSubscription);
  }

  /**
   * Get the selected team . This is going to works when teams and investment is here (so we are in edit mode) and the investment has a team selected
   */
  setSelectedTeam() {
    if (this.teams && this.teams.length && this.investment && this.investment.team) {
      const investmentTeam = this.teams.find((team: Team) => this.investment.team.slug === team.slug);
      
      if (investmentTeam) {
        this.model.team = investmentTeam;
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
