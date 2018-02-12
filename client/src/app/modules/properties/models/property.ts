import { User } from '../../users/models/user';

export class Property {

  type : 'house' /*| 'building' | 'condo'*/;
  address : string;
  createdBy : User;
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
  renovationCost : number;
  renovationCostUnit : string;
  maintainanceCost : number;
  maintainanceCostUnit : string;
  description : string;
  otherCost : number;
  otherCostUnit : string;
  notes : string;

  constructor(
      type : 'house' = 'house',
      address : string = null,
      createdBy : User = null,
      askingPrice : number = null,
      askingPriceUnit : string = null,
      offerPrice : number = null,
      offerPriceUnit : string = null,
      walkAwayPrice : number = null,
      walkAwayPriceUnit : string = null,
      salePrice : number = null,
      salePriceUnit : string = null,
      dateListed : Date = null,
      reasonForSelling : string = null,
      marketValue : number = null,
      marketValueUnit : string = null,
      renovationCost : number = null,
      renovationCostUnit : string = null,
      maintainanceCost : number = null,
      maintainanceCostUnit : string = null,
      description : string = null,
      otherCost : number = null,
      otherCostUnit : string = null,
      notes : string = null) {
    
    this.type = type;
    this.address = address;
    this.createdBy = createdBy;
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
    this.renovationCost = renovationCost;
    this.renovationCostUnit = renovationCostUnit;
    this.maintainanceCost = maintainanceCost;
    this.maintainanceCostUnit = maintainanceCostUnit;
    this.description = description;
    this.otherCost = otherCost;
    this.otherCostUnit = otherCostUnit;
    this.notes = notes;
  }
}