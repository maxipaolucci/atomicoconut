import { Investment } from './investment';
import { Team } from '../../teams/models/team';
import { User } from '../../users/models/user';
import { Property } from '../../properties/models/property';
import { Price } from '../../shared/models/price';
import { INVESTMENTS_TYPES } from 'src/app/constants';

export class PropertyInvestment extends Investment {
  property: Property;
  buyingPrice: number;
  buyingDate: Date;
  buyingPriceUnit: string;

  constructor (id: string, investmentAmount: number, investmentAmountUnit: string, createdBy: User, team: Team = null, investmentDistribution: any[] = [],
      property: Property, buyingPrice: number, buyingPriceUnit: string, buyingDate: Date, type: INVESTMENTS_TYPES, loanAmount: number = 0,
      loanAmountUnit: string) {
    
    super(id, type, investmentAmount, investmentAmountUnit, createdBy, team, investmentDistribution, loanAmount, loanAmountUnit);
    this.property = property;
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
      property: this.property,
      buyingPrice: this.buyingPrice,
      buyingPriceUnit: this.buyingPriceUnit,
      buyingDate: this.buyingDate,
      address: this.property.address // required for some form models
    }
  }
}
