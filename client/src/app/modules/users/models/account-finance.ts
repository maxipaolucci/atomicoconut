export class AccountFinance {
  
    annualIncome : number = null; //annual pre tax
    netWorth : number = null;
    incomeTaxRate : number = null; //percentage value
  
    constructor(annualIncome : number = null, netWorth : number = null, incomeTaxRate : number = null) {
      this.annualIncome = annualIncome; 
      this.netWorth = netWorth;
      this.incomeTaxRate = incomeTaxRate; 
    }
  }