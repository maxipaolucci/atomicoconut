import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UtilService } from '../../../../util.service';
import { AppService } from '../../../../app.service';
import { MatSelectChange, MatSlideToggleChange } from '@angular/material';
import { HOUSE_BUILDING_TYPES } from '../../../../constants';

@Component({
  selector: 'houses-edit',
  templateUrl: './houses-edit.component.html',
  styleUrls: ['./houses-edit.component.scss']
})
export class HousesEditComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('editHouseForm') form;
  @Input() defaultValues : any = null; //the default values of the component model
  @Input() defaultCurrencyUnit : string = 'USD'; //the default currency unit
  @Output() values: EventEmitter<any> = new EventEmitter();
  model : any = {
    buildingType : null,
    titleType : null,
    landArea : null,
    floorArea : null,
    registeredValue : null,
    registeredValueUnit : null,
    rates : null,
    ratesUnit : null,
    insurance : null,
    insuranceUnit : null,
    capitalGrowth : null,
    bedrooms : null,
    bathrooms : null,
    parkingSpaces : null,
    fenced : false,
    rented : false,
    rentPrice : null,
    rentPriceUnit : null,
    rentPricePeriod : null,
    rentAppraisalDone : false,
    vacancy : null,
    bodyCorporate : null,
    bodyCorporateUnit : null,
    utilitiesCost : null,
    utilitiesCostUnit : null,
    managed : false,
    managerRate : null,
    agent : null
  }
  subscription : Subscription = new Subscription();

  constructor(private appService : AppService, public utilService : UtilService) { }

  ngOnInit() {
    this.model.registeredValueUnit = this.model.ratesUnit = this.model.insuranceUnit = this.model.rentPriceUnit = this.model.bodyCorporateUnit = 
        this.model.utilitiesCostUnit = this.defaultCurrencyUnit;
    this.model.buildingType = HOUSE_BUILDING_TYPES.HOUSE;
    this.model.rentPricePeriod = 'weekly';
    
    Object.assign(this.model, this.defaultValues);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; //for debugging
    
    //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  onCurrencyUnitChange($event : MatSelectChange) {
    this.model[$event.source.id] = $event.value;
    
    this.emitValues();
  }

  onSlideToggleChange($event : MatSlideToggleChange) {
    this.model[$event.source.id] = $event.checked;

    this.emitValues();
  }

  ngAfterViewInit(): void {
    //send data before touching any value
    this.emitValues();

    //after any event in the form we send updated data
    const newSubscription = this.form.valueChanges.debounceTime(500).subscribe(values => {
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
}
