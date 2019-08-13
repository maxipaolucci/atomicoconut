import { Component, OnInit, Inject, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectChange } from '@angular/material';
import { PROPERTY_TYPES } from '../../../../constants';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'property-yields-dialog',
  templateUrl: './property-yields-dialog.component.html',
  styleUrls: ['./property-yields-dialog.component.scss']
})
export class PropertyYieldsDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('propertyYieldsDialogForm', {static: false}) form;
  model: any = {};
  formChangesSubscription: any = null;
  subscription: Subscription = new Subscription();

  purchasePrice = 0;
  purchasePrice2 = 0;
  purchasePrice3 = 0;
  purchasePrice4 = 0;
  purchasePrice5 = 0;
  grossYield = 0;
  netYield = 0;
  grossYield2 = 0;
  netYield2 = 0;
  grossYield3 = 0;
  netYield3 = 0;
  grossYield4 = 0;
  netYield4 = 0;
  grossYield5 = 0;
  netYield5 = 0;
  grossAnnualRent = 0;
  netAnnualRent = 0;
  expenses = 0;
  weeklyRent = 0;
  rentPrice = 0;
  rentPricePeriod = 'weekly';
  vacancy = 0;
  renovationCost = 0;
  maintenanceCost = 0;
  bodyCorporate = 0;
  rates = 0;
  utilitiesCost = 0;
  insurance = 0;
  otherCost = 0;
  managerRate = 0;

  constructor(public dialogRef: MatDialogRef<PropertyYieldsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.model = data.model;
  }

  ngOnInit() {
    this.initValues();
    this.calculateYields();
  }

  ngOnDestroy() {
    const methodTrace = `${this.constructor.name} > ngOnDestroy() > `; // for debugging
    
    // this.appService.consoleLog('info', `${methodTrace} Component destroyed.`);
    this.subscription.unsubscribe();
  }

  initValues() {
    const methodTrace = `${this.constructor.name} > initValues() > `; // for debugging

    // set the same purchasePrice unit to every purchase price field
    this.model.purchasePrice2Unit = this.model.purchasePrice3Unit = this.model.purchasePrice4Unit = this.model.purchasePrice5Unit = this.model.purchasePriceUnit;
    this.purchasePrice = this.model.purchasePrice || 0;
    this.purchasePrice2 = this.model.purchasePrice2 || 0;
    this.purchasePrice3 = this.model.purchasePrice3 || 0;
    this.purchasePrice4 = this.model.purchasePrice4 || 0;
    this.purchasePrice5 = this.model.purchasePrice5 || 0;
    
    this.rentPrice = this.model.propertyTypeData.rentPrice || 0;
    this.rentPricePeriod = this.model.propertyTypeData.rentPricePeriod || 'weekly';
    this.vacancy = this.model.propertyTypeData.vacancy || 0;
    this.renovationCost = this.model.renovationCost || 0;
    this.maintenanceCost = this.model.maintenanceCost || 0;
    this.bodyCorporate = this.model.propertyTypeData.bodyCorporate || 0;
    this.rates = this.model.propertyTypeData.rates || 0;
    this.utilitiesCost = this.model.propertyTypeData.utilitiesCost || 0;
    this.insurance = this.model.propertyTypeData.insurance || 0;
    this.otherCost = this.model.otherCost || 0;
    this.managerRate = this.model.propertyTypeData.managed ? this.model.propertyTypeData.managerRate || 0 : 0;
  }

  calculateYields() {
    const methodTrace = `${this.constructor.name} > calculateYields() > `; // for debugging

    this.weeklyRent = this.getRentPricePerWeek();
    this.grossAnnualRent = this.weeklyRent * 52;
    this.netAnnualRent = this.grossAnnualRent - this.weeklyRent * this.vacancy;
    this.expenses = this.renovationCost + this.maintenanceCost + this.bodyCorporate + this.rates
        + this.utilitiesCost + this.insurance + this.otherCost 
        + this.netAnnualRent * (this.managerRate / 100);
    
    this.grossYield = this.grossAnnualRent / this.purchasePrice;
    this.netYield = (this.netAnnualRent - this.expenses) / this.purchasePrice;
    this.grossYield2 = this.grossAnnualRent / this.purchasePrice2;
    this.netYield2 = (this.netAnnualRent - this.expenses) / this.purchasePrice2;
    this.grossYield3 = this.grossAnnualRent / this.purchasePrice3;
    this.netYield3 = (this.netAnnualRent - this.expenses) / this.purchasePrice3;
    this.grossYield4 = this.grossAnnualRent / this.purchasePrice4;
    this.netYield4 = (this.netAnnualRent - this.expenses) / this.purchasePrice4;
    this.grossYield5 = this.grossAnnualRent / this.purchasePrice5;
    this.netYield5 = (this.netAnnualRent - this.expenses) / this.purchasePrice5;
  }

  /**
   * Calculates the price per week.
   * 
   * @returns { number } . Rent price per week
   */
  getRentPricePerWeek(): number {
    let price = 0;
    
    if (this.rentPrice) {
      price = this.rentPricePeriod === 'monthly' ? this.rentPrice * 12 / 52 : this.rentPrice;
    }
    
    return price;
  }

  ngAfterViewInit(): void {
    if (this.form && !this.formChangesSubscription) {
      this.subscribeFormValueChanges();
    }
  }

  /**
   * This methods subscribes to changes on the main form in the view. Any time this form cnges we recalculate the yields values
   */
  subscribeFormValueChanges() {
    this.formChangesSubscription = this.form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(values => {
      this.initValues();
      this.calculateYields();
    });

    this.subscription.add(this.formChangesSubscription);
  }
}
