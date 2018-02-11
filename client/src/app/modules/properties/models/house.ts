import { User } from '../../users/models/user';
import { Property } from './property';

export class House extends Property {

  bedrooms : number;
  bathrooms : number;
  parkingSpaces : number;
  fenced : boolean;
  rented : boolean;
  rentPrice : number;
  rentPriceUnit : string;
  rentPricePeriod : 'week' | 'month';
  rentAppraisalDone : boolean;
  vacancy : number;
  bodyCorporate : number;
  bodyCorporateUnit : string;
  utilitiesCost : number;
  utilitiesCostUnit : string;
  agent : string; //this must be a contact in a contact persons module like networking
  

  constructor(type : 'house' = null,
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
      capitalGrowth : number = 0,
      bedrooms : number = 0,
      bathrooms : number = 0,
      parkingSpaces : number = 0,
      fenced : boolean = false,
      rented : boolean = false,
      rentPrice : number = 0,
      rentPriceUnit : string= null,
      rentPricePeriod : 'week' | 'month' = 'week',
      rentAppraisalDone : boolean = false,
      vacancy : number = 0,
      bodyCorporate : number = 0,
      bodyCorporateUnit : string= null,
      utilitiesCost : number = 0,
      utilitiesCostUnit : string= null,
      agent : string) {
    
    super(type, address, createdBy, landArea, floorArea, askingPrice, askingPriceUnit, offerPrice, offerPriceUnit,
        walkAwayPrice, walkAwayPriceUnit, salePrice, salePriceUnit, dateListed, reasonForSelling, marketValue,
        marketValueUnit, registeredValue, registeredValueUnit, rates, ratesUnit, insurance, insuranceUnit,
        renovationCost, renovationCostUnit, maintainanceCost, maintainanceCostUnit, description, otherCost,
        otherCostUnit, notes, capitalGrowth);

    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.parkingSpaces = parkingSpaces;
    this.fenced = fenced;
    this.rented = rented;
    this.rentPrice = rentPrice;
    this.rentPriceUnit = rentPriceUnit;
    this.rentPricePeriod = rentPricePeriod;
    this.rentAppraisalDone = rentAppraisalDone;
    this.vacancy = vacancy;
    this.bodyCorporate = bodyCorporate;
    this.bodyCorporateUnit = bodyCorporateUnit;
    this.utilitiesCost = utilitiesCost;
    this.utilitiesCostUnit = utilitiesCostUnit;
    this.agent = agent;
  }
}