export class User {

  private _name : string;
  private _email : string;
  private _avatar : string;
  private _accessToinvestments : boolean;


  constructor(name : string = '', email : string = '', avatar : string = '', accessToInvestments = false) {
    this._name = name;
    this._email = email;
    this._avatar = avatar;
    this._accessToinvestments = accessToInvestments;
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