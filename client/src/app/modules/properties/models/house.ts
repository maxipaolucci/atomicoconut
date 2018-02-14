import { User } from '../../users/models/user';
import { Property } from './property';

export class House extends Property {

  buildingType : 'house'  | 'unit' | 'apartment';
  titleType : string;
  landArea : number; //square meters
  floorArea : number; //square meters
  registeredValue : number;
  registeredValueUnit : string;
  rates : number;
  ratesUnit : string;
  insurance : number;
  insuranceUnit : string;
  capitalGrowth : number;
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
  managed : number;
  agent : string; //this must be a contact in a contact persons module like networking
  

  constructor(type : 'house' = 'house',
      address : string = null,
      createdBy : User = null,
      landArea : number = null,
      floorArea : number = null,
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
      registeredValue : number = null,
      registeredValueUnit : string = null,
      rates : number = null,
      ratesUnit : string = null,
      insurance : number = null,
      insuranceUnit : string = null,
      renovationCost : number = null,
      renovationCostUnit : string = null,
      maintenanceCost : number = null,
      maintenanceCostUnit : string = null,
      description : string = null,
      otherCost : number = null,
      otherCostUnit : string = null,
      notes : string = null,
      capitalGrowth : number = null,
      bedrooms : number = null,
      bathrooms : number = null,
      parkingSpaces : number = null,
      fenced : boolean = false,
      rented : boolean = false,
      rentPrice : number = null,
      rentPriceUnit : string= null,
      rentPricePeriod : 'week' | 'month' = 'week',
      rentAppraisalDone : boolean = false,
      vacancy : number = null,
      bodyCorporate : number = null,
      bodyCorporateUnit : string= null,
      utilitiesCost : number = null,
      utilitiesCostUnit : string= null,
      agent : string,
      managed : number = null,
      buildingType : 'house'  | 'unit' | 'apartment' = 'house',
      titleType : string = null) {
    
    super(type, address, createdBy, askingPrice, askingPriceUnit, offerPrice, offerPriceUnit,
        walkAwayPrice, walkAwayPriceUnit, salePrice, salePriceUnit, dateListed, reasonForSelling, marketValue,
        marketValueUnit, renovationCost, renovationCostUnit, maintenanceCost, maintenanceCostUnit, description, otherCost,
        otherCostUnit, notes);
    
    this.landArea = landArea;
    this.floorArea = floorArea;
    this.registeredValue = registeredValue;
    this.registeredValueUnit = registeredValueUnit;
    this.rates = rates;
    this.ratesUnit = ratesUnit;
    this.insurance = insurance;
    this.insuranceUnit = insuranceUnit;
    this.capitalGrowth = capitalGrowth;
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
    this.managed = managed;
    this.buildingType = buildingType;
    this.titleType = titleType;
  }
}