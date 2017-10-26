import { AccountFinance } from './account-finance';
import { AccountPersonal } from './account-personal';

export class User {

  name : string;
  email : string;
  avatar : string;
  accessToInvestments : boolean;
  financialInfo : AccountFinance;
  personalInfo : AccountPersonal;


  constructor(name : string = '', email : string = '', avatar : string = '', accessToInvestments = false, financialInfo : AccountFinance = null, 
      personalInfo : AccountPersonal = null) {
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.accessToInvestments = accessToInvestments;
    
    
    if (financialInfo) {
      this.financialInfo = financialInfo;
    } else {
      this.financialInfo = new AccountFinance();
    }

    if (personalInfo) {
      this.personalInfo = personalInfo;
    } else {
      this.personalInfo = new AccountPersonal();
    }
  }
}