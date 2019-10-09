import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DateAdapter, NativeDateAdapter, MatSelectChange, MatDialog } from '@angular/material';
import { AppService } from '../../../../app.service';
import { UtilService } from '../../../../util.service';
import { INVESTMENTS_TYPES, DEFAULT_CURRENCY, SnackbarNotificationTypes, ConsoleNotificationTypes } from '../../../../constants';
import { PropertiesService } from '../../../properties/properties.service';
import { Property } from '../../../properties/models/property';
import { Router } from '@angular/router';
import { User } from '../../../users/models/user';
import { PropertySelectorDialogComponent } from '../../../properties/components/property-selector-dialog/property-selector-dialog.component';

@Component({
  selector: 'property-investment-form',
  templateUrl: './property-investment-form.component.html',
  styleUrls: ['./property-investment-form.component.scss']
})
export class PropertyInvestmentFormComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('editPropertyInvestmentForm', {static: false}) form;
  @Input() defaultValues: any = null; // the default values of the component model  
  @Input() user: User = null;
  @Output() values: EventEmitter<any> = new EventEmitter();
  model: any = {
    type : null,
    property : null,
    propertyId : null, // just used here to retireve a property when the parent component set it. Don't use this value in the server, use the one in the property object instead
    address : null, // just used for the ngmodel in the view. Don't use this value in the server, use the address in the property object instead
    buyingPrice : null,
    buyingPriceUnit : null,
    buyingDate : null
  };
  subscription: Subscription = new Subscription();
  getPropertyServiceRunning = false;

  constructor(private dateAdapter: DateAdapter<NativeDateAdapter>, private appService: AppService, public dialog: MatDialog,
      public utilService: UtilService, private propertiesService: PropertiesService, private router: Router) {
    
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.model.type = INVESTMENTS_TYPES.PROPERTY;
    this.model.buyingDate = new Date(Date.now());
    this.model.buyingPriceUnit = this.user.currency || DEFAULT_CURRENCY;
    Object.assign(this.model, this.defaultValues);
    
    if (this.model.propertyId) {
      // when creating from the property "invest action" or some component that shows properties an allow the creation of an investment of it
      this.getProperty(this.model.propertyId);
    } else if (this.model.property) {
      // when editing a property investment
      this.model.address = this.model.property.address.description; 
    }
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging
    
    // this.appService.consoleLog(ConsoleNotificationTypes.INFO, `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  onCurrencyUnitChange($event: MatSelectChange) {
    this.model[$event.source.id] = $event.value;

    this.emitValues();
  }

  ngAfterViewInit(): void {
    // send data before touching any value
    this.emitValues();

    // after any event in the form we send updated data
    const newSubscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe(values => {
      this.emitValues();
    });
    this.subscription.add(newSubscription);
  }

  emitValues() {
    this.values.emit({ 
      value : {
        model : this.model,
        valid : this.form.valid
      } 
    });
  }

  /**
   * Get a property from server based on the id provided
   * @param {string} id 
   */
  getProperty(id: string) {
    const methodTrace = `${this.constructor.name} > getProperty() > `; // for debugging
    
    if (!id) {
      this.appService.showResults(`Invalid property ID`, SnackbarNotificationTypes.ERROR);
      this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} ID parameter must be provided, but was: `, id);
      this.router.navigate(['/properties']);
    }

    this.getPropertyServiceRunning = true;

    const newSubscription = this.propertiesService.getPropertyById$(this.user.email, id).subscribe(
      (property: Property) => {
        this.setProperty(property);
      },
      (error: any) => {
        this.appService.consoleLog(ConsoleNotificationTypes.ERROR, `${methodTrace} There was an error in the server while performing this action > `, error);
        if (error.codeno === 400) {
          this.appService.showResults(`There was an error in the server while performing this action, please try again in a few minutes.`, SnackbarNotificationTypes.ERROR);
        } else if (error.codeno === 461 || error.codeno === 462) {
          this.appService.showResults(error.msg, SnackbarNotificationTypes.ERROR);
        } else {
          this.appService.showResults(`There was an error with this service and the information provided.`, SnackbarNotificationTypes.ERROR);
        }

        this.router.navigate(['/properties']);
        this.getPropertyServiceRunning = false;
      }
    );

    this.subscription.add(newSubscription);
  }

  setProperty(property: Property) {
    if (property.createdBy.email !== this.user.email) {
      // we cannot create an investment of a property not created by me
      this.appService.showResults(`Only the property creator (${property.createdBy.name}) is allowed to create an investment with this property.`, SnackbarNotificationTypes.ERROR);
      return this.router.navigate(['/properties']);
    } else {
      this.model.property = property;
      this.model.address = property.address.description;
      let buyingPrice = null;
      let buyingPriceUnit = null;

      if (property.purchasePrice) {
        buyingPrice = property.purchasePrice;
        buyingPriceUnit = property.purchasePriceUnit;
      } else if (property.offerPrice) {
        buyingPrice = property.offerPrice;
        buyingPriceUnit = property.offerPriceUnit;
      } else if (property.askingPrice) {
        buyingPrice = property.askingPrice;
        buyingPriceUnit = property.askingPriceUnit;
      } else if (property.walkAwayPrice) {
        buyingPrice = property.walkAwayPrice;
        buyingPriceUnit = property.walkAwayPriceUnit;
      }
      
      this.model.buyingPrice = buyingPrice;
      this.model.buyingPriceUnit = buyingPriceUnit || this.user.currency || DEFAULT_CURRENCY;

      this.getPropertyServiceRunning = false;
    }
  }

  openPropertySelectionDialog() {
    const methodTrace = `${this.constructor.name} > openPropertySelectionDialog() > `; // for debugging
    
    const propertySelectorDialogRef = this.dialog.open(PropertySelectorDialogComponent, {
      data: {
        title : 'Select a property'
      }
    });

    const newSubscription = propertySelectorDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setProperty(result);
      }
    });
    this.subscription.add(newSubscription); 

    return false;
  }
}
