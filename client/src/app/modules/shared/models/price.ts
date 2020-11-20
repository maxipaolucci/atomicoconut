import { DEFAULT_CURRENCY } from 'src/app/constants';

export class Price {

  amount : number;
  unit : string;
  
  constructor(amount: number = 0, unit : string = DEFAULT_CURRENCY) {
    
    this.amount = amount;
    this.unit = unit;
  }
}