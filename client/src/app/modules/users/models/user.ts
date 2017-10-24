import { AccountFinance } from './account-finance';
import { AccountPersonal } from './account-personal';

export class User {

  private _name : string;
  private _email : string;
  private _avatar : string;
  private _accessToinvestments : boolean;
  finance : AccountFinance;
  personalInfo : AccountPersonal;


  constructor(name : string = '', email : string = '', avatar : string = '', accessToInvestments = false, accountFinance : AccountFinance = null, 
      personalInfo : AccountPersonal = null) {
    this._name = name;
    this._email = email;
    this._avatar = avatar;
    this._accessToinvestments = accessToInvestments;
    
    
    if (accountFinance) {
      this.setAccountFinance(accountFinance);
    } else {
      this.finance = new AccountFinance();
    }

    if (personalInfo) {
      this.personalInfo = personalInfo;
    } else {
      this.personalInfo = new AccountPersonal();
    }
  }

  setAccountFinance(accountFinance) {
    this.finance = new AccountFinance(accountFinance.activeIncome, accountFinance.netWorth, accountFinance.incomeTaxRate);
  }

  get name() {
    return this._name; 
  }

  set name(name) {
    this._name = name;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get avatar() {
    return this._avatar; 
  }

  set avatar(avatar) {
    this._avatar = avatar;
  }

  get accessToInvestments() {
    return this._accessToinvestments;
  }

  set accessToInvestments(accessToInvestments) {
    this._accessToinvestments = accessToInvestments;
  }
}