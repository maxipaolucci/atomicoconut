import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UtilService } from '../../../../util.service';
import { AppService } from '../../../../app.service';
import { MatSelectChange } from '@angular/material';
import { houseBuildingTypes } from '../../../../constants';

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
    this.model.buildingType = houseBuildingTypes.HOUSE;
    this.model.rentPricePeriod = 'week';
    
    Object.assign(this.model, this.defaultValues);
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; //for debugging
    
    //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  onCurrencyUnitChange($event : MatSelectChange) {
    if ($event.source.id === 'registeredValueUnit') {
      this.model.registeredValueUnit = $event.value;
    } else if ($event.source.id === 'ratesUnit') {
      this.model.buyingPriceUnit = $event.value;
    }
    
    this.values.emit({ 
      value : {
        model : this.model,
        valid : this.form.valid
      } 
    });
  }

  ngAfterViewInit(): void {
    //send data before touching any value
    this.values.emit({ 
      value : {
        model : this.model,
        valid : this.form.valid
      } 
    });

    //after any event in the form we send updated data
    const newSubscription = this.form.valueChanges.debounceTime(500).subscribe(values => {
      this.values.emit({ 
        value : {
          model : this.model,
          valid : this.form.valid
        } 
      });
    });
    this.subscription.add(newSubscription);
  }
}
