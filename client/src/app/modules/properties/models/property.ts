import { User } from '../../users/models/user';

export class Property {

  type : 'house' /*| 'building' | 'condo'*/;
  address : string;
  createdBy : User;
  landArea : number; //square meters
  floorArea : number; //square meters
  askingPrice : number;
  askingPriceUnit : string;
  offerPrice : number;
  offerPriceUnit : string;
  walkAwayPrice : number;
  walkAwayPriceUnit : string;
  salePrice : number;
  salePriceUnit : string;
  dateListed : Date;
  reasonForSelling : string;
  marketValue : number;
  marketValueUnit : string;
  registeredValue : number;
  registeredValueUnit : string;
  rates : number;
  ratesUnit : string;
  insurance : number;
  insuranceUnit : string;
  renovationCost : number;
  renovationCostUnit : string;
  maintainanceCost : number;
  maintainanceCostUnit : string;
  description : string;
  otherCost : number;
  otherCostUnit : string;
  notes : string;
  capitalGrowth : number;

  constructor(type : 'house'= null,
      address : string = null,
      createdBy : User = null,
      landArea : number = 0,
      floorArea : number = 0,
      askingPrice : number = 0,
      askingPriceUnit : string = null,
      offerPrice : number = 0,
      offerPriceUnit : string = null,
      walkAwayPrice : number = 0,
      walkAwayPriceUnit : string = null,
      salePrice : number = 0,
      salePriceUnit : string = null,
      dateListed : Date = null,
      reasonForSelling : string = null,
      marketValue : number = 0,
      marketValueUnit : string = null,
      registeredValue : number = 0,
      registeredValueUnit : string = null,
      rates : number = 0,
      ratesUnit : string = null,
      insurance : number = 0,
      insuranceUnit : string = null,
      renovationCost : number = 0,
      renovationCostUnit : string = null,
      maintainanceCost : number = 0,
      maintainanceCostUnit : string = null,
      description : string = null,
      otherCost : number = 0,
      otherCostUnit : string = null,
      notes : string = null,
      capitalGrowth : number = 0) {
    
    this.type = type;
    this.address = address;
    this.createdBy = createdBy;
    this.landArea = landArea;
    this.floorArea = floorArea;
    this.askingPrice = askingPrice;
    this.askingPriceUnit = askingPriceUnit;
    this.offerPrice = offerPrice;
    this.offerPriceUnit = offerPriceUnit;
    this.walkAwayPrice = walkAwayPrice;
    this.walkAwayPriceUnit = walkAwayPriceUnit;
    this.salePrice = salePrice;
    this.salePriceUnit = salePriceUnit;
    this.dateListed = dateListed;
    this.reasonForSelling = reasonForSelling;
    this.marketValue = marketValue;
    this.marketValueUnit = marketValueUnit;
    this.registeredValue = registeredValue;
    this.registeredValueUnit = registeredValueUnit;
    this.rates = rates;
    this.ratesUnit = ratesUnit;
    this.insurance = insurance;
    this.insuranceUnit = insuranceUnit;
    this.renovationCost = renovationCost;
    this.renovationCostUnit = renovationCostUnit;
    this.maintainanceCost = maintainanceCost;
    this.maintainanceCostUnit = maintainanceCostUnit;
    this.description = description;
    this.otherCost = otherCost;
    this.otherCostUnit = otherCostUnit;
    this.notes = notes;
    this.capitalGrowth = capitalGrowth;
  }
}