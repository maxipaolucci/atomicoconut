import { Investment } from "./investment";
import { Team } from "../../teams/models/team";
import { User } from "../../users/models/user";
import { Property } from "../../properties/models/property";

export class PropertyInvestment extends Investment {
  property : Property;
  buyingPrice : number;
  buyingDate : Date;
  buyingPriceUnit : string;

  constructor (id : string, investmentAmount : number, investmentAmountUnit : string, createdBy : User, team : Team = null, investmentDistribution : any[] = [],
      property : Property, buyingPrice : number, buyingPriceUnit : string, buyingDate : Date, type : 'property' = 'property', loanCoverage : number = 0) {
    
    super(id, type, investmentAmount, investmentAmountUnit, createdBy, team, investmentDistribution, loanCoverage);
    this.property = property;
    this.buyingDate = buyingDate;
    this.buyingPrice = buyingPrice;
    this.buyingPriceUnit = buyingPriceUnit;
  }
}