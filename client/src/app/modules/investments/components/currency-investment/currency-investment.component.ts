import { Component, OnInit, Input, Output, OnDestroy, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'currency-investment',
  templateUrl: './currency-investment.component.html',
  styleUrls: ['./currency-investment.component.scss']
})
export class CurrencyInvestmentComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('editCurrencyInvestmentForm') form;
  @Input() type : string = 'currency'; //currency type. e.g: currency | crypto
  @Input() unit : string; //e.g. : US Dollar, Australian Dollar, Monero, Bitcoin , depends on the type
  @Output() values: EventEmitter<any> = new EventEmitter();
  model : any = {
    type : null, // currency type. e.g: currency | crypto
    unit : null //e.g. : US Dollar, Australian Dollar, Monero, Bitcoin , depends on the type
  }
  subscription : Subscription = new Subscription();

  constructor() { }

  ngOnInit() {
    this.model.type = this.type;
    this.model.unit = this.unit;
    this.values.emit({ value : this.model });
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; //for debugging
    
    //this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  onCurrencyUnitChange($event : MatSelectChange) {
    if ($event.source.id === 'currencyInvestmentUnit') {
      this.model.unit = $event.value;
      this.values.emit({ value : this.model });
    }
  }

  ngAfterViewInit(): void {
    const newSubscription = this.form.valueChanges.debounceTime(500).subscribe(values => {
      
      console.log(values);
      this.values.emit({ value : this.model });
    });

    this.subscription.add(newSubscription);
  }
}
