export class AccountFinance {
  
    annualIncome : number; //annual pre tax
    annualIncomeUnit : string; //the unit of annual income
    netWorth : number;
    savingsUnit : string; //savings unit
    incomeTaxRate : number; //percentage value
  
    constructor(annualIncome : number = null, annualIncomeUnit : string = 'USD', netWorth : number = null, savingsUnit : string = 'USD', incomeTaxRate : number = null) {
      this.annualIncome = annualIncome;
      this.annualIncomeUnit = annualIncomeUnit; 
      this.netWorth = netWorth;
      this.savingsUnit = savingsUnit;
      this.incomeTaxRate = incomeTaxRate; 
    }
  }