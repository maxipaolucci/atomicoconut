import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, of, Observable } from 'rxjs';
import { User } from '../../../users/models/user';
import { Property } from '../../models/property';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppService } from '../../../../app.service';
import { PropertiesService } from '../../properties.service';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { PROPERTY_TYPES } from '../../../../constants';
import { House } from '../../models/house';
import { MatSelectChange, DateAdapter, NativeDateAdapter, MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';
import { UtilService } from '../../../../util.service';
import { HouseFiguresDialogComponent } from '../house-figures-dialog/house-figures-dialog.component';
import { PropertyYieldsDialogComponent } from '../property-yields-dialog/property-yields-dialog.component';
import { map, combineLatest, flatMap } from 'rxjs/operators';

@Component({
  selector: 'properties-edit',
  templateUrl: './properties-edit.component.html',
  styleUrls: ['./properties-edit.component.scss']
})
export class PropertiesEditComponent implements OnInit, OnDestroy {

  editMode = false;
  user: User = null;
  property: Property = null;
  propertyTypes: any = null;
  id: string = null; // property id
  type: string = null; // property type
  subscription: Subscription = new Subscription();
  propertyTypeDataValid = false; // this value is set when property type data form is updated
  addressValid = false;

  // services flags
  editPropertyServiceRunning = false;
  getPropertyServiceRunning = false;
  showPropertyFiguresDialogSpinner = false;
  showPropertyYieldsDialogSpinner = false;

  // models
  model: any = {
    id : null,
    email : null, // user email for api check
    type : null,
    propertyTypeData : {}, // specific data related to the property type
    address : {},
    askingPrice : null,
    askingPriceUnit : null,
    offerPrice : null,
    offerPriceUnit : null,
    walkAwayPrice : null,
    walkAwayPriceUnit : null,
    purchasePrice : null,
    purchasePriceUnit : null,
    purchasePrice2 : null,
    purchasePrice2Unit : null,
    purchasePrice3 : null,
    purchasePrice3Unit : null,
    purchasePrice4 : null,
    purchasePrice4Unit : null,
    purchasePrice5 : null,
    purchasePrice5Unit : null,
    dateListed : null,
    reasonForSelling : null,
    marketValue : null,
    marketValueUnit : null,
    renovationCost : null,
    renovationCostUnit : null,
    maintenanceCost : null,
    maintenanceCostUnit : null,
    description : null,
    otherCost : null,
    otherCostUnit : null,
    notes : null
  };

  modelHouseFiguresResults: any = {
    loanCoverage : 80,
    interestRates : 7,
    loanTerm : 30,
    paymentFrecuency : '26',
  };

  constructor(private route: ActivatedRoute, private mainNavigatorService: MainNavigatorService, private propertiesService: PropertiesService,
      private appService: AppService, private router: Router, public utilService: UtilService, private dateAdapter: DateAdapter<NativeDateAdapter>,
      public dialog: MatDialog) {

    this.dateAdapter.setLocale('en-GB');
    this.propertyTypes = PROPERTY_TYPES;
  }

  ngOnInit() {
    const methodTrace = `${this.constructor.name} > ngOnInit() > `; // for debugging

    this.mainNavigatorService.setLinks([
      { displayName: 'Welcome', url: '/welcome', selected: false },
      { displayName: 'Investments', url: '/investments', selected: false },
      { displayName: 'Properties', url: '/properties', selected: false }
    ]);

    // generates a user source object from authUser from resolver
    const user$ = this.route.data.pipe(map((data: { authUser: User }) => data.authUser));

    // generates an property id source from id parameter in url
    const id$ = this.route.paramMap.pipe(map((params: ParamMap) => params.get('id')));

    // combine user$ and id$ sources into one object and start listen to it for changes
    const newSubscription = user$.pipe(
      combineLatest(id$, (user, id) => {
        this.user = user;
        return { user, propertyId : id };
      }),
      flatMap((data: any): Observable<Property> => {
        this.model.email = data.user.email;
        this.model.askingPriceUnit = this.model.offerPriceUnit = this.model.walkAwayPriceUnit =
            this.model.purchasePriceUnit = this.model.marketValueUnit = this.model.renovationCostUnit =
            this.model.maintenanceCostUnit = this.model.otherCostUnit = this.user.currency;
        this.model.id = data.propertyId || null;
  
        this.editPropertyServiceRunning = false;
        this.getPropertyServiceRunning = false;
  
        if (!data.propertyId) {
          // we are creating a new property
          this.id = null;
          this.editMode = false;
          this.mainNavigatorService.appendLink({ displayName: 'Create Property', url: '', selected : true });
          return of(null);
        } else {
          this.mainNavigatorService.appendLink({ displayName: 'Edit Property', url: '', selected : true });
          // we are editing an existing property
          this.id = data.propertyId;
          this.editMode = true;
          
          this.getPropertyServiceRunning = true;
          return this.propertiesService.getPropertyById$(this.user.email, data.propertyId);
        }
      })
    ).subscribe((property: Property) => {
      if (property) {
        this.populateModel(property);
      }
      
      this.getPropertyServiceRunning = false;
    },
    (error: any) => {
      this.appService.consoleLog('error', `${methodTrace} There was an error in the server while performing this action > `, error);
      if (error.codeno === 400) {
        this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, 'error');
      } else if (error.codeno === 461 || error.codeno === 462) {
        this.appService.showResults(error.msg, 'error');
        this.router.navigate(['/welcome']);
      } else {
        this.appService.showResults(`There was an error with this service and the information provided.`, 'error');
      }

      this.getPropertyServiceRunning = false;
    });
    this.subscription.add(newSubscription);

    // get TYPE parameter
    this.route.paramMap.pipe(map((params: ParamMap) => params.get('type'))).subscribe(type => {
      if (![PROPERTY_TYPES.HOUSE].includes(type)) {
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
   * Populates the model with the property as param
   * @param { Property } property
   */
  populateModel(property: Property) {
    const methodTrace = `${this.constructor.name} > populateModel() > `; // for debugging

    this.property = property;
    // populate the model
    this.model.address = property.address;
    this.model.askingPrice = property.askingPrice;
    this.model.askingPriceUnit = property.askingPriceUnit;
    this.model.offerPrice = property.offerPrice;
    this.model.offerPriceUnit = property.offerPriceUnit;
    this.model.walkAwayPrice = property.walkAwayPrice;
    this.model.walkAwayPriceUnit = property.walkAwayPriceUnit;
    this.model.purchasePrice = property.purchasePrice;
    this.model.purchasePriceUnit = property.purchasePriceUnit;
    this.model.purchasePrice2 = property.purchasePrice2;
    this.model.purchasePrice2Unit = property.purchasePrice2Unit;
    this.model.purchasePrice3 = property.purchasePrice3;
    this.model.purchasePrice3Unit = property.purchasePrice3Unit;
    this.model.purchasePrice4 = property.purchasePrice4;
    this.model.purchasePrice4Unit = property.purchasePrice4Unit;
    this.model.purchasePrice5 = property.purchasePrice5;
    this.model.purchasePrice5Unit = property.purchasePrice5Unit;
    this.model.dateListed = property.dateListed;
    this.model.reasonForSelling = property.reasonForSelling;
    this.model.marketValue = property.marketValue;
    this.model.marketValueUnit = property.marketValueUnit;
    this.model.renovationCost = property.renovationCost;
    this.model.renovationCostUnit = property.renovationCostUnit;
    this.model.maintenanceCost = property.maintenanceCost;
    this.model.maintenanceCostUnit = property.maintenanceCostUnit;
    this.model.description = property.description;
    this.model.otherCost = property.otherCost;
    this.model.otherCostUnit = property.otherCostUnit;
    this.model.notes = property.notes;
    this.model.type = property.type;

    if (property instanceof House) {
      this.model.propertyTypeData = {
        buildingType : property.buildingType,
        titleType : property.titleType,
        landArea : property.landArea,
        floorArea : property.floorArea,
        registeredValue : property.registeredValue,
        registeredValueUnit : property.registeredValueUnit,
        rates : property.rates,
        ratesUnit : property.ratesUnit,
        insurance : property.insurance,
        insuranceUnit : property.insuranceUnit,
        capitalGrowth : property.capitalGrowth,
        bedrooms : property.bedrooms,
        bathrooms : property.bathrooms,
        parkingSpaces : property.parkingSpaces,
        fenced : property.fenced,
        rented : property.rented,
        rentPrice : property.rentPrice,
        rentPriceUnit : property.rentPriceUnit,
        rentPricePeriod : property.rentPricePeriod,
        rentAppraisalDone : property.rentAppraisalDone,
        vacancy : property.vacancy,
        bodyCorporate : property.bodyCorporate,
        bodyCorporateUnit : property.bodyCorporateUnit,
        utilitiesCost : property.utilitiesCost,
        utilitiesCostUnit : property.utilitiesCostUnit,
        managed : property.managed,
        managerRate : property.managerRate,
        agent : property.agent
      };
    }
  }

  onSubmit() {
    const methodTrace = `${this.constructor.name} > onSubmit() > `; // for debugging

    this.editPropertyServiceRunning = true;

    this.model.createdOn = new Date(Date.now());
    this.model.updatedOn = new Date(Date.now());
    // call the investment create service
    const newSubscription = this.propertiesService.create$(this.model).subscribe(
      (data: any) => {
        if (data && data.id && data.type) {
          this.appService.showResults(`Property successfully created!`, 'success');
          this.router.navigate(['/properties/', data.type, 'edit', data.id]);
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
          this.editPropertyServiceRunning = false;
        }
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the create/edit property service.`, error);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error with the property services, please try again in a few minutes.`, 'error');
        }

        this.editPropertyServiceRunning = false;
      }
    );

    this.subscription.add(newSubscription);
  }

  onUpdate() {
    const methodTrace = `${this.constructor.name} > onUpdate() > `; // for debugging

    this.editPropertyServiceRunning = true;

    this.model.updatedOn = new Date(Date.now());
    // call the investment create service
    const newSubscription = this.propertiesService.update$(this.model).subscribe(
      (data: any) => {
        if (data && data.id && data.type) {
          this.appService.showResults(`Property successfully updated!`, 'success');
        } else {
          this.appService.consoleLog('error', `${methodTrace} Unexpected data format.`);
        }

        this.editPropertyServiceRunning = false;
      },
      (error: any) => {
        this.appService.consoleLog('error', `${methodTrace} There was an error with the create/edit property service.`, error);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error with the property services, please try again in a few minutes.`, 'error');
        }

        this.editPropertyServiceRunning = false;
      }
    );

    this.subscription.add(newSubscription);
  }

  onCurrencyUnitChange($event: MatSelectChange) {
    this.model[$event.source.id] = $event.value;
  }

  onPropertyTypeDataChange($event: any) {
    this.model.propertyTypeData = $event.value.model;
    this.propertyTypeDataValid = $event.value.valid;
  }

  onAddressChange($event: any) {
    this.model.address = $event.value.address;
    this.addressValid = $event.value.valid;
  }

  includedFormsValid(): boolean {
    return this.propertyTypeDataValid && this.addressValid;
  }

  openHouseResultsFiguresDialog() {
    const methodTrace = `${this.constructor.name} > openHouseResultsFiguresDialog() > `; // for debugging

    const houseFiguresDialogRef = this.dialog.open(HouseFiguresDialogComponent, {
      data: {
        model : this.model,
        modelHouseFiguresResults : this.modelHouseFiguresResults
      }
    });

    const newSubscription = houseFiguresDialogRef.afterClosed().subscribe(modelHouseFiguresResults => {
      if (houseFiguresDialogRef.componentInstance.modelHouseFiguresResults) {
        this.modelHouseFiguresResults = modelHouseFiguresResults;
      }

      this.showPropertyFiguresDialogSpinner = false;
    });
    this.subscription.add(newSubscription);
    
    return false;
  }

  openPropertyYieldsDialog() {
    const methodTrace = `${this.constructor.name} > openPropertyYieldsDialog() > `; // for debugging

    const propertyYieldsDialogRef = this.dialog.open(PropertyYieldsDialogComponent, {
      data: {
        model : this.model,
      }
    });

    const newSubscription = propertyYieldsDialogRef.afterClosed().subscribe(dialogResult => {
      if (propertyYieldsDialogRef.componentInstance.model) {
        this.model = propertyYieldsDialogRef.componentInstance.model;
      }

      this.showPropertyYieldsDialogSpinner = false;
    });
    this.subscription.add(newSubscription);
    
    return false;
  }
}
