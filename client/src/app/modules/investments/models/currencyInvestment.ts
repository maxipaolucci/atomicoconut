import { Investment } from './investment';
import { Team } from '../../teams/models/team';
import { User } from '../../users/models/user';
import { Price } from '../../shared/models/price';
import { INVESTMENTS_TYPES } from 'src/app/constants';

export class CurrencyInvestment extends Investment {
  unit: string; // crypto unit
  amount: number;
  buyingPrice: number;
  buyingDate: Date;
  buyingPriceUnit: string;

  constructor(id: string, investmentAmount: number, investmentAmountUnit: string, createdBy: User, team: Team = null, investmentDistribution: any[] = [],
      unit: string, amount: number, buyingPrice: number, buyingPriceUnit: string, buyingDate: Date, type: INVESTMENTS_TYPES, 
      loanAmount: number = 0, loanAmountUnit: string, simulate: boolean) {
    
    super(id, type, investmentAmount, investmentAmountUnit, createdBy, team, investmentDistribution, loanAmount, loanAmountUnit, simulate);
    this.unit = unit;
    this.amount = amount;
    this.buyingDate = buyingDate;
    this.buyingPrice = buyingPrice;
    this.buyingPriceUnit = buyingPriceUnit;
  }

  getBuyingDate() : Date {
    return this.buyingDate;
  }

  getBuyingPrice() : Price {
    return new Price(this.buyingPrice, this.buyingPriceUnit);
  }

  getSpecificDataRaw() : any {
    return {
      unit: this.unit,
      amount: this.amount,
      buyingPrice: this.buyingPrice,
      buyingPriceUnit: this.buyingPriceUnit,
      buyingDate: this.buyingDate
    }
  }
}
