export class AccountFinance {
  
    annualIncome : number; //annual pre tax
    annualIncomeUnit : string; //the unit of annual income
    savings : number;
    savingsUnit : string; //savings unit
    incomeTaxRate : number; //percentage value
  
    constructor(annualIncome : number = null, annualIncomeUnit : string = 'USD', savings : number = null, savingsUnit : string = 'USD', incomeTaxRate : number = null) {
      this.annualIncome = annualIncome;
      this.annualIncomeUnit = annualIncomeUnit; 
      this.savings = savings;
      this.savingsUnit = savingsUnit;
      this.incomeTaxRate = incomeTaxRate; 
    }
  }