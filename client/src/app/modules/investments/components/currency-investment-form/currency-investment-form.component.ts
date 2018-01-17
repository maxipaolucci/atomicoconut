import { Component, OnInit, Input, Output, OnDestroy, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { MatSelectChange } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { UtilService } from '../../../../util.service';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'currency-investment-form',
  templateUrl: './currency-investment-form.component.html',
  styleUrls: ['./currency-investment-form.component.scss']
})
export class CurrencyInvestmentFormComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('editCurrencyInvestmentForm') form;
  @Input() defaultValues : any = null; //the default values of the component model  
  @Output() values: EventEmitter<any> = new EventEmitter();
  model : any = {
    type : null, // currency type. e.g: currency | crypto
    unit : null, //e.g. : US Dollar, Australian Dollar, Monero, Bitcoin , depends on the type
    amount : null, //the amount bought,
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
    this.model.unit = this.model.type === 'currency' ? 'USD' : 'BTC';
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
    if ($event.source.id === 'currencyInvestmentUnit') {
      this.model.unit = $event.value;
    } else if ($event.source.id === 'buyingPriceUnit') {
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