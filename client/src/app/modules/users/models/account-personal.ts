export class AccountPersonal {
  
  birthday : Date = null

  constructor(birthday : Date = null) {
    this.birthday = birthday;
  }

    get age() : number {
    if (this.birthday) {
      let ageDifMs = Date.now() - new Date(this.birthday).getTime();
      let ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return 0;
  }
}