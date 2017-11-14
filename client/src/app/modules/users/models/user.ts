import { AccountFinance } from './account-finance';
import { AccountPersonal } from './account-personal';

export class User {

  name : string;
  email : string;
  avatar : string;
  accessToInvestments : boolean;
  financialInfo : AccountFinance;
  personalInfo : AccountPersonal;
  currency : string;

  constructor(name : string = '', email : string = '', avatar : string = '', accessToInvestments = false, financialInfo : AccountFinance = null, 
      personalInfo : AccountPersonal = null, currency : string = 'USD') {
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.accessToInvestments = accessToInvestments;
    this.currency = currency;
    
    if (financialInfo) {
      this.financialInfo = financialInfo;
    } else {
      this.financialInfo = null;
    }

    if (personalInfo) {
      this.personalInfo = personalInfo;
    } else {
      this.personalInfo = null;
    }
  }
}