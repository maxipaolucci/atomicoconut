export class AccountFinance {
  
    activeIncome : number = 0; //annual pre tax
    netWorth : number = 0;
    incomeTaxRate : number = 0; //percentage value
  
    constructor(activeIncome : number = 0, netWorth : number = 0, incomeTaxRate : number = 0) {
      this.activeIncome = activeIncome; 
      this.netWorth = netWorth;
      this.incomeTaxRate = incomeTaxRate; 
    }
  }