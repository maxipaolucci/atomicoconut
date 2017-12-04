import { Investment } from "./investment";
import { Team } from "../../teams/models/team";
import { User } from "../../users/models/user";

export class CurrencyInvestment extends Investment {
  type : 'crypto' | 'currency';
  unit : string;
  amount : number;
  buyingPrice : number;
  buyingDate : Date;
  buyingPriceUnit : string;

  constructor (investmentAmount : number, investmentAmountUnit : string, createdBy : User, owner : 'me' | 'team' = 'me', team : Team = null, membersPercentage : any = null,
      unit : string, amount : number, buyingPrice : number, buyingPriceUnit : string, buyingDate : Date, type : 'crypto' | 'currency' = 'currency') {
    
    super(investmentAmount, investmentAmountUnit, createdBy, owner, team, membersPercentage);
    this.type = type;
    this.unit = unit;
    this.amount = amount;
    this.buyingDate = buyingDate;
    this.buyingPrice = buyingPrice;
    this.buyingPriceUnit = buyingPriceUnit;
  }
}