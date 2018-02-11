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
  

  constructor(name : string = null, description : string = null, slug : string = null, admin : User = null, members : User[] = null) {
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.admin = admin;
    this.members = members;
  }
}