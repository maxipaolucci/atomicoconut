import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateAdapter, NativeDateAdapter, MatSelectChange } from '@angular/material';
import { AppService } from '../../../../app.service';
import { UtilService } from '../../../../util.service';
import { INVESTMENTS_TYPES } from '../../../../constants';

@Component({
  selector: 'property-investment-form',
  templateUrl: './property-investment-form.component.html',
  styleUrls: ['./property-investment-form.component.scss']
})
export class PropertyInvestmentFormComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('editPropertyInvestmentForm') form;
  @Input() defaultValues : any = null; //the default values of the component model  
  @Output() values: EventEmitter<any> = new EventEmitter();
  model : any = {
    type : null,
    property : null,
    buyingPrice : null,
    buyingPriceUnit : null,
    buyingDate : null
  }
  subscription : Subscription = new Subscription();

  constructor(private dateAdapter: DateAdapter<NativeDateAdapter>, private appService : AppService, 
      public utilService : UtilService) {
    
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.model.type = INVESTMENTS_TYPES.PROPERTY;
    this.model.buyingDate = new Date(Date.now());
    this.model.buyingPriceUnit = 'USD';
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
