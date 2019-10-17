import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { User } from '../../../users/models/user';
import { Property } from '../../models/property';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppService } from '../../../../app.service';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { PROPERTY_TYPES, DEFAULT_CURRENCY, SnackbarNotificationTypes } from '../../../../constants';
import { House } from '../../models/house';
import { MatSelectChange, DateAdapter, NativeDateAdapter, MatDialog } from '@angular/material';
import { UtilService } from '../../../../util.service';
import { HouseFiguresDialogComponent } from '../house-figures-dialog/house-figures-dialog.component';
import { PropertyYieldsDialogComponent } from '../property-yields-dialog/property-yields-dialog.component';
import { map } from 'rxjs/operators';
import { FilesUploaderChange } from '../../../../modules/shared/components/files-uploader/models/filesUploaderChange';
import { ShareWithDialogComponent } from '../share-with-dialog/share-with-dialog.component';
import { userSelector } from 'src/app/modules/users/user.selectors';
import { Store } from '@ngrx/store';
import { State } from 'src/app/main.reducer';
import { LoadingData } from 'src/app/models/loadingData';
import { loadingSelector } from 'src/app/app.selectors';
import { RequestUpdate, RequestCreate } from '../../property.actions';
import _ from 'lodash';
import { propertyByIdSelector } from '../../property.selectors';

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
  propertyPhotos: File[] = [];
  loading$: Observable<LoadingData>;

  // services flags
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
    notes : null,
    photos : [],
    unit: null,
    status: null,
    statusDetail: null,
    sharedWith: []
  };

  modelHouseFiguresResults: any = {
    loanCoverage : 80,
    interestRates : 7,
    loanTerm : 30,
    paymentFrecuency : '26',
  };

  constructor(
      private route: ActivatedRoute, 
      private mainNavigatorService: MainNavigatorService, 
      private appService: AppService, 
      private router: Router, 
      public utilService: UtilService, 
      private dateAdapter: DateAdapter<NativeDateAdapter>,
      public dialog: MatDialog,
      private store: Store<State>) {

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

    this.loading$ = this.store.select(loadingSelector());

    //start listening to Pusher notifications related to this component
    this.bindToPushNotificationEvents();

    this.subscription.add(this.store.select(userSelector()).subscribe((user: User) => this.user = user));
    this.model.email = this.user.email;
    this.model.askingPriceUnit = this.model.offerPriceUnit = this.model.walkAwayPriceUnit =
      this.model.purchasePriceUnit = this.model.marketValueUnit = this.model.renovationCostUnit =
      this.model.maintenanceCostUnit = this.model.otherCostUnit = (this.user.currency || DEFAULT_CURRENCY);

    // get property from resolver
    const newSubscription = this.store.select(propertyByIdSelector(this.route.snapshot.params.id)) // I read this one instead from resolver because this has always the latest information when we update the property
      .subscribe((property: Property) => {
        if (!property) {
          // we are creating a new property
          this.id = this.model.id = null;
          this.editMode = false;
          this.mainNavigatorService.appendLink({ displayName: 'Create Property', url: '', selected : true });
        } else {
          if (!this.editMode) {
            this.mainNavigatorService.appendLink({ displayName: 'Edit Property', url: '', selected : true });
          }
          
          // we are editing an existing property
          this.id = this.model.id = property.id;
          this.editMode = true;
          this.populateModel(property);
        }
      });
    this.subscription.add(newSubscription);

    // get TYPE parameter
    this.route.paramMap.pipe(map((params: ParamMap) => params.get('type'))).subscribe(type => {
      if (![PROPERTY_TYPES.HOUSE].includes(type)) {
        this.appService.showResults('You must provide a valid property type to continue.', SnackbarNotificationTypes.ERROR);
        this.router.navigate(['welcome']);
      } else {
        this.type = type;
        this.model.type = type;
        this.model.propertyTypeData.buildingType = type;
      }
    });
  }

  /**
   * Start listening to Pusher notifications comming from server
   */
  bindToPushNotificationEvents() {
    this.appService.pusherChannel.bind('property-updated', data => {
      if (this.property.id == data.property.id) {
        this.appService.showResults(`This property was just updated by ${data.name}`, SnackbarNotificationTypes.INFO);
      }
    });

    this.appService.pusherChannel.bind('property-deleted', data => {
      if (this.property.id == data.id) {
        const unit = data.unit && data.unit != 'null' ? `${data.unit}/` : '';
        this.appService.showResults(`The property ${unit}${data.address} was just deleted by its admin ${data.name}.`, SnackbarNotificationTypes.INFO, 20000);
        this.router.navigate(['/properties']);
      }
    });
  }

  /**
   * Stop listening to Pusher notifications comming from server
   */
  unbindToPushNotificationEvents() {
    this.appService.pusherChannel.unbind('property-deleted');
    this.appService.pusherChannel.unbind('property-updated');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.unbindToPushNotificationEvents();
  }

  /**
   * Populates the model with the property as param
   * @param { Property } property
   */
  populateModel(property: Property) {
    const methodTrace = `${this.constructor.name} > populateModel() > `; // for debugging

    this.property = _.cloneDeep(property);
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
    this.model.photos = property.photos;
    this.model.type = property.type;
    this.model.unit = property.unit;
    this.model.status = property.status;
    this.model.statusDetail = property.statusDetail;

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

    this.model.createdOn = new Date(Date.now());
    this.model.updatedOn = new Date(Date.now());

    this.store.dispatch(new RequestCreate({ model: _.cloneDeep(this.model) }));
  }

  onUpdate() {
    const methodTrace = `${this.constructor.name} > onUpdate() > `; // for debugging

    //this.editPropertyServiceRunning = true;

    this.model.updatedOn = new Date(Date.now());
    this.model.sharedWith = []; // reset the sharedWith array
    for (const member of this.property.sharedWith) {
      this.model.sharedWith.push(member.email);
    }
    this.model.propertyPhotos = this.propertyPhotos;
    // to prevent receiving notification of actions performed by current user
    this.model.pusherSocketID = this.appService.pusherSocketID;

    this.store.dispatch(new RequestUpdate({ model: _.cloneDeep(this.model) }));
  }

  onCurrencyUnitChange($event: MatSelectChange) {
    this.model[$event.source.id] = $event.value;
  }

  onPhotosChange($event: FilesUploaderChange) {
    this.propertyPhotos = $event.value;
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

  removeShareWith(index: number) {
    this.property.sharedWith.splice(index, 1);
  }

  openShareWithDialog() {
    const shareWithDialogRef = this.dialog.open(ShareWithDialogComponent, {
      width: '250px',
      data: {}
    });

    const newSubscription = shareWithDialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newMember = new User('', result);
        this.property.sharedWith.push(newMember);
      }
    });

    this.subscription.add(newSubscription);

    return false;
  }
}
