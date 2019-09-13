import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, of, Observable } from 'rxjs';
import { User } from '../../../users/models/user';
import { Property } from '../../models/property';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppService } from '../../../../app.service';
import { PropertiesService } from '../../properties.service';
import { MainNavigatorService } from '../../../shared/components/main-navigator/main-navigator.service';
import { PROPERTY_TYPES, DEFAULT_CURRENCY, ConsoleNotificationTypes, SnackbarNotificationTypes } from '../../../../constants';
import { House } from '../../models/house';
import { MatSelectChange, DateAdapter, NativeDateAdapter, MatDialog } from '@angular/material';
import { UtilService } from '../../../../util.service';
import { HouseFiguresDialogComponent } from '../house-figures-dialog/house-figures-dialog.component';
import { PropertyYieldsDialogComponent } from '../property-yields-dialog/property-yields-dialog.component';
import { map, combineLatest, flatMap } from 'rxjs/operators';
import { FilesUploaderChange } from '../../../../modules/shared/components/files-uploader/models/filesUploaderChange';
import { ShareWithDialogComponent } from '../share-with-dialog/share-with-dialog.component';

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

    //start listening to Pusher notifications related to this component
    this.bindToPushNotificationEvents();

    // generates a user source object from authUser from resolver
    const user$ = this.route.data.pipe(map((data: { authUser: User }) => data.authUser));

    // generates a property id source from id parameter in url
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
            this.model.maintenanceCostUnit = this.model.otherCostUnit = (this.user.currency || DEFAULT_CURRENCY);
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
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} There was an error in the server while performing this action > `, error);
      if (error.codeno === 400) {
        this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, SnackbarNotificationTypes.ERROR);
      } else if (error.codeno === 461 || error.codeno === 462) {
        this.appService.showResults(error.msg, SnackbarNotificationTypes.ERROR);
        this.router.navigate(['/welcome']);
      } else {
        this.appService.showResults(`There was an error with this service and the information provided.`, SnackbarNotificationTypes.ERROR);
      }

      this.getPropertyServiceRunning = false;
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

    this.editPropertyServiceRunning = true;

    this.model.createdOn = new Date(Date.now());
    this.model.updatedOn = new Date(Date.now());
    // call the investment create service
    const newSubscription = this.propertiesService.create$(this.model).subscribe(
      (data: any) => {
        if (data && data.id && data.type) {
          this.appService.showResults(`Property successfully created!`, SnackbarNotificationTypes.SUCCESS);
          this.router.navigate(['/properties/', data.type, 'edit', data.id]);
        } else {
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
          this.editPropertyServiceRunning = false;
        }
      },
      (error: any) => {
        this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} There was an error with the create/edit property service.`, error);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error with the property services, please try again in a few minutes.`, SnackbarNotificationTypes.ERROR);
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

    this.model.sharedWith = []; // reset the sharedWith array
    for (const member of this.property.sharedWith) {
      this.model.sharedWith.push(member.email);
    }

    this.model.propertyPhotos = this.propertyPhotos;
    
    // call the property update service
    const newSubscription = this.propertiesService.update$(this.model).subscribe(
      (data: any) => {
        if (data && data.id && data.type) {
          const messages: any[] = [
            {
              message : `Property successfully updated!`,
              type : 'success'
            }
          ];

          if (data.propertyUsersUpdateResult && data.propertyUsersUpdateResult.emailsNotRegistered.length) {
            // handle not registered users
            const message = {
              message : `The following emails added to the team are not registered users in AtomiCoconut: `,
              duration : 8000
            };
            
            for (const email of data.propertyUsersUpdateResult.emailsNotRegistered) {
              message.message += `"${email}", `;
            }

            message.message = message.message.slice(0, -2); // remove last comma char
            message.message += '. We sent them an email to create an account. Once they do it try to add them again.';

            messages.push(message);
          }

          if (data.propertyUsersUpdateResult && data.propertyUsersUpdateResult.updatedList) {
            this.property.sharedWith = [];
            for (const member of data.propertyUsersUpdateResult.updatedList) {
              this.property.sharedWith.push(new User(member.name, member.email, member.gravatar));
            }
          }

          this.appService.showManyResults(messages);
        } else {
          this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} Unexpected data format.`);
        }

        this.editPropertyServiceRunning = false;
      },
      (error: any) => {
        this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} There was an error with the create/edit property service.`, error);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error with the property services, please try again in a few minutes.`, SnackbarNotificationTypes.ERROR);
        }

        this.editPropertyServiceRunning = false;
      }
    );

    this.subscription.add(newSubscription);
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
