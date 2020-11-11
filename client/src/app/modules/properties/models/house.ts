import { User } from '../../users/models/user';
import { Property } from './property';
import { Address } from './address';
import { Link } from '../../shared/models/link';

export class House extends Property {

  buildingType: 'house'  | 'unit' | 'apartment';
  titleType: string;
  landArea: number; // square meters
  floorArea: number; // square meters
  registeredValue: number;
  registeredValueUnit: string;
  rates: number;
  ratesUnit: string;
  insurance: number;
  insuranceUnit: string;
  capitalGrowth: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  fenced: boolean;
  rented: boolean;
  rentPrice: number;
  rentPriceUnit: string;
  rentPricePeriod: 'week' | 'month';
  rentAppraisalDone: boolean;
  vacancy: number;
  bodyCorporate: number;
  bodyCorporateUnit: string;
  utilitiesCost: number;
  utilitiesCostUnit: string;
  managed: boolean;
  managerRate: number;
  agent: string; // this must be a contact in a contact persons module like networking
  

  constructor(
      id: string = null,
      type: 'house' = 'house',
      address: Address = null,
      createdBy: User = null,
      landArea: number = null,
      floorArea: number = null,
      askingPrice: number = null,
      askingPriceUnit: string = null,
      offerPrice: number = null,
      offerPriceUnit: string = null,
      walkAwayPrice: number = null,
      walkAwayPriceUnit: string = null,
      purchasePrice: number = null,
      purchasePriceUnit: string = null,
      purchasePrice2: number = null,
      purchasePrice2Unit: string = null,
      purchasePrice3: number = null,
      purchasePrice3Unit: string = null,
      purchasePrice4: number = null,
      purchasePrice4Unit: string = null,
      purchasePrice5: number = null,
      purchasePrice5Unit: string = null,
      dateListed: Date = null,
      reasonForSelling: string = null,
      marketValue: number = null,
      marketValueUnit: string = null,
      registeredValue: number = null,
      registeredValueUnit: string = null,
      rates: number = null,
      ratesUnit: string = null,
      insurance: number = null,
      insuranceUnit: string = null,
      renovationCost: number = null,
      renovationCostUnit: string = null,
      maintenanceCost: number = null,
      maintenanceCostUnit: string = null,
      description: string = null,
      otherCost: number = null,
      otherCostUnit: string = null,
      notes: string = null,
      photos: String[] = [],
      unit: string = null,
      status: string = null,
      statusDetail: string = null,
      sharedWith: User[] = null,
      links: Link[] = null,
      capitalGrowth: number = null,
      bedrooms: number = null,
      bathrooms: number = null,
      parkingSpaces: number = null,
      fenced: boolean = false,
      rented: boolean = false,
      rentPrice: number = null,
      rentPriceUnit: string= null,
      rentPricePeriod: 'week' | 'month' = 'week',
      rentAppraisalDone: boolean = false,
      vacancy: number = null,
      bodyCorporate: number = null,
      bodyCorporateUnit: string= null,
      utilitiesCost: number = null,
      utilitiesCostUnit: string= null,
      agent: string,
      managed: boolean = false,
      managerRate: number = null,
      buildingType: 'house'  | 'unit' | 'apartment' = 'house',
      titleType: string = null) {
    
    super(id, type, address, createdBy, askingPrice, askingPriceUnit, offerPrice, offerPriceUnit,
        walkAwayPrice, walkAwayPriceUnit, purchasePrice, purchasePriceUnit, purchasePrice2, purchasePrice2Unit, purchasePrice3, 
        purchasePrice3Unit, purchasePrice4, purchasePrice4Unit, purchasePrice5, purchasePrice5Unit, dateListed, reasonForSelling, marketValue,
        marketValueUnit, renovationCost, renovationCostUnit, maintenanceCost, maintenanceCostUnit, description, otherCost,
        otherCostUnit, notes, photos, unit, status, statusDetail, sharedWith, links);
    
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
    this.managerRate = managerRate;
    this.buildingType = buildingType;
    this.titleType = titleType;
  }
}
