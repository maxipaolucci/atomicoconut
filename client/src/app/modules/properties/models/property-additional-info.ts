export class PropertyAdditionalInfo {

  loanCoverage: number;
  interestRates: number;
  loanTerm: number;
  paymentFrecuency: number;

  constructor(loanCoverage: number = null, interestRates: number = null, loanTerm: number = null, paymentFrecuency: number = 26) {
    this.loanCoverage = loanCoverage;
    this.loanTerm = loanTerm;
    this.interestRates = interestRates;
    this.paymentFrecuency = paymentFrecuency;
  }
}