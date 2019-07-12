import { User } from '../../users/models/user';
import { Address } from './address';

export class Property {

  id: string;
  type: 'house' /*| 'building' | 'condo'*/;
  address: Address;
  createdBy: User;
  askingPrice: number;
  askingPriceUnit: string;
  offerPrice: number;
  offerPriceUnit: string;
  walkAwayPrice: number;
  walkAwayPriceUnit: string;
  purchasePrice: number;
  purchasePriceUnit: string;
  purchasePrice2: number;
  purchasePrice2Unit: string;
  purchasePrice3: number;
  purchasePrice3Unit: string;
  purchasePrice4: number;
  purchasePrice4Unit: string;
  purchasePrice5: number;
  purchasePrice5Unit: string;
  dateListed: Date;
  reasonForSelling: string;
  marketValue: number;
  marketValueUnit: string;
  renovationCost: number;
  renovationCostUnit: string;
  maintenanceCost: number;
  maintenanceCostUnit: string;
  description: string;
  otherCost: number;
  otherCostUnit: string;
  notes: string;
  photos: String[];
  unit: string;
  status: string;
  statusDetail: string;
  sharedWith: User[];

  constructor(
      id: string = null,
      type: 'house' = 'house',
      address: Address = null,
      createdBy: User = null,
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
      sharedWith: User[] = null) {
    
    this.id = id;
    this.type = type;
    this.address = address;
    this.createdBy = createdBy;
    this.askingPrice = askingPrice;
    this.askingPriceUnit = askingPriceUnit;
    this.offerPrice = offerPrice;
    this.offerPriceUnit = offerPriceUnit;
    this.walkAwayPrice = walkAwayPrice;
    this.walkAwayPriceUnit = walkAwayPriceUnit;
    this.purchasePrice = purchasePrice;
    this.purchasePriceUnit = purchasePriceUnit;
    this.purchasePrice2 = purchasePrice2;
    this.purchasePrice2Unit = purchasePrice2Unit;
    this.purchasePrice3 = purchasePrice3;
    this.purchasePrice3Unit = purchasePrice3Unit;
    this.purchasePrice4 = purchasePrice4;
    this.purchasePrice4Unit = purchasePrice4Unit;
    this.purchasePrice5 = purchasePrice5;
    this.purchasePrice5Unit = purchasePrice5Unit;
    this.dateListed = dateListed;
    this.reasonForSelling = reasonForSelling;
    this.marketValue = marketValue;
    this.marketValueUnit = marketValueUnit;
    this.renovationCost = renovationCost;
    this.renovationCostUnit = renovationCostUnit;
    this.maintenanceCost = maintenanceCost;
    this.maintenanceCostUnit = maintenanceCostUnit;
    this.description = description;
    this.otherCost = otherCost;
    this.otherCostUnit = otherCostUnit;
    this.notes = notes;
    this.photos = photos;
    this.unit = unit;
    this.status = status;
    this.statusDetail = statusDetail;
    this.sharedWith = sharedWith;
  }
}
