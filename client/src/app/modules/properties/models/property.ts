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

  constructor(name : string = null, description : string = null, slug : string = null, admin : User = null, members : User[] = null) {
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.admin = admin;
    this.members = members;
  }
}