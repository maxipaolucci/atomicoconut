import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../users/models/user';
import { Property } from '../../models/property';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppService } from '../../../../app.service';
import { PropertiesService } from '../../properties.service';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { propertyTypes } from '../../../../constants';
import { House } from '../../models/house';

@Component({
  selector: 'properties-edit',
  templateUrl: './properties-edit.component.html',
  styleUrls: ['./properties-edit.component.scss']
})
export class PropertiesEditComponent implements OnInit, OnDestroy {

  editMode : boolean = false;
  user : User = null;
  property : Property = null;
  model : any = {
    id : null,
    email : null, //user email for api check
    type : null,
    propertyTypeData : {}, //specific data related to the property type
    address : null,
    askingPrice : null,
    askingPriceUnit : null,
    offerPrice : null,
    offerPriceUnit : null,
    walkAwayPrice : null,
    walkAwayPriceUnit : null,
    salePrice : null,
    salePriceUnit : null,
    dateListed : null,
    reasonForSelling : null,
    marketValue : null,
    marketValueUnit : null,
    renovationCost : null,
    renovationCostUnit : null,
    maintainanceCost : null,
    maintainanceCostUnit : null,
    description : null,
    otherCost : null,
    otherCostUnit : null,
    notes : null
  };
  
  id : string = null; //investment id
  type : string = null; //investment type
  //services flags
  editPropertyServiceRunning : boolean = false;
  getPropertyServiceRunning : boolean = false;
  subscription : Subscription = new Subscription();
  
  constructor(private route : ActivatedRoute, private mainNavigatorService : MainNavigatorService, private propertiesService : PropertiesService, 
      private appService : AppService, private router : Router) { }

  ngOnInit() {
    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: '/investments', selected: false },
      { displayName: 'Properties', url: '/properties', selected: false }
    ]);

    //generates a user source object from authUser from resolver
    const user$ = this.route.data.map((data: { authUser: User }) => data.authUser);

    //generates an property id source from id parameter in url
    const id$ = this.route.paramMap.map((params: ParamMap) => params.get('id'));
    
    //combine user$ and id$ sources into one object and start listen to it for changes
    const newSubscription = user$.combineLatest(id$, (user, id) => { 
      return { user, propertyId : id } 
    }).subscribe(data => {
      this.user = data.user;
      this.model.email = data.user.email;
      this.model.askingPriceUnit = this.model.offerPriceUnit = this.model.walkAwayPriceUnit = 
          this.model.salePriceUnit = this.model.marketValueUnit = this.model.renovationCostUnit = 
          this.model.maintainanceCostUnit = this.model.otherCostUnit = this.user.currency;
      this.model.id = data.propertyId || null;

      this.editPropertyServiceRunning = false;
      this.getPropertyServiceRunning = false;
      
      if (!data.propertyId) {
        //we are creating a new property
        this.id = null;
        this.editMode = false;
        this.mainNavigatorService.appendLink({ displayName: 'Create Property', url: '', selected : true });
      } else {
        this.mainNavigatorService.appendLink({ displayName: 'Edit Property', url: '', selected : true });
        //we are editing an existing property
        this.id = data.propertyId;
        this.editMode = true;
        
        this.getProperty(data.propertyId); //get data
      }
    });
    this.subscription.add(newSubscription);

    //get TYPE parameter
    this.route.paramMap.map((params: ParamMap) => params.get('type')).subscribe(type => {
      if (![propertyTypes.HOUSE].includes(type)) {
        this.appService.showResults('You must provide a valid property type to continue.', 'error');
        this.router.navigate(['welcome']);
      } else {
        this.type = type;
        this.model.type = type;
        this.model.propertyTypeData.buildingType = type;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Get a property from server based on the id provided
   * @param {string} id 
   */
  getProperty(id : string) {
    const methodTrace = `${this.constructor.name} > getProperty() > `; //for debugging
    
    if (!id) {
      this.appService.showResults(`Invalid property ID`, 'error');
      this.appService.consoleLog('error', `${methodTrace} ID parameter must be provided, but was: `, id);
      return false;
    }

    this.getPropertyServiceRunning = true;

    const newSubscription = this.propertiesService.getPropertyById(this.user.email, id).subscribe(
      (property : Property) => {
        this.property = property;
        //populate the model
        // this.model.owner = property.team ? 'team' : 'me';
        // this.model.team = property.team;
        // this.model.teamSlug = property.team ? property.team.slug : null;
        // this.model.investmentDistribution = property.investmentDistribution;
        // for (let portion of property.investmentDistribution) {
        //   this.model.membersPercentage[portion.email] = portion.percentage;
        // }
        // this.model.investmentAmount = property.investmentAmount;
        // this.model.investmentAmountUnit = property.investmentAmountUnit;
        this.model.type = property.propertyType;
        if (property instanceof House) {
          this.model.propertyTypeData = {
            // type : property.type,
            // unit : property.unit,
            // amount : property.amount,
            // buyingPrice : property.buyingPrice,
            // buyingPriceUnit : property.buyingPriceUnit,
            // buyingDate : property.buyingDate
          };
        }

        this.getPropertyServiceRunning = false;
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

        this.getPropertyServiceRunning = false;
      }
    );

    this.subscription.add(newSubscription);
  }
}
